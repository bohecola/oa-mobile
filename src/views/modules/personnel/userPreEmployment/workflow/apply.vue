<template>
  <WorkflowPage :loading="loading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />
    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_06mn8j5'">
        <!-- <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" /> -->
      </div>

      <!-- 人力确认节点  办理人意见 -->
      <div v-else-if="taskDefinitionKey === 'Activity_1lximsi'">
        <detail ref="humanResourcesDetail1" :include-fields="humanResourcesFields" :show-loading="false" />
        <detail ref="humanResourcesUpsert" :include-fields="['transactorOpinion']" :show-loading="false" />
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
import type { UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'

type Entity = UserPreEmploymentForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const DetailOther = ref<InstanceType<typeof detail> | null>()

// 人力资源确认
const humanResourcesDetail1 = ref<InstanceType<typeof detail> | null>()
const humanResourcesUpsert = ref<InstanceType<typeof detail> | null>()
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

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// 是否查看
const isView = computed(() => proxy?.$route.query.type === 'view')

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  // let res: any
  // if (taskDefinitionKey.value == 'Activity_06mn8j5') {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit()
  // }else if ('Activity_1lximsi' == taskDefinitionKey.value) {
  // 人力资源节点
  //   res = await humanResourcesUpsert.value?.workflowSubmit();
  // }
  // if (res) {
  //   const { valid, data } = res
  //   if (valid) {
  //     Object.assign(submitFormData.value.variables.entity, data)
  //   }
  // }
  // 打开审批弹窗
  const { taskId } = proxy?.$route.query ?? {}
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
        isEditNode: taskDefinitionKey.value === 'Activity_1lximsi' ? 'true' : 'false',
      },
    })

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            Detail.value?.workflowView(entity)

            // 人力资源确认节点
            humanResourcesDetail1.value?.workflowView(entity)
            humanResourcesUpsert.value?.workflowView(entity)
            humanResourcesDetail2.value?.workflowView(entity)

            DetailOther.value?.workflowView(entity)
            break
          case 'view':
            Detail.value?.workflowView?.(entity)
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
