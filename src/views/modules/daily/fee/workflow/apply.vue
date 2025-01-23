<template>
  <WorkflowPage
    :loading="isLoading"
    :entity-variables="submitFormData.variables?.entity"
    :group="false"
    @approval="handleApproval"
  >
    <van-form ref="Form" label-width="auto">
      <van-cell-group inset class="!my-3">
        <van-field
          name="dailyWorkType"
          label="日常费用类型"
          input-align="right"
          @click="handleDailyTypeClick"
        >
          <template #input>
            <DailyTypeSelect
              ref="DailyTypeSelectRef"
              v-model="form.feeType"
              v-model:no="form.no"
              v-model:rootNo="form.rootNo"
              v-model:wf-remark="form.wfRemark"
              type="1"
              @before-finish="onDailyTypeBeforeFinish"
            />
          </template>
        </van-field>
        <template v-if="!isNil(form.rootNo)">
          <component :is="SubComponent[form.rootNo]" :key="form.no" />
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
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { useWorkflowViewData } from '@/hooks'

type Entity = DailyFeeForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 引用
const DailyTypeSelectRef = ref<InstanceType<typeof DailyTypeSelect> | null>()
// 表单
const { Form, form, rules, isLoading, reset, workflowView } = useForm()

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: undefined,
  tableName: undefined,
  variables: {},
  processInstanceName: undefined,
})
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')

// 是否查看
const isView = computed(() => proxy?.$route.query.type === 'view')
// 日常事务类型选择器只读
const dailyTypeSelectReadOnly = computed(() => !['add', 'update'].includes(proxy.$route.query.type as string))

// 跟踪字段
const trackedFields = ref<KeysOfArray<DailyFeeForm>>(getBaseFields())

// 动态规则
const computedRules = computed(() => {
  const newRules = {}
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

// 类型选择点击
function handleDailyTypeClick() {
  if (dailyTypeSelectReadOnly.value) {
    return false
  }
  DailyTypeSelectRef.value?.open()
}

// 类型选择完成
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

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  const { taskId } = proxy?.$route.query ?? {}

  // 打开审批弹窗
  open(taskId as string)
}

// 挂载
onMounted(async () => {
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}

  if (taskId || processInstanceId) {
    isLoading.value = true
    const { data } = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task } = data
    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey

    proxy?.$router.replace({
      query: {
        ...proxy?.$route.query,
        taskDefinitionKey: taskDefinitionKey.value,
        isEditNode: 'false',
      },
    })

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
