<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    :reset-form="Upsert?.reset"
    @temp-save="handleTempSave"
    @submit="handleSubmit"
    @approval="handleApproval"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />

    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_1csgmtx'">
        <upsert ref="Upsert" :include-fields="overviewFields" :show-loading="false" />
      </div>

      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="DetailOther" :include-fields="overviewFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { UserEmploymentForm } from '@/api/oa/personnel/userEmployment/types'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import { useWorkflow, useWorkflowViewData } from '@/hooks'

type Entity = UserEmploymentForm & { initiator: Initiator }
interface StartWorkFlowOptions {
  operation?: BaseEntity['operation']
  entity: Entity
  next?: (result: any) => void
}

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<UserEmploymentForm>()

// 引用
const Upsert = ref<InstanceType<typeof upsert> | null>()
const Detail = ref<InstanceType<typeof detail> | null>()

// 其他节点
const DetailOther = ref<InstanceType<typeof detail> | null>()

const allFields: PartialBooleanRecord<UserEmploymentForm> = {
  id: true,
  preEmploymentId: true,
  name: true,
  checked: true,
  deptId: true,
  postId: true,
  sex: true,
  age: true,
  certificates: true,
  otherCertificates: true,
  interviewDate: true,
  isOwnerInterview: true,
  interviewWay: true,
  phonenumber: true,
  isProbation: true,
  probationCycle: true,
  isOutsource: true,
  internshipExplain: true,
  nation: true,
  education: true,
  hopeDate: true,
  wages: true,
  baseWages: true,
  postWages: true,
  performanceWages: true,
  probationWagesRate: true,
  isRecommend: true,
  reference: true,
  isIntern: true,
  description: true,
  employmentEvaluate: true,
  remark: false,
  ossIdList: true,
}

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<UserEmploymentForm>({
    ...allFields,
  }),
)

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions) {
  const { operation, entity, next } = options
  // 业务提交
  await Upsert.value?.submit({
    operation,
    success: async ({ id, preEmploymentId, employmentId }) => {
      submitFormData.value = {
        tableName: 'oa_user_employment',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
            preEmploymentId,
            employmentId,
          },
        },
        processInstanceName: `${proxy.$route.query.procdefName}-${entity.name}`,
      }

      // 启动流程
      await startWorkFlow(submitFormData.value).then(next)
    },
  })
}

// 暂存
async function handleTempSave({ load, done, next, initiator, operation }: TempSavePayload) {
  await Upsert.value?.workflowSubmit({
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
  await Upsert.value?.workflowSubmit({
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

  const success = (data: UserEmploymentForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_1csgmtx':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 打开审批弹窗
    default:
      open(taskId as string)
  }
}

// 挂载
onMounted(async () => {
  const { type, taskId, processInstanceId, nodeId } = proxy.$route.query
  taskDefinitionKey.value = nodeId as string
  isView.value = type === 'view'

  if (taskId || processInstanceId) {
    loading.value = true
    const res = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task, processDefinitionName } = res.data

    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey
    procdefName.value = processDefinitionName

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            Upsert.value?.workflowView(entity)

            // 其他节点
            DetailOther.value?.workflowView(entity)
            break
          case 'view':
            Detail.value?.workflowView(entity)
            break
        }
      }
      finally {
        loading.value = false
      }
    })
  }
})
</script>
