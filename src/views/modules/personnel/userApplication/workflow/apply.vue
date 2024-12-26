<template>
  <WorkflowPage :loading="loading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" :include-fields="includeFieldsDetail" :show-loading="false" />

    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_020ehmy'" v-loading="loading">
        <!-- <Upsert ref="Upsert" :include-fields="includeFields" :show-loading="false" /> -->
      </div>
      <!-- 当是申请人确认节点时需要输入系统账号 -->
      <div v-else-if="taskDefinitionKey === 'Activity_1gtf30k'">
        <detail ref="Detail2" :include-fields="includeFieldsDetail2" :show-loading="false" />
        <detail ref="Upsert2" :include-fields="['userAccount']" :show-loading="false" />
        <detail ref="Detail3" :include-fields="['employmentEvaluate', 'description', 'ossIdList']" :show-loading="false" />
      </div>
      <!-- 当是确认到岗节点时需要选择实际到岗时间 -->
      <div v-else-if="taskDefinitionKey === 'Activity_1jpbu3r'">
        <detail ref="Detail4" :include-fields="includeFieldsDetail3" :show-loading="false" />
        <detail ref="Upsert3" :include-fields="['realDate']" :show-loading="false" />
        <detail ref="Detail5" :include-fields="['employmentEvaluate', 'description', 'ossIdList']" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else v-loading="loading">
        <detail ref="DetailOther" :include-fields="includeFieldsDetail" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import type { UserEmploymentForm } from '@/api/oa/personnel/userApplication/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'
import type { UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'

type Entity = UserEmploymentForm & { initiator: Initiator } & UserPreEmploymentForm

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')

provide('taskDefinitionKey', taskDefinitionKey)

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
// 申请人确认节点
const Upsert2 = ref<InstanceType<typeof detail> | null>()
const Detail2 = ref<InstanceType<typeof detail> | null>()
const Detail3 = ref<InstanceType<typeof detail> | null>()

// 其他节点
const DetailOther = ref<InstanceType<typeof detail> | null>()

// 确认到岗节点
const Detail4 = ref<InstanceType<typeof detail> | null>()
const Upsert3 = ref<InstanceType<typeof detail> | null>()
const Detail5 = ref<InstanceType<typeof detail> | null>()

// 第一步字段 （没有系统账号，预计到岗时间）
const includeFields = ref(
  filterTruthyKeys<UserEmploymentForm>({
    preEmploymentId: true,
    name: true,
    checked: true,
    deptId: true,
    postId: true,
    sex: true,
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
  }),
)

const includeFieldsDetail = ref(
  filterTruthyKeys<UserEmploymentForm>({
    preEmploymentId: true,
    deptId: true,
    postId: true,
    sex: true,
    phonenumber: true,
    nation: true,
    education: true,
    realDate: true,
    wages: true,
    baseWages: true,
    postWages: true,
    performanceWages: true,
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
  }),
)

// 申请确认节点 - 查看（没有系统账号）
const includeFieldsDetail2 = filterTruthyKeys<UserEmploymentForm>({
  preEmploymentId: true,
  deptId: true,
  postId: true,
  sex: true,
  phonenumber: true,
  nation: true,
  education: true,
  hopeDate: true,
  wages: true,
  baseWages: true,
  postWages: true,
  performanceWages: true,
  probationWagesRate: true,
  isProbation: true,
  probationCycle: true,
  isRecommend: true,
  reference: true,
  isIntern: true,
})

// 确认到岗 - 查看（有系统账号）
const includeFieldsDetail3 = filterTruthyKeys<UserEmploymentForm>({
  preEmploymentId: true,
  userAccount: true,
  deptId: true,
  postId: true,
  sex: true,
  phonenumber: true,
  nation: true,
  education: true,
  hopeDate: true,
  wages: true,
  baseWages: true,
  postWages: true,
  performanceWages: true,
  probationWagesRate: true,
  isProbation: true,
  probationCycle: true,
  isRecommend: true,
  reference: true,
  isIntern: true,
})

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
  // 打开审批弹窗
  // const { taskId } = proxy.$route.query;
  // let res: any;
  // if ('Activity_020ehmy' == taskDefinitionKey.value) {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit();
  // } else if ('Activity_1gtf30k' === taskDefinitionKey.value) {
  //   // 归档 节点
  //   res = await Upsert2.value?.workflowSubmit();
  // }
  // if (res) {
  //   const { valid, data } = res;
  //   if (valid) {
  //     Object.assign(submitFormData.value.variables.entity, data);
  //     open(taskId as string);
  //   }
  //   return true;
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
        isEditNode: (taskDefinitionKey.value === 'Activity_1gtf30k' || taskDefinitionKey.value === 'Activity_1jpbu3r') ? 'true' : 'false',
      },
    })

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            // Upsert.value?.workflowView(entity)
            // 申请确认节点
            Upsert2.value?.workflowView(entity)
            Detail2.value?.workflowView(entity)
            Detail3.value?.workflowView(entity)

            // 确认到岗节点
            Detail4.value?.workflowView(entity)
            Upsert3.value?.workflowView(entity)
            Detail5.value?.workflowView(entity)

            // 其他节点
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
