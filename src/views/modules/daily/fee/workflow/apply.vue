<template>
  <WorkflowPage
    :loading="isLoading"
    :entity-variables="submitFormData.variables?.entity"
    :group="false"
    @approval="handleApproval"
  >
    <van-form id="DailyWorkFormContainer" ref="Form" label-width="98">
      <van-cell-group inset class="!my-3">
        <van-field
          prop="dailyWorkType"
          :label="`日常费用类型${dailyWorkTypeSelectReadOnly ? '：' : ''}`"
          input-align="right"
          @click="handleDailyWorkTypeClick"
        >
          <template #input>
            <DailyWorkTypeSelect
              ref="DailyWorkTypeSelectRef"
              v-model="form.feeType"
              v-model:daily-work-no="form.no"
              type="1"
              @finish="onDailyWorkTypeBeforeFinish"
            />
          </template>
        </van-field>

        <component :is="SubComponent[form.componentNo]" :key="form.componentNo" />
      </van-cell-group>
    </van-form>
  </WorkflowPage>
</template>

<script setup lang="ts">
import { useForm } from '../form'
import SubComponent from '../sub'
import DailyWorkTypeSelect from '../../components/DailyWorkTypeSelect.vue'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { useWorkflowViewData } from '@/hooks'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

type Entity = DailyFeeForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 表单
const { Form, form, isLoading, reset, workflowView } = useForm()

// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')
// 是否查看
const isView = computed(() => proxy?.$route.query.type === 'view')
// 日常事务类型选择器只读
const dailyWorkTypeSelectReadOnly = computed(() => !['add', 'update'].includes(proxy.$route.query.type as string))

const baseFields = computed(() => {
  return dailyWorkTypeSelectReadOnly.value ? [] : (['feeType'] as KeysOfArray<DailyFeeForm>)
})

const DailyWorkTypeSelectRef = ref<InstanceType<typeof DailyWorkTypeSelect> | null>()
// 跟踪字段
const trackedFields = ref<KeysOfArray<DailyFeeForm>>(baseFields.value)

function handleDailyWorkTypeClick() {
  if (dailyWorkTypeSelectReadOnly.value) {
    return false
  }
  DailyWorkTypeSelectRef.value?.open()
}

function onDailyWorkTypeBeforeFinish() {
  reset()
  trackedFields.value = baseFields.value
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

provide('form', form)
provide('isView', isView)
provide('taskDefinitionKey', taskDefinitionKey)
provide('trackFields', trackFields)

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  const { taskId } = proxy?.$route.query ?? {}

  // const res = await workflowSubmit()

  // if (res) {
  //   const { valid, data } = res
  //   if (valid) {
  //     Object.assign(submitFormData.value.variables.entity, data)
  //     open(taskId as string)
  //   }
  //   return true
  // }

  // 打开审批弹窗
  open(taskId as string)
}

// 挂载
onMounted(async () => {
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}

  isLoading.value = true

  if (taskId || processInstanceId) {
    const res = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task } = res.data
    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey

    proxy?.$router.replace({
      query: {
        ...proxy?.$route.query,
        taskDefinitionKey: taskDefinitionKey.value,
        isEditNode: 'false',
      },
    })
  }

  nextTick(async () => {
    switch (type as string) {
      case 'update':
      case 'approval':
      case 'view': {
        await workflowView({ taskId, processInstanceId })
      }
    }

    isLoading.value = false
  })
})
</script>
