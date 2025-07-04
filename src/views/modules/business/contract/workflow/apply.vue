<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    :reset-form="Upsert?.reset"
    @approval="handleApproval"
    @temp-save="handleTempSave"
    @submit="handleSubmit"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />
    <template v-else>
      <!-- 申请节点 -->
      <div v-if="taskDefinitionKey === 'Activity_08sjg5i'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 归档节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0bj6sxt'">
        <detail ref="ArchiveDetail1" :include-fields="archiveDetailFields" :show-loading="false" />
        <upsert ref="ArchiveUpsert" :include-fields="archiveUpsertFields" :show-loading="false" />
        <detail ref="ArchiveDetail2" :include-fields="['purchaseIds', 'ossIdList']" :show-loading="false" />
      </div>

      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="overviewFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import type { ContractForm } from '@/api/oa/business/contract/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import { useWorkflow, useWorkflowViewData } from '@/hooks'

type Entity = ContractForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 合同类型
const { oa_contract_type } = toRefs(proxy.useDict('oa_contract_type'))

const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<ContractForm>()

// 引用
const Detail = ref<InstanceType<typeof detail>>()
const Upsert = ref<InstanceType<typeof upsert>>()

const ArchiveDetail1 = ref<InstanceType<typeof detail>>()
const ArchiveUpsert = ref<InstanceType<typeof upsert>>()
const ArchiveDetail2 = ref<InstanceType<typeof detail>>()

const CommonDetail = ref<InstanceType<typeof detail>>()

const allFields: PartialBooleanRecord<ContractForm> = {
  no: true,
  deptId: true,
  projectId: true,
  projectName: true,
  name: true,
  partyA: true,
  partyB: true,
  partyC: true,
  partyD: true,
  type: true,
  category: true,
  startDate: true,
  endDate: true,
  signDate: true,
  description: true,
  amount: true,
  invoiceType: true,
  taxRate: true,
  paymentWay: true,
  reviewWay: true,
  customizeApprover: true,
  originalFile: true,
  noAmountFile: true,
  // status: true,
  isUseSeal: true,
  fileUseType: true,
  sealUseType: true,
  remark: true,
  ossIdList: true,
  purchaseIds: true,
}

// 总览字段
const overviewFields = filterTruthyKeys<ContractForm>({
  ...allFields,
})

// 申请字段
const applyFields = filterTruthyKeys<ContractForm>({
  ...allFields,
  originalFile: false,
  noAmountFile: false,
})

// 归档字段
const archiveDetailFields = filterTruthyKeys<ContractForm>({
  ...allFields,
  startDate: false,
  endDate: false,
  signDate: false,
  description: false,
  originalFile: false,
  noAmountFile: false,
  remark: false,
  ossIdList: false,
  purchaseIds: false,
})
const archiveUpsertFields = filterTruthyKeys<ContractForm>({
  startDate: true,
  endDate: true,
  signDate: true,
  description: true,
  remark: true,
  originalFile: true,
  noAmountFile: true,
})

// 开始流程
async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
  const { no, initiator, type, amount, partyNameA, partyNameB } = entity

  const typeName = proxy?.selectDictLabel(oa_contract_type.value, type)

  const baseProcdefName = `${typeName}-${procdefName.value}-${no}(${proxy?.formatCurrency(amount)})-${initiator.nickName}`

  const processInstanceName = (function () {
    if (type === 'in' && !isNil(partyNameA)) {
      return `${baseProcdefName}-${partyNameA}`
    }

    if (type === 'out' && !isNil(partyNameB)) {
      return `${baseProcdefName}-${partyNameB}`
    }

    return `${baseProcdefName}`
  })()

  // 业务提交
  await Upsert.value?.submit({
    success: async ({ id }) => {
      submitFormData.value = {
        tableName: 'oa_contract',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
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

  const success = (data: ContractForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_08sjg5i':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 归档节点
    case 'Activity_0bj6sxt':
      await ArchiveUpsert.value?.workflowSubmit({ success })
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
            ArchiveDetail1.value?.workflowView(entity)
            ArchiveUpsert.value?.workflowView(entity)
            ArchiveDetail2.value?.workflowView(entity)
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
