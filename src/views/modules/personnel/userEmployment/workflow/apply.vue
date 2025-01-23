<template>
  <WorkflowPage :loading="loading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />

    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_1csgmtx'">
        <!-- <upsert ref="Upsert" :include-fields="overviewFields" :show-loading="false" /> -->
      </div>

      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="DetailOther" :include-fields="overviewFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
// import type upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { UserEmploymentForm } from '@/api/oa/personnel/userEmployment/types'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import { useWorkflowViewData } from '@/hooks'

type Entity = UserEmploymentForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy.$route.query.nodeId ?? '')

// 引用
// const Upsert = ref<InstanceType<typeof upsert> | null>()
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

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
  processInstanceName: '',
})

// 是否查看
const isView = computed(() => proxy?.$route.query.type === 'view')

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  // 打开审批弹窗
  const { taskId } = proxy?.$route.query ?? {}
  // let res: any
  // if (taskDefinitionKey.value === 'Activity_020ehmy') {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit()
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
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}

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
      },
    })

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
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
