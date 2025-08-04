<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    :reset-form="Upsert?.reset"
    @temp-save="handleTempSave"
    @submit="handleSubmit"
    @approval="handleApproval"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />

    <template v-else>
      <!-- 采购变更申请 -->
      <div v-if="taskDefinitionKey === 'Activity_1a2uwm7'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 采购执行节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0spzaws'">
        <detail ref="ExecuteDetail" :include-fields="executeDetailFields" :show-loading="false" />
        <upsert ref="ExecuteUpsert" :include-fields="['ossIdList']" :show-loading="false" />
      </div>

      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="commonFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { PurchaseChangeForm } from '@/api/oa/business/purchaseChange/types'
import { startWorkFlow } from '@/api/workflow/task'
import { useWorkflow, useWorkflowViewData } from '@/hooks'
import { filterTruthyKeys } from '@/utils'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, isView, procdefName } = useWorkflow<PurchaseChangeForm>()

// 引用
const Detail = ref<InstanceType<typeof detail>>()
const Upsert = ref<InstanceType<typeof upsert>>()

const ExecuteDetail = ref<InstanceType<typeof detail>>()
const ExecuteUpsert = ref<InstanceType<typeof upsert>>()

const CommonDetail = ref<InstanceType<typeof detail>>()

const allFields: PartialBooleanRecord<PurchaseChangeForm> = {
  purchaseId: true,
  amount: true,
  newAmount: true,
  releaseAmount: true,
  changeItemList: true,
  remark: true,
  ossIdList: true,
  purchaseVo: true,
}

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<PurchaseChangeForm>({
    ...allFields,
  }),
)

// 申请字段
const applyFields = ref(
  filterTruthyKeys<PurchaseChangeForm>({
    ...allFields,
  }),
)

// 执行字段
const executeDetailFields = ref(
  filterTruthyKeys<PurchaseChangeForm>({
    ...allFields,
    ossIdList: false,
  }),
)

// 其他通用节点审批字段
const commonFields = ref(
  filterTruthyKeys<PurchaseChangeForm>({
    ...allFields,
  }),
)

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions<PurchaseChangeForm>) {
  const { operation, entity, next } = options

  const { initiator, amount, newAmount } = entity

  const processInstanceName = `${procdefName.value}（${amount}→${newAmount}）${initiator.nickName}`

  // 业务提交
  await Upsert.value?.submit({
    operation,
    success: async ({ id, changeItemList }) => {
      submitFormData.value = {
        tableName: 'oa_purchase_change',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
            changeItemList,
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
  await Upsert.value?.workflowSubmit({
    success: async (data) => {
      load()
      await handleStartWorkflow({
        operation,
        entity: { ...data, initiator },
        next,
      }).finally(done)
    },
  })
}

// 提交
async function handleSubmit({ load, done, open, initiator }: SubmitPayload) {
  await Upsert.value?.workflowSubmit({
    success: async (data) => {
      load()
      const next = (res: any) => open(res.data?.taskId)
      await handleStartWorkflow({
        entity: { ...data, initiator },
        next,
      }).finally(done)
    },
  })
}

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  const { taskId } = proxy.$route.query

  const success = (data: PurchaseChangeForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_1a2uwm7':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 执行节点
    case 'Activity_0spzaws':
      await ExecuteUpsert.value?.workflowSubmit({ success })
      break
    // 打开审批弹窗
    default:
      open(taskId as string)
      break
  }
}

onMounted(async () => {
  const { type, taskId, processInstanceId, nodeId } = proxy.$route.query
  taskDefinitionKey.value = nodeId as string
  isView.value = type === 'view'

  if (taskId || processInstanceId) {
    loading.value = true
    const { data } = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task, processDefinitionName } = data

    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey
    procdefName.value = processDefinitionName

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            Upsert.value?.workflowView(entity)
            ExecuteDetail.value?.workflowView(entity)
            ExecuteUpsert.value?.workflowView(entity)
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
