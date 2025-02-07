<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    :group="false"
    @approval="handleApproval"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />

    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_1b1nccv'">
        <!-- <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" /> -->
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
// import upsert from '../upsert.vue'
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
// const Upsert = ref<InstanceType<typeof upsert> | null>()
const Detail = ref<InstanceType<typeof detail> | null>()

// 实际到岗节点
const Upsert1 = ref<InstanceType<typeof detail> | null>()
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
const isView = computed(() => proxy.$route.query.type === 'view')

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  // 打开审批弹窗
  const { taskId } = proxy.$route.query
  // let res: any
  // if (taskDefinitionKey.value === 'Activity_1b1nccv') {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value === 'Activity_0f4zwar') {
  //   // 实际到岗节点
  //   res = await Upsert1.value?.workflowSubmit()
  // }
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
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}
  const { type, taskId, processInstanceId } = proxy.$route.query

  if (taskId || processInstanceId) {
    loading.value = true
    const res = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task } = res.data
    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey

    proxy?.$router.replace({
      query: {
        ...proxy?.$route.query,
        taskDefinitionKey: taskDefinitionKey.value,
        isEditNode: ['Activity_0f4zwar'].includes(taskDefinitionKey.value) ? 'true' : 'false',
      },
    })

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            // Upsert.value?.workflowView(entity)
            // 实际到岗节点
            Upsert1.value?.workflowView(entity)
            Detail1.value?.workflowView(entity)
            Detail2.value?.workflowView(entity)
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
