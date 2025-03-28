<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    @temp-save="handleTempSave"
    @submit="handleSubmit"
    @approval="handleApproval"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />
    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_06mn8j5'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 人力确认节点  办理人意见 -->
      <div v-else-if="taskDefinitionKey === 'Activity_1lximsi'">
        <detail ref="humanResourcesDetail1" :include-fields="humanResourcesFields" :show-loading="false" />
        <upsert ref="humanResourcesUpsert" :include-fields="['transactorOpinion']" :show-loading="false" />
        <detail ref="humanResourcesDetail2" :include-fields="['userPreEmploymentEvaluateBoList', 'ossIdList']" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="DetailOther" :include-fields="overviewFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import upsert from '../upsert.vue'
import type { UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { useWorkflow, useWorkflowViewData } from '@/hooks'
import { startWorkFlow } from '@/api/workflow/task'

type Entity = UserPreEmploymentForm & { initiator: Initiator }
interface StartWorkFlowOptions {
  operation?: BaseEntity['operation']
  entity: Entity
  next?: (result: any) => void
}
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<UserPreEmploymentForm>()

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const Upsert = ref<InstanceType<typeof upsert> | null>()
const DetailOther = ref<InstanceType<typeof detail> | null>()

// 人力资源确认
const humanResourcesDetail1 = ref<InstanceType<typeof detail> | null>()
const humanResourcesUpsert = ref<InstanceType<typeof upsert> | null>()
const humanResourcesDetail2 = ref<InstanceType<typeof detail> | null>()

// 所有字段
const allFields: PartialBooleanRecord<UserPreEmploymentForm> = {
  id: true,
  recruitNo: true,
  deptId: true,
  postId: true,
  name: true,
  sex: true,
  age: true,
  phonenumber: true,
  certificates: true,
  otherCertificates: true,
  transactorOpinion: true,
  interviewWay: true,
  interviewDate: true,
  isOwnerInterview: true,
  isProbation: true,
  probationCycle: true,
  internshipExplain: true,
  isRecommend: true,
  reference: true,
  isIntern: true,
  status: true,
  userPreEmploymentEvaluateBoList: true,
  ossIdList: true,
}

// 申请字段
const applyFields = ref(
  filterTruthyKeys<UserPreEmploymentForm>({
    ...allFields,
    transactorOpinion: false,
  }),
)

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<UserPreEmploymentForm>({
    ...allFields,
  }),
)

// 人力资源确认字段
const humanResourcesFields = ref(
  filterTruthyKeys<UserPreEmploymentForm>({
    ...allFields,
    userPreEmploymentEvaluateBoList: false,
    transactorOpinion: false,
    ossIdList: false,
  }),
)

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions) {
  const { operation, entity, next } = options
  // 业务提交
  await Upsert.value?.submit({
    operation,
    success: async ({ id }) => {
      submitFormData.value = {
        tableName: 'oa_user_pre_employment',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
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

  const success = (data: UserPreEmploymentForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_08sjg5i':
      await Upsert.value?.workflowSubmit({ success })
      break
      // 人力资源节点
    case 'Activity_1lximsi':
      await humanResourcesUpsert.value?.workflowSubmit({ success })
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

            // 人力资源确认节点
            humanResourcesDetail1.value?.workflowView(entity)
            humanResourcesUpsert.value?.workflowView(entity)
            humanResourcesDetail2.value?.workflowView(entity)

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
