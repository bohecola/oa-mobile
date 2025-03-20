<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    @approval="handleApproval"
    @temp-save="handleTempSave"
    @submit="handleSubmit"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />

    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_1b1nccv'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 实际到岗节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0f4zwar'">
        <detail ref="Detail1" :include-fields="realDateFiles1" :show-loading="false" />
        <detail ref="Upsert1" :include-fields="['realDate']" :show-loading="false" />
        <detail ref="Detail2" :include-fields="realDateFiles2" :show-loading="false" />
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
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import { useWorkflowViewData } from '@/hooks'
import type { UserPendingEmploymentForm } from '@/api/oa/personnel/pendingEmployment/types'

type Entity = UserPendingEmploymentForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy.$route.query.nodeId as string ?? '')

provide('taskDefinitionKey', taskDefinitionKey)

// 引用
const Upsert = ref<InstanceType<typeof upsert> | null>()
const Detail = ref<InstanceType<typeof detail> | null>()

// 实际到岗节点
const Upsert1 = ref<InstanceType<typeof upsert> | null>()
const Detail1 = ref<InstanceType<typeof detail> | null>()
const Detail2 = ref<InstanceType<typeof detail> | null>()

// 其他节点
const DetailOther = ref<InstanceType<typeof detail> | null>()

// 所有字段
const allFields: PartialBooleanRecord<UserPendingEmploymentForm> = {
  id: true,
  preEmploymentId: true,
  employmentId: true,
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
  nation: true,
  education: true,
  realDate: true,
  // wages: true,
  // baseWages: true,
  // postWages: true,
  // performanceWages: true,
  probationWagesRate: true,
  isProbation: true,
  probationCycle: true,
  isRecommend: true,
  reference: true,
  isIntern: true,
  description: true,
  employmentEvaluate: true,
  remark: false,
  userAccount: true,
  hopeDate: true,
  ossIdList: true,
}

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<UserPendingEmploymentForm>({
    ...allFields,
  }),
)

// 申请字段
const applyFields = ref(
  filterTruthyKeys<UserPendingEmploymentForm>({
    ...allFields,
    realDate: false,
  }),
)

// 实际到岗字段上半段
const realDateFiles1 = ref(
  filterTruthyKeys<UserPendingEmploymentForm>({
    id: true,
    employmentId: true,
    deptId: true,
    postId: true,
    sex: true,
    phonenumber: true,
    age: true,
    hopeDate: true,
    nation: true,
    education: true,
    interviewDate: true,
    interviewWay: true,
    userAccount: true,
  }),
)
// 实际到岗字段下半段
const realDateFiles2 = ref(
  filterTruthyKeys<UserPendingEmploymentForm>({
    isOwnerInterview: true,
    isIntern: true,
    isProbation: true,
    probationCycle: true,
    probationWagesRate: true,
    isRecommend: true,
    certificates: true,
    reference: true,
    otherCertificates: true,
    employmentEvaluate: true,
    description: true,
    remark: true,
    ossIdList: true,
  }),
)

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
  processInstanceName: '',
})

// 是否查看
const isView = ref(proxy.$route.query.type === 'view')

// 开始流程
async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
  // 业务提交
  await Upsert.value?.submit({
    success: async ({ id }) => {
      submitFormData.value = {
        tableName: 'oa_user_employment_handle',
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
async function handleTempSave({ load, done, initiator, next }: TempSavePayload) {
  await Upsert.value?.workflowSubmit({
    success: async (data) => {
      load()
      const entity = { ...data, initiator }
      await handleStartWorkflow(entity, next).finally(done)
    },
  })
}

// 提交
async function handleSubmit({ load, done, open, initiator }: SubmitPayload) {
  await Upsert.value?.workflowSubmit({
    success: async (data) => {
      load()
      const entity = { ...data, initiator }
      const next = (res: any) => open(res.data?.taskId)
      await handleStartWorkflow(entity, next).finally(done)
    },
  })
}

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  const { taskId } = proxy.$route.query

  const success = (data: UserPendingEmploymentForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_1b1nccv':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 归档节点
    case 'Activity_0f4zwar':
      await Upsert1.value?.workflowSubmit({ success })
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
    const { entity, task } = res.data

    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            Upsert.value?.workflowView(entity)

            Detail1.value?.workflowView(entity)
            Upsert1.value?.workflowView(entity)
            Detail2.value?.workflowView(entity)

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
