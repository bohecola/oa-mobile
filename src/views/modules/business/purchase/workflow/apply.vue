<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    @approval="handleApproval"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />

    <template v-else>
      <!-- 采购申请 -->
      <div v-if="taskDefinitionKey === 'Activity_11sjm5p'">
        <detail ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 采购执行节点 -->
      <!-- Activity_0x4xddm 实际单价：必填 -->
      <!-- Activity_0qbyt2w 实际单价：非必填 -->
      <div v-else-if="['Activity_0x4xddm', 'Activity_0qbyt2w'].includes(taskDefinitionKey)">
        <detail ref="ExecuteDetail" :include-fields="executeDetailFields" :show-loading="false" />
        <detail ref="ExecuteUpsert" :include-fields="executeUpsertFields" :show-loading="false" />
        <detail ref="AttachmentListDetail" :include-fields="['ossIdList']" :show-loading="false" />
      </div>

      <!-- 验收节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0ccirhe'">
        <detail ref="CheckDetail" :include-fields="checkDetailFields" :show-loading="false" />
        <detail ref="CheckUpsert" :include-fields="['checkFiles']" :show-loading="false" />
        <detail ref="AttachmentListDetail" :include-fields="['ossIdList']" :show-loading="false" />
      </div>

      <!-- 验收确认 -->
      <div v-else-if="taskDefinitionKey === 'Activity_10qfp2k'">
        <detail ref="ReCheckDetail" :include-fields="overviewFields" :show-loading="false" />
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
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { PurchaseForm } from '@/api/oa/business/purchase/types'
import { startWorkFlow } from '@/api/workflow/task'
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
const taskDefinitionKey = ref<string>(proxy.$route.query.nodeId as string ?? '')
// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// 是否查看
const isView = computed(() => proxy.$route.query.type === 'view')

const allFields: PartialBooleanRecord<PurchaseForm> = {
  id: true,
  no: true,
  subjectType: true,
  psId: true,
  deptId: true,
  type: true,
  businessCategory: true,
  objectCategory: true,
  serviceCategory: true,
  leaseType: true,
  isDeposit: true,
  contractId: true,
  contractNo: true,
  contractExecute: true,
  isOwnerSettlement: true,
  amount: true,
  notTaxAmount: true,
  realAmount: true,
  notTaxRealAmount: true,
  description: true,
  remark: true,
  itemList: true,
  ossIdList: true,
  hasPurchaseContract: true,
  // 流程中不展示关联采购合同
  purchaseContractIds: false,
  purchaseFiles: true,
  checkFiles: true,
}

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
    notTaxRealAmount: false,
    hasPurchaseContract: false,
    purchaseContractIds: false,
    purchaseFiles: false,
    checkFiles: false,
  }),
)

// 其他通用节点审批字段
const commonFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
    realAmount: false,
    notTaxRealAmount: false,
    hasPurchaseContract: false,
    purchaseContractIds: false,
    purchaseFiles: false,
    checkFiles: false,
  }),
)

// 执行字段
const executeDetailFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
    itemList: false,
    realAmount: false,
    notTaxRealAmount: false,
    hasPurchaseContract: false,
    purchaseContractIds: false,
    purchaseFiles: false,
    checkFiles: false,
    ossIdList: false,
  }),
)
const executeUpsertFields = ref(
  filterTruthyKeys<PurchaseForm>({
    itemList: true,
    realAmount: true,
    notTaxRealAmount: true,
    hasPurchaseContract: true,
    purchaseContractIds: false,
    purchaseFiles: true,
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
//           itemList,
//         },
//       }
//       // 启动流程
//       await startWorkFlow(submitFormData.value).then(next)
//     },
//   })
// }

// // 暂存
// async function handleTempSave({ load, done, initiator, next }: TempSavePayload) {
//   const { valid, data } = await Upsert.value?.workflowSubmit()

//   if (valid) {
//     load()
//     const entity = { ...data, initiator }

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
  const { taskId } = proxy.$route.query
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
        isEditNode: (['Activity_11sjm5p', 'Activity_0qbyt2w', 'Activity_0x4xddm', 'Activity_0ccirhe'].includes(taskDefinitionKey.value as string) ? 'true' : 'false'),
      },
    })

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            Upsert.value?.workflowView(entity)
            AttachmentListDetail.value?.workflowView(entity)
            ExecuteDetail.value?.workflowView(entity)
            ExecuteUpsert.value?.workflowView(entity)
            CheckDetail.value?.workflowView(entity)
            CheckUpsert.value?.workflowView(entity)
            ReCheckDetail.value?.workflowView(entity)
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
