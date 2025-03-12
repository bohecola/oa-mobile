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
          label="日常事务类型"
          :is-link="!dailyTypeSelectReadOnly"
          :rules="computedRules.dailyWorkType"
          @click="handleDailyTypeClick"
        >
          <template #input>
            <DailyTypeSelect
              ref="DailyTypeSelectRef"
              v-model="form.dailyWorkType"
              v-model:no="form.no"
              v-model:wf-remark="form.wfRemark"
              v-model:present-text="presentText"
              v-model:is-default-page="isDefaultPage"
              @before-finish="onDailyTypeBeforeFinish"
              @update:no="onNoChange"
            />
          </template>
        </van-field>

        <van-field v-if="form.dailyWorkType" name="companyId" label="公司">
          <template #input>
            <!-- TODO 公司选择 -->
            <ComanySelect v-model="form.companyId" readonly />
          </template>
        </van-field>

        <template v-if="!isNil(form.no)">
          <component :is="isDefaultPage === 'Y' ? SubComponent.DefaultWork : SubComponent[form.no]" :key="form.no" />
        </template>
      </van-cell-group>
    </van-form>
  </WorkflowPage>
</template>

<script setup name="DailyWorkApply" lang="ts">
import type { FieldRule } from 'vant'
import { isNil } from 'lodash-es'
import { useForm } from '../form'
import SubComponent from '../sub'
import DailyTypeSelect from '../../components/DailyTypeSelect.vue'
import ComanySelect from '../../../personnel/components/ComanySelect.vue'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { useWorkflowViewData } from '@/hooks'
import { useStore } from '@/store'
import { getDept } from '@/api/system/dept'
import { startWorkFlow } from '@/api/workflow/task'

type Entity = DailyWorkForm & { initiator: Initiator }

interface StartWorkFlowOptions {
  operation?: BaseEntity['operation']
  entity: Entity
  next?: (result: any) => void
}

// 状态
const { user } = useStore()
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 表单
const { Form, form, rules, isLoading, reset, submit, workflowView, workflowSubmit } = useForm()
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
const taskDefinitionKey = ref(proxy.$route.query.nodeId as string)
// 是否查看
const isView = ref(proxy.$route.query.type === 'view')

// 日常事务类型选择器只读
const dailyTypeSelectReadOnly = ref(!['add', 'update'].includes(proxy.$route.query.type as string))
// 选中文字
const presentText = ref<string>(undefined)
// 是否是默认页面
const isDefaultPage = ref<string>(undefined)
// 跟踪字段
const trackedFields = ref<KeysOfArray<DailyWorkForm>>(getBaseFields())

// 动态规则
const computedRules = computed(() => {
  const newRules: FormRules<DailyWorkForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (trackedFields.value.includes(key as any)) {
      newRules[key] = value
    }
  }

  return newRules
})

provide('Form', Form)
provide('form', form)
provide('computedRules', computedRules)
provide('isView', isView)
provide('taskDefinitionKey', taskDefinitionKey)
provide('trackFields', trackFields)
provide('updateRuleRequired', updateRuleRequired)

function getBaseFields() {
  return dailyTypeSelectReadOnly.value ? [] : (['dailyWorkType', 'companyId'] as KeysOfArray<DailyWorkForm>)
}

// 日常事务类型选择器打开
async function handleDailyTypeClick() {
  if (dailyTypeSelectReadOnly.value) {
    return
  }
  DailyTypeSelectRef.value?.open()
}

// 日常事务类型选择
async function onDailyTypeBeforeFinish() {
  reset()
  trackedFields.value = getBaseFields()

  // 获取当前登录用户的公司 id
  const { data } = await getDept(user.info.deptId)
  form.value.companyId = data.parentId
}

// 事务编码变更
function onNoChange(value?: string) {
  // 部门人事主管权限更换审批 || 项目部其他费用申请 => 资料类型默认值 0
  if (['RSXMBRSZGQXGHSP', 'RSXMBQTFYSQ'].includes(value) && proxy.$route.query.type === 'add') {
    form.value.fileType = '0'
  }
}

// 更新规则
function updateRuleRequired(field: string, required: boolean) {
  (rules.value[field] as Array<FieldRule>).forEach((e) => {
    e.required = required
  })
}

// 依赖收集
function trackFields(fields: KeysOfArray<DailyWorkForm>) {
  trackedFields.value = fields.reduce<KeysOfArray<DailyWorkForm>>((prev, curr) => {
    if (!prev.includes(curr)) {
      prev.push(curr)
    }

    return prev
  }, trackedFields.value)
}

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions) {
  const { operation, entity, next } = options
  const { initiator: { nickName } } = entity

  const processInstanceName = `${presentText.value?.split(' / ')[1]}-${nickName}`

  // 业务提交
  await submit({
    operation,
    success: async ({ id }) => {
      submitFormData.value = {
        tableName: 'oa_daily_work',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
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
  await workflowSubmit({
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
    const res = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task } = res.data

    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey

    nextTick(() => {
      switch (type as string) {
        case 'update':
        case 'approval':
        case 'view': {
          workflowView(entity)
        }
      }
      isLoading.value = false
    })
  }
})
</script>
