<template>
  <WorkflowPage :loading="loading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" :include-fields="includeFieldsDetail" :show-loading="false" />

    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_020ehmy'" v-loading="loading">
        <!-- <Upsert ref="Upsert" :include-fields="includeFields" :show-loading="false" /> -->
      </div>
      <!-- 当是归档节点时需要确认系统账号和实际到岗时间 -->
      <div v-else-if="taskDefinitionKey === 'Activity_1gtf30k'" v-loading="loading">
        <detail ref="Detail2" :include-fields="includeFieldsDetail2" :show-loading="false" />
        <detail ref="Upsert2" :include-fields="includeFieldsUpsert2" :show-loading="false" />
        <detail ref="Detail3" :include-fields="includeFieldsDetail3" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else v-loading="loading">
        <detail ref="DetailOther" :include-fields="includeFieldsOther" :show-loading="false" />
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

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const Upsert2 = ref<InstanceType<typeof detail> | null>()
const Detail2 = ref<InstanceType<typeof detail> | null>()
const Detail3 = ref<InstanceType<typeof detail> | null>()
const DetailOther = ref<InstanceType<typeof detail> | null>()

// 字段
const includeFields = ref(
  filterTruthyKeys<UserEmploymentForm>({
    preEmploymentId: true,
    name: true,
    nation: true,
    education: true,
    // userAccount: false,
    hopeDate: true,
    // realDate: false,
    wages: true,
    baseWages: true,
    postWages: true,
    performanceWages: true,
    probationWagesRate: true,
    description: true,
    remark: false,
    deptId: true,
    postId: true,
    deptName: true,
    postName: true,
    sex: true,
    phonenumber: true,
    isProbation: true,
    probationCycle: true,
    checked: true,
    ossIdList: true,
  }),
)

const includeFieldsDetail = ref(
  filterTruthyKeys<UserEmploymentForm>({
    preEmploymentId: true,
    nation: true,
    education: true,
    userAccount: true,
    hopeDate: true,
    realDate: true,
    wages: true,
    baseWages: true,
    postWages: true,
    performanceWages: true,
    probationWagesRate: true,
    description: true,
    remark: false,
    deptName: true,
    postName: true,
    sex: true,
    phonenumber: true,
    isProbation: true,
    probationCycle: true,
    ossIdList: true,
  }),
)

const includeFieldsOther = ref(
  filterTruthyKeys<UserEmploymentForm>({
    preEmploymentId: true,
    nation: true,
    education: true,
    userAccount: false,
    hopeDate: true,
    realDate: false,
    wages: true,
    baseWages: true,
    postWages: true,
    performanceWages: true,
    probationWagesRate: true,
    description: true,
    remark: false,
    deptName: true,
    postName: true,
    sex: true,
    phonenumber: true,
    isProbation: true,
    probationCycle: true,
    ossIdList: true,
  }),
)

// 归档 - 查看附件列表
const includeFieldsDetail3 = filterTruthyKeys<UserEmploymentForm>({
  ossIdList: true,
})

// 归档 - 编辑
const includeFieldsUpsert2 = filterTruthyKeys<UserEmploymentForm>({
  userAccount: true,
  realDate: true,
})

// 归档 - 查看
const includeFieldsDetail2 = filterTruthyKeys<UserEmploymentForm>({
  preEmploymentId: true,
  name: true,
  nation: true,
  education: true,
  // userAccount: true,
  hopeDate: true,
  // realDate: true,
  wages: true,
  baseWages: true,
  postWages: true,
  performanceWages: true,
  probationWagesRate: true,
  description: true,
  remark: false,
  deptName: true,
  postName: true,
  sex: true,
  phonenumber: true,
  isProbation: true,
  probationCycle: true,
  ossIdList: false,
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

  loading.value = true

  if (taskId || processInstanceId) {
    const res = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task } = res.data
    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey

    proxy?.$router.replace({
      query: {
        ...proxy?.$route.query,
        taskDefinitionKey: taskDefinitionKey.value,
        isEditNode: (taskDefinitionKey.value === 'Activity_1gtf30k') ? 'true' : 'false',
      },
    })
  }

  nextTick(async () => {
    try {
      switch (type as string) {
        case 'update':
        case 'approval': {
          try {
            await Detail.value?.workflowView({ taskId, processInstanceId })

            await Detail2.value?.workflowView({ taskId, processInstanceId })

            await Upsert2.value?.workflowView({ taskId, processInstanceId })

            await Detail3.value?.workflowView({ taskId, processInstanceId })

            await DetailOther.value?.workflowView({ taskId, processInstanceId })
          }
          finally {
            loading.value = false
          }
          break
        }
        case 'view': {
          await Detail.value?.workflowView?.({ taskId, processInstanceId })
        }
      }
    }
    finally {
      loading.value = false
    }
  })
})
</script>
