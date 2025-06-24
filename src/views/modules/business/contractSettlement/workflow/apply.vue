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
      <!-- 申请节点 -->
      <div v-if="taskDefinitionKey === 'Activity_1cd2edf'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 申请部门经理审核 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0dz1cw9'">
        <detail ref="ManagerDetail" :include-fields="managerDetailFields" :show-loading="false" />
      </div>

      <!-- 需求部门经理提交结算资料 -->
      <div v-else-if="taskDefinitionKey === 'Activity_12wbile'">
        <detail ref="NeedManagerDetail" :include-fields="NeedManagerFields" :show-loading="false" />
        <upsert ref="NeedManagerUpsert" :include-fields="['isAssign', 'assignUser', 'fileMap']" :show-loading="false" />
      </div>

      <!-- 指派人提交结算资料 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0bclr8t'">
        <detail ref="AssignDetail" :include-fields="assignDetailFields" :show-loading="false" />
        <upsert ref="AssignUpsert" :include-fields="['fileMap']" :show-loading="false" />
      </div>

      <!-- 回款节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_1gp1gat'">
        <detail ref="CollectedDetail1" :include-fields="collectedDetail1Fields" :show-loading="false" />
        <upsert ref="CollectedUpsert" :include-fields="['collectionList']" :show-loading="false" />
        <detail ref="CollectedDetail2" :include-fields="['fileMap']" :show-loading="false" />
      </div>

      <!-- 通用审批节点 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="overviewFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { ContractSettlementForm } from '@/api/oa/business/contractSettlement/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import { useWorkflow, useWorkflowViewData } from '@/hooks'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<ContractSettlementForm>()

// 引用
const Detail = ref<InstanceType<typeof detail>>()
const Upsert = ref<InstanceType<typeof upsert>>()

const ManagerDetail = ref<InstanceType<typeof detail>>()

const NeedManagerDetail = ref<InstanceType<typeof detail>>()
const NeedManagerUpsert = ref<InstanceType<typeof upsert>>()

const AssignDetail = ref<InstanceType<typeof detail>>()
const AssignUpsert = ref<InstanceType<typeof upsert>>()

const CollectedDetail1 = ref<InstanceType<typeof detail>>()
const CollectedUpsert = ref<InstanceType<typeof upsert>>()
const CollectedDetail2 = ref<InstanceType<typeof detail>>()

const CommonDetail = ref<InstanceType<typeof detail>>()

const allFields: PartialBooleanRecord<ContractSettlementForm> = {
  contractId: true,
  contractNo: true,
  contractCategory: true,
  contractDeptId: true,
  contractStartDate: true,
  contractEndDate: true,
  contractAmount: true,
  collectionList: true,
  fileMap: true,
  isSeal: true,
  isAssign: true,
  assignUser: true,
  settlements: true,
  remark: true,
}

// 总览字段
const overviewFields = filterTruthyKeys<ContractSettlementForm>({
  ...allFields,
})

// 申请字段
const applyFields = filterTruthyKeys<ContractSettlementForm>({
  ...allFields,
  isAssign: false,
  assignUser: false,
  fileMap: false,
})

// 申请部门经理审核字段
const managerDetailFields = filterTruthyKeys<ContractSettlementForm>({
  ...allFields,
  isAssign: false,
  assignUser: false,
  fileMap: false,
})

// 提交结算资料字段
const NeedManagerFields = filterTruthyKeys<ContractSettlementForm>({
  ...allFields,
  isAssign: false,
  assignUser: false,
  fileMap: false,
})

// 指派人提交结算资料字段
const assignDetailFields = filterTruthyKeys<ContractSettlementForm>({
  ...allFields,
  fileMap: false,
})

// 回款节点字段
const collectedDetail1Fields = filterTruthyKeys<ContractSettlementForm>({
  ...allFields,
  collectionList: false,
  fileMap: false,
})

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions<ContractSettlementForm>) {
  const { entity, next } = options

  const { contractNo, initiator } = entity

  const processInstanceName = `${procdefName.value}-${contractNo}-${initiator.nickName}`

  // 业务提交
  await Upsert.value?.submit({
    success: async ({ id, collectionList }) => {
      submitFormData.value = {
        tableName: 'oa_contract_settlement',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
            collectionList,
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
      await handleStartWorkflow({ entity, next }).finally(done)
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
      await handleStartWorkflow({ entity, next }).finally(done)
    },
  })
}

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  const { taskId } = proxy.$route.query

  const success = (data: ContractSettlementForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_1cd2edf':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 需求部门经理提交结算资料
    case 'Activity_12wbile':
      await NeedManagerUpsert.value?.workflowSubmit({ success })
      break
    // 指派人提交结算资料
    case 'Activity_0bclr8t':
      await AssignUpsert.value?.workflowSubmit({ success })
      break
    // 回款节点
    case 'Activity_1gp1gat':
      await CollectedUpsert.value?.workflowSubmit({ success })
      break
    // 打开审批弹窗
    default:
      open(taskId as string)
      break
  }
}

onMounted(async () => {
  // 初始化
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

            ManagerDetail.value?.workflowView(entity)

            NeedManagerDetail.value?.workflowView(entity)
            NeedManagerUpsert.value?.workflowView(entity)

            AssignDetail.value?.workflowView(entity)
            AssignUpsert.value?.workflowView(entity)

            CollectedDetail1.value?.workflowView(entity)
            CollectedUpsert.value?.workflowView(entity)
            CollectedDetail2.value?.workflowView(entity)

            CommonDetail.value?.workflowView(entity)
            Detail.value?.workflowView(entity)
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
