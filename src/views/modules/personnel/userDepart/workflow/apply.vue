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
      <div v-if="taskDefinitionKey === 'Activity_1npxmwc'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>
      <!-- 工作交接 详情--交接内容--可编辑的附件列表 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0qv4t1b'">
        <detail ref="Detail3" :include-fields="handoverDetailFields" :show-loading="false" />
        <upsert ref="Upsert3" :include-fields="['departDate', 'handoverContent']" :show-loading="false" />
        <detail ref="Detail4" :include-fields="['reason']" :show-loading="false" />
        <upsert ref="Upsert4" :include-fields="['ossIdList']" :show-loading="false" />
      </div>

      <!-- 人力扣款节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0jjf8i3'">
        <detail ref="HRDeductionDetail1" :include-fields="HRDeductionDetail1Fields1" :show-loading="false" />
        <upsert ref="HRDeductionUpsert" :include-fields="['userType']" :show-loading="false" />
        <detail ref="HRDeductionDetail2" :include-fields="HRDeductionDetail1Fields2" :show-loading="false" />
      </div>

      <!-- 归档节点 详情--归档内容--可编辑的附件列表 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0zx1e0l'">
        <detail ref="Detail2" :include-fields="documentDetailFields" :show-loading="false" />
        <upsert ref="Upsert2" :include-fields="['documentContent', 'ossIdList']" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="DetailOther" :include-fields="commonFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { UserDepartForm } from '@/api/oa/personnel/userDepart/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { useWorkflow, useWorkflowViewData } from '@/hooks'

type Entity = UserDepartForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<UserDepartForm>()

// 引用
const Upsert = ref<InstanceType<typeof upsert>>()
// 归档节点
const Upsert2 = ref<InstanceType<typeof upsert>>()
const Detail2 = ref<InstanceType<typeof detail>>()
// 详情
const Detail = ref<InstanceType<typeof detail>>()
const DetailOther = ref<InstanceType<typeof detail>>()
// 工作交接
const Upsert3 = ref<InstanceType<typeof upsert>>()
const Detail3 = ref<InstanceType<typeof detail>>()
const Detail4 = ref<InstanceType<typeof detail>>()
const Upsert4 = ref<InstanceType<typeof upsert>>()
// 人力扣款
const HRDeductionUpsert = ref<InstanceType<typeof upsert>>()
const HRDeductionDetail1 = ref<InstanceType<typeof detail>>()
const HRDeductionDetail2 = ref<InstanceType<typeof detail>>()

// 所有字段
const allFields: PartialBooleanRecord<UserDepartForm> = {
  id: true,
  userId: true,
  deptId: true,
  deptType: true,
  postId: true,
  userType: true,
  entryCompanyDate: true,
  departPreDate: true,
  specialCommercialInsurance: true,
  isLoginCompanyEmail: true,
  departDate: true,
  reason: true,
  handoverPerson: true,
  handoverContent: true,
  documentContent: true,
  ossIdList: true,
}

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
  }),
)

// 申请字段
const applyFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    departDate: false,
    userType: false,
    handoverContent: false,
    documentContent: false,
  }),
)

// 工作交接详情
const handoverDetailFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    departDate: false,
    handoverContent: false,
    reason: false,
    ossIdList: false,
  }),
)

// 人力扣款详情1
const HRDeductionDetail1Fields1 = ref(
  filterTruthyKeys<UserDepartForm>({
    userId: true,
    deptId: true,
    postId: true,
  }),
)

// 人力扣款详情2
const HRDeductionDetail1Fields2 = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    userType: false,
    userId: false,
    deptId: false,
    postId: false,
    documentContent: false,
  }),
)

// 归档的节点详情
const documentDetailFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    documentContent: false,
    ossIdList: false,
  }),
)

const commonFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    documentContent: false,
  }),
)

// 开始流程
async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
  // 业务提交
  await Upsert.value?.submit({
    success: async ({ id }) => {
      submitFormData.value = {
        tableName: 'oa_user_depart',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
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

  const success = (data: UserDepartForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_1npxmwc':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 工作交接
    case 'Activity_0qv4t1b':
      await Upsert3.value?.workflowSubmit({ success })
      break
      // 归档
    case 'Activity_0zx1e0l':
      await Upsert2.value?.workflowSubmit({ success })
      break
      // 人力扣款
    case 'Activity_0jjf8i3':
      await HRDeductionUpsert.value?.workflowSubmit({ success })
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
            // 归档节点
            Detail2.value?.workflowView(entity)
            Upsert2.value?.workflowView(entity)
            // 工作交接节点
            Detail3.value?.workflowView(entity)
            Upsert3.value?.workflowView(entity)
            Detail4.value?.workflowView(entity)
            Upsert4.value?.workflowView(entity)
            // 人力扣款
            HRDeductionDetail1.value?.workflowView(entity)
            HRDeductionUpsert.value?.workflowView(entity)
            HRDeductionDetail2.value?.workflowView(entity)
            // 其他通用节点
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
