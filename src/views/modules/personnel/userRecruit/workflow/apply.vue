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
      <div v-if="taskDefinitionKey === 'Activity_0g08l2m'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>
      <!-- 归档节点 输入招聘编号 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0jk4xkf'">
        <detail ref="ArchiveDetailDetail1" :include-fields="archiveDetailFields1" :show-loading="false" />
        <upsert ref="ArchiveDetailUpsert1" :include-fields="['no']" :show-loading="false" />
        <detail ref="ArchiveDetailDetail2" :include-fields="archiveDetailFields2" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <!-- 查看需要编号，编号后端在新增时处理 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="overviewFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang='ts'>
import detail from '../detail.vue'
import upsert from '../upsert.vue'
import type { UserRecruitForm } from '@/api/oa/personnel/userRecruit/types'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { useWorkflow, useWorkflowViewData } from '@/hooks'
import { startWorkFlow } from '@/api/workflow/task'

type Entity = UserRecruitForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<UserRecruitForm>()

// 引用
const Upsert = ref<InstanceType<typeof upsert>>()
const Detail = ref<InstanceType<typeof detail>>()
const CommonDetail = ref<InstanceType<typeof detail>>()
// 归档
const ArchiveDetailDetail1 = ref<InstanceType<typeof detail>>()
const ArchiveDetailUpsert1 = ref<InstanceType<typeof upsert>>()
const ArchiveDetailDetail2 = ref<InstanceType<typeof detail>>()

// 所有字段
const allFields: PartialBooleanRecord<UserRecruitForm> = {
  id: true,
  no: true,
  deptId: true,
  status: true,
  recruitStartDate: true,
  recruitEndDate: true,
  hopeArriveDate: true,
  applyReason: true,
  address: true,
  // projectDeptNumber: true,
  remark: true,
  userRecruitPostBoList: true,
  ossIdList: true,
}

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<UserRecruitForm>({
    ...allFields,
    status: false,
    recruitStartDate: false,
    recruitEndDate: false,
    remark: false,
  }),
)

// 申请字段
const applyFields = ref(
  filterTruthyKeys<UserRecruitForm>({
    ...allFields,
    no: false,
    status: false,
    recruitStartDate: false,
    recruitEndDate: false,
    remark: false,
  }),
)

// 归档的节点详情
const archiveDetailFields1 = ref(
  filterTruthyKeys<UserRecruitForm>({
    deptId: true,
    hopeArriveDate: true,
    // projectDeptNumber: true,
  }),
)
// 归档的节点详情
const archiveDetailFields2 = ref(
  filterTruthyKeys<UserRecruitForm>({
    applyReason: true,
    address: true,
    projectDeptNumber: true,
    remark: false,
    userRecruitPostBoList: true,
    ossIdList: true,
  }),
)

// 开始流程
async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
  // 业务提交
  await Upsert.value?.submit({
    success: async ({ id, userRecruitPostBoList }) => {
      submitFormData.value = {
        tableName: 'oa_user_recruit',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
            userRecruitPostBoList,
          },
        },
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

  const success = (data: UserRecruitForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_0g08l2m':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 归档节点
    case 'Activity_0jk4xkf':
      await ArchiveDetailUpsert1.value?.workflowSubmit({ success })
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
            Detail.value?.workflowView(entity)
            ArchiveDetailDetail1.value?.workflowView(entity)
            ArchiveDetailUpsert1.value?.workflowView(entity)
            ArchiveDetailDetail2.value?.workflowView(entity)
            CommonDetail.value?.workflowView(entity)
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
