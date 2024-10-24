<template>
  <WorkflowPage :loading="loading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" />

    <template v-else>
      <!-- 采购申请 -->
      <div v-if="taskDefinitionKey === 'Activity_11sjm5p'">
        <detail ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 采购执行节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0qbyt2w'">
        <detail ref="ExecuteDetail" :include-fields="executeDetailFields" :show-loading="false" />
        <detail ref="ExecuteUpsert" :include-fields="executeUpsertFields" :show-loading="false" />
        <detail ref="AttachmentListDetail" :include-fields="attachementFields" :show-loading="false" />
      </div>

      <!-- 验收节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0ccirhe'">
        <detail ref="CheckDetail" :include-fields="checkDetailFields" :show-loading="false" />
        <detail ref="CheckUpsert" :include-fields="checkUpsertFields" :show-loading="false" />
        <detail ref="AttachmentListDetail" :include-fields="attachementFields" :show-loading="false" />
      </div>

      <!-- 验收确认 -->
      <div v-else-if="taskDefinitionKey === 'Activity_10qfp2k'">
        <detail ref="ReCheckDetail" :include-fields="recheckFields" :show-loading="false" />
      </div>

      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="commonFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
// import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { PurchaseForm } from '@/api/oa/business/purchase/types'
import { filterTruthyKeys } from '@/utils'

type Entity = PurchaseForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const Upsert = ref<InstanceType<typeof detail> | null>()

const AttachmentListDetail = ref<InstanceType<typeof detail> | null>()

const ExecuteDetail = ref<InstanceType<typeof detail> | null>()
const ExecuteUpsert = ref<InstanceType<typeof detail> | null>()

const CheckDetail = ref<InstanceType<typeof detail> | null>()
const CheckUpsert = ref<InstanceType<typeof detail> | null>()

const ReCheckDetail = ref<InstanceType<typeof detail> | null>()

const CommonDetail = ref<InstanceType<typeof detail> | null>()

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy!.$route.query.nodeId ?? '')
// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// 是否查看
const isView = computed(() => proxy!.$route.query.type === 'view')

const allFields: PartialBooleanRecord<PurchaseForm> = {
  id: true,
  no: true,
  projectId: true,
  projectName: true,
  type: true,
  businessCategory: true,
  objectCategory: true,
  serviceCategory: true,
  leaseType: true,
  isDeposit: true,
  contractId: true,
  contractName: true,
  contractExecute: true,
  isOwnerSettlement: true,
  amount: true,
  realAmount: true,
  description: true,
  file: true,
  remark: true,
  itemList: true,
  ossIdList: true,
  purchaseContractIds: true,
  checkFiles: true,
}

// 附件列表字段
const attachementFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ossIdList: true,
  }),
)

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
  }),
)

// 申请字段
const applyFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
    realAmount: false,
    purchaseContractIds: false,
    checkFiles: false,
  }),
)

// 其他通用节点审批字段
const commonFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
    realAmount: false,
    purchaseContractIds: false,
    checkFiles: false,
  }),
)

// 执行字段
const executeDetailFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
    itemList: false,
    realAmount: false,
    purchaseContractIds: false,
    checkFiles: false,
    ossIdList: false,
  }),
)
const executeUpsertFields = ref(
  filterTruthyKeys<PurchaseForm>({
    itemList: true,
    realAmount: true,
    purchaseContractIds: true,
  }),
)

// 验收字段
const checkDetailFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
    checkFiles: false,
    ossIdList: false,
  }),
)
const checkUpsertFields = ref(
  filterTruthyKeys<PurchaseForm>({
    checkFiles: true,
  }),
)

// 验收确认字段
const recheckFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
  }),
)

// // 开始流程
// async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
//   // 业务提交
//   await Upsert.value?.submit({
//     success: async ({ id, no, itemList }) => {
//       // 表名
//       submitFormData.value.tableName = 'oa_purchase'
//       // 业务主键
//       submitFormData.value.businessKey = id
//       // 流程变量
//       submitFormData.value.variables = {
//         entity: {
//           ...entity,
//           id,
//           no,
//           itemList
//         },
//       }
//       // 启动流程
//       await startWorkFlow(submitFormData.value).then(next)
//     },
//   })
// }

// // 暂存
// async function handleTempSave({ load, done, initiator }: TempSavePayload) {
//   const { valid, data } = await Upsert.value?.workflowSubmit()

//   if (valid) {
//     load()
//     const entity = { ...data, initiator }

//     const next = () => {
//       proxy?.$modal.msgSuccess('暂存成功')
//       proxy.$tab.closePage(proxy.$route)
//       proxy.$router.go(-1)
//     }

//     await handleStartWorkflow(entity, next).finally(done)
//   }
// }

// // 提交
// async function handleSubmit({ load, done, open, initiator }: SubmitPayload) {
//   const { valid, data } = await Upsert.value?.workflowSubmit()

//   if (valid) {
//     load()
//     const entity = { ...data, initiator }

//     const next = (res: any) => open(res.data?.taskId)

//     await handleStartWorkflow(entity, next).finally(done)
//   }
// }

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  const { taskId } = proxy!.$route.query
  let res: any

  // // 申请节点
  // if (taskDefinitionKey.value === 'Activity_11sjm5p') {
  //   res = await Upsert.value?.workflowSubmit()
  //   // 执行节点
  // }
  // else if (taskDefinitionKey.value === 'Activity_0qbyt2w') {
  //   res = await ExecuteUpsert.value?.workflowSubmit()
  //   // 验收节点
  // }
  // else if (taskDefinitionKey.value === 'Activity_0ccirhe') {
  //   res = await CheckUpsert.value?.workflowSubmit()
  // }

  // if (res) {
  //   const { valid, data } = res
  //   if (valid) {
  //     Object.assign(submitFormData.value.variables.entity!, data)
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
  const { type, taskId, processInstanceId } = proxy!.$route.query

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
        isEditNode: (['Activity_11sjm5p', 'Activity_0qbyt2w', 'Activity_0ccirhe'].includes(taskDefinitionKey.value as string) ? 'true' : 'false'),
      },
    })
  }

  nextTick(async () => {
    try {
      switch (type as string) {
        case 'update':
        case 'approval': {
          await Upsert.value?.workflowView({ taskId, processInstanceId })

          await AttachmentListDetail.value?.workflowView({ taskId, processInstanceId })

          await ExecuteDetail.value?.workflowView({ taskId, processInstanceId })
          await ExecuteUpsert.value?.workflowView({ taskId, processInstanceId })

          await CheckDetail.value?.workflowView({ taskId, processInstanceId })
          await CheckUpsert.value?.workflowView({ taskId, processInstanceId })

          await ReCheckDetail.value?.workflowView({ taskId, processInstanceId })

          await CommonDetail.value?.workflowView({ taskId, processInstanceId })

          break
        }
        case 'view': {
          await Detail.value?.workflowView({ taskId, processInstanceId })
        }
      }
    }
    finally {
      loading.value = false
    }
  })
})
</script>
