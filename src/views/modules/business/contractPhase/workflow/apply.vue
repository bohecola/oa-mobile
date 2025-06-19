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
      <div v-if="taskDefinitionKey === 'Activity_14g39r6'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 需求部门经理填报确认 -->
      <div v-else-if="taskDefinitionKey === 'Activity_1p6s0tb'">
        <upsert ref="ConfirmUpsert" :include-fields="confirmFields" :show-loading="false" />
      </div>

      <!-- 通用审批节点 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="overviewFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import type { ContractPhaseCustomForm } from '../form'
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import { useWorkflow, useWorkflowViewData } from '@/hooks'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<ContractPhaseCustomForm>()

// 引用
const Detail = ref<InstanceType<typeof detail>>()
const Upsert = ref<InstanceType<typeof upsert>>()

const ConfirmUpsert = ref<InstanceType<typeof upsert>>()

const CommonDetail = ref<InstanceType<typeof detail>>()

const allFields: PartialBooleanRecord<ContractPhaseCustomForm> = {
  contractId: true,
  contractNo: true,
  contractCategory: true,
  contractDeptId: true,
  contractStartDate: true,
  contractEndDate: true,
  contractAmount: true,
  itemList: true,
}

// 总览字段
const overviewFields = filterTruthyKeys<ContractPhaseCustomForm>({
  ...allFields,
})

// 申请字段
const applyFields = filterTruthyKeys<ContractPhaseCustomForm>({
  ...allFields,
})

// 需求部门经理填报确认字段
const confirmFields = filterTruthyKeys<ContractPhaseCustomForm>({
  ...allFields,
})

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions<ContractPhaseCustomForm>) {
  const { entity, next } = options

  const { contractNo, initiator } = entity

  const processInstanceName = `${procdefName.value}-${contractNo}-${initiator.nickName}`

  // 业务提交
  await Upsert.value?.submit({
    success: async ({ id, itemList }) => {
      submitFormData.value = {
        tableName: 'oa_contract_phase',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
            itemList,
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

  const success = (data: ContractPhaseCustomForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_14g39r6':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 需求部门经理提交结算资料
    case 'Activity_1p6s0tb':
      await ConfirmUpsert.value?.workflowSubmit({ success })
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
            ConfirmUpsert.value?.workflowView(entity)
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
