<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    :reset-form="Upsert?.reset"
    @temp-save="handleTempSave"
    @submit="handleSubmit"
    @approval="handleApproval"
  >
    <div v-if="isView">
      <detail ref="Detail" :include-fields="overviewFields" :show-loading="false" />

      <!-- 自行采购通过后展示 -->
      <div
        v-if="submitFormData.variables?.entity?.purchaseMethod === '2' && businessStatus === 'finish'"
      >
        <img
          :src="zixingcaigou" alt="自行采购"
          class="absolute top-[82px] right-[32px] w-14 h-14 opacity-70"
        >
      </div>
    </div>

    <template v-else>
      <!-- 采购申请 -->
      <div v-if="taskDefinitionKey === 'Activity_11sjm5p'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 采购执行节点 -->
      <!-- Activity_0x4xddm 实际单价：必填 -->
      <!-- Activity_0qbyt2w 实际单价：非必填 -->
      <div v-else-if="['Activity_0x4xddm', 'Activity_0qbyt2w'].includes(taskDefinitionKey)">
        <detail ref="ExecuteDetail" :include-fields="executeDetailFields" :show-loading="false" />
        <upsert ref="ExecuteUpsert" :include-fields="executeUpsertFields" :show-loading="false" />
        <detail ref="AttachmentListDetail" :include-fields="['ossIdList']" :show-loading="false" />
      </div>

      <!-- 验收节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0ccirhe'">
        <detail ref="CheckDetail" :include-fields="checkDetailFields" :show-loading="false" />
        <upsert ref="CheckUpsert" :include-fields="['checkFiles']" :show-loading="false" />
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
import { isNil } from 'lodash-es'
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import { allFields } from '../helper'
import { useWorkflow, useWorkflowViewData } from '@/hooks'
import type { PurchaseForm } from '@/api/oa/business/purchase/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import zixingcaigou from '@/assets/images/wf/zixingcaigou.png'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, isView } = useWorkflow<PurchaseForm>()

// 流程状态
const businessStatus = computed(() => proxy.$route.query.wfStatus as string)

// 引用
const Detail = ref<InstanceType<typeof detail>>()
const Upsert = ref<InstanceType<typeof upsert>>()

const AttachmentListDetail = ref<InstanceType<typeof detail>>()

const ExecuteDetail = ref<InstanceType<typeof detail>>()
const ExecuteUpsert = ref<InstanceType<typeof upsert>>()

const CheckDetail = ref<InstanceType<typeof detail>>()
const CheckUpsert = ref<InstanceType<typeof upsert>>()

const ReCheckDetail = ref<InstanceType<typeof detail>>()

const CommonDetail = ref<InstanceType<typeof detail>>()

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
    processName: true,
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

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions<PurchaseForm>) {
  const { operation, entity, next } = options

  const processInstanceName = `${entity.processName}(${entity.amount})`

  // 业务提交
  await Upsert.value?.submit({
    operation,
    success: async ({ id, no, itemList }) => {
      submitFormData.value = {
        tableName: 'oa_purchase',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
            no,
            itemList,
            leaseType: isNil(entity.leaseType) ? '' : entity.leaseType,
          },
        },
        processInstanceName,
      }
      // 启动流程
      await startWorkFlow(submitFormData.value).then(next)
    },
  })
}

// 暂存
async function handleTempSave({ load, done, next, initiator, operation }: TempSavePayload) {
  await Upsert?.value.workflowSubmit({
    success: async (data) => {
      load()
      const options = {
        operation,
        entity: { ...data, initiator },
        next,
      }
      await handleStartWorkflow(options).finally(done)
    },
  })
}

// 提交
async function handleSubmit({ load, done, open, initiator }: SubmitPayload) {
  await Upsert?.value.workflowSubmit({
    success: async (data) => {
      load()
      const options = {
        entity: { ...data, initiator },
        next: (res: any) => open(res.data?.taskId),
      }
      await handleStartWorkflow(options).finally(done)
    },
  })
}

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  const { taskId } = proxy.$route.query

  const success = (data: PurchaseForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_11sjm5p':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 执行节点
    case 'Activity_0x4xddm':
    case 'Activity_0qbyt2w':
      await ExecuteUpsert.value?.workflowSubmit({ success })
      break
    // 验收节点
    case 'Activity_0ccirhe':
      await CheckUpsert.value?.workflowSubmit({ success })
      break
    // 打开审批弹窗
    default:
      open(taskId as string)
      break
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
