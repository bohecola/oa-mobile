<template>
  <WorkflowPage
    :loading="isLoading"
    :entity-variables="submitFormData.variables?.entity"
    :group="false"
    @temp-save="handleTempSave"
    @submit="handleSubmit"
    @approval="handleApproval"
  >
    <van-form
      ref="Form"
      :class="dailyTypeSelectReadOnly ? 'reset-label' : ''"
      :readonly="dailyTypeSelectReadOnly"
      input-align="left"
      label-align="top"
      label-width="auto"
      required="auto"
      scroll-to-error
    >
      <van-cell-group inset class="!my-3">
        <van-field
          name="dailyWorkType"
          label="日常费用类型"
          :is-link="!dailyTypeSelectReadOnly"
          :rules="computedRules.feeType"
          @click="handleDailyTypeClick"
        >
          <template #input>
            <DailyTypeSelect
              ref="DailyTypeSelectRef"
              v-model="form.feeType"
              v-model:no="form.no"
              v-model:root-no="form.rootNo"
              v-model:wf-remark="form.wfRemark"
              v-model:present-text="presentText"
              v-model:is-default-page="isDefaultPage"
              type="1"
              @before-finish="onDailyTypeBeforeFinish"
            />
          </template>
        </van-field>
        <template v-if="!isNil(form.rootNo)">
          <component :is="isDefaultPage === 'Y' ? SubComponent.DefaultFee : SubComponent[form.rootNo]" :key="form.no" />
        </template>
      </van-cell-group>
    </van-form>
  </WorkflowPage>
</template>

<script setup lang="ts">
import type { FieldRule } from 'vant'
import { isNil } from 'lodash-es'
import { useForm } from '../form'
import SubComponent from '../sub'
import DailyTypeSelect from '../../components/DailyTypeSelect.vue'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { useWorkflowViewData } from '@/hooks'
import { startWorkFlow } from '@/api/workflow/task'

type Entity = DailyFeeForm & { initiator: Initiator }

interface StartWorkFlowOptions {
  operation?: BaseEntity['operation']
  entity: Entity
  next?: (result: any) => void
}

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 表单
const { Form, form, rules, isLoading, reset, submit, workflowSubmit, workflowView } = useForm()
// 引用
const DailyTypeSelectRef = ref<InstanceType<typeof DailyTypeSelect>>()

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: undefined,
  tableName: undefined,
  variables: {},
  processInstanceName: undefined,
})
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId as string)
// 是否查看
const isView = ref(proxy.$route.query.type === 'view')

// 日常类型选择器只读
const dailyTypeSelectReadOnly = ref(!['add', 'update'].includes(proxy.$route.query.type as string))
// 选中文字
const presentText = ref(undefined)
// 是否是默认页面
const isDefaultPage = ref(undefined)
// 跟踪字段
const trackedFields = ref<KeysOfArray<DailyFeeForm>>(getBaseFields())

// 动态规则
const computedRules = computed(() => {
  const newRules: FormRules<DailyFeeForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (trackedFields.value.includes(key as any)) {
      newRules[key] = value
    }
  }

  return newRules
})

provide('form', form)
provide('Form', Form)
provide('computedRules', computedRules)
provide('isView', isView)
provide('taskDefinitionKey', taskDefinitionKey)
provide('trackFields', trackFields)
provide('updateRuleRequired', updateRuleRequired)

// 获取基础校验字段
function getBaseFields() {
  return dailyTypeSelectReadOnly.value ? [] : (['feeType'] as KeysOfArray<DailyFeeForm>)
}

// 日常费用类型选择器打开
function handleDailyTypeClick() {
  if (dailyTypeSelectReadOnly.value) {
    return false
  }
  DailyTypeSelectRef.value?.open()
}

// 日常费用类型选择
function onDailyTypeBeforeFinish() {
  reset()
  trackedFields.value = getBaseFields()
}

// 更新规则
function updateRuleRequired(field: string, required: boolean) {
  (rules.value[field] as Array<FieldRule>).forEach((e) => {
    e.required = required
  })
}

// 依赖收集
function trackFields(fields: KeysOfArray<DailyFeeForm>) {
  trackedFields.value = fields.reduce<KeysOfArray<DailyFeeForm>>((prev, curr) => {
    if (!prev.includes(curr)) {
      prev.push(curr)
    }

    return prev
  }, trackedFields.value)
}

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions) {
  const { operation, entity, next } = options
  const { initiator } = entity

  const processInstanceName = `${presentText.value}-${initiator?.nickName}`

  // 业务提交
  await submit({
    operation,
    // 成功后启动流程
    success: async ({ id, itemList }) => {
      submitFormData.value = {
        tableName: 'oa_daily_fee',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
            itemList,
          },
        },
        processInstanceName,
      }
      // 启动流程
      await startWorkFlow(submitFormData.value).then(next)
    },
  })
}

// 暂存
async function handleTempSave({ load, done, next, initiator, operation }: TempSavePayload) {
  await workflowSubmit({
    success: async (data) => {
      load()
      const options: StartWorkFlowOptions = {
        operation,
        entity: { ...data, initiator },
        next,
      }
      await handleStartWorkflow(options).finally(done)
    },
  })
}

// 提交
async function handleSubmit({ load, done, open, initiator }: SubmitPayload) {
  workflowSubmit({
    success: async (data) => {
      load()
      const options: StartWorkFlowOptions = {
        entity: { ...data, initiator },
        next: (res: any) => open(res.data?.taskId),
      }
      await handleStartWorkflow(options).finally(done)
    },
  })
}

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  const { taskId } = proxy.$route.query

  await workflowSubmit({
    success: (data) => {
      Object.assign(submitFormData.value.variables.entity, data)
    },
  })

  // 打开审批弹窗
  open(taskId as string)
}

// 挂载
onMounted(async () => {
  const { type, taskId, processInstanceId, nodeId } = proxy.$route.query
  dailyTypeSelectReadOnly.value = !['add', 'update'].includes(type as string)
  taskDefinitionKey.value = nodeId as string
  isView.value = type === 'view'

  if (taskId || processInstanceId) {
    isLoading.value = true
    const { data } = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task } = data

    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey

    nextTick(() => {
      switch (type as string) {
        case 'update':
        case 'approval':
        case 'view':
          workflowView(entity)
          break
      }
      isLoading.value = false
    })
  }
})
</script>
