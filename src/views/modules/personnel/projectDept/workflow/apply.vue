<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    @approval="handleApproval"
    @temp-save="handleTempSave"
    @submit="handleSubmit"
  >
    <detail v-if="isView" ref="Detail" :include-fields="includeFieldsOther" :show-loading="false" />
    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_0jtyn89'">
        <upsert ref="Upsert" :include-fields="includeFields" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="DetailOther" :include-fields="includeFieldsOther" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import upsert from '../upsert.vue'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { useWorkflow, useWorkflowViewData } from '@/hooks'
import type { DeptForm } from '@/api/system/dept/types'
import { startWorkFlow } from '@/api/workflow/task'

type Entity = DeptForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<DeptForm>()

// 引用
const Detail = ref<InstanceType<typeof detail>>()
const Upsert = ref<InstanceType<typeof upsert>>()
const DetailOther = ref<InstanceType<typeof detail>>()

// 字段
const includeFields = ref(
  filterTruthyKeys<DeptForm>({
    deptId: true,
    parentId: true,
    deptName: true,
    type: true,
    deptCategory: true,
    businessType: true,
    // responsibility: true,
    // purview: true,
    orderNum: false,
    leader: true,
    phone: false,
    email: false,
    status: false,
    specialCommercialInsurance: true,
    insuranceLimit: true,
    address: true,
    redFile: true,
    ossIdList: true,
  }),
)
const includeFieldsOther = ref(
  filterTruthyKeys<DeptForm>({
    deptId: true,
    parentId: true,
    deptName: true,
    type: true,
    deptCategory: true,
    businessType: true,
    // responsibility: true,
    // purview: true,
    orderNum: false,
    leader: true,
    phone: false,
    email: false,
    status: false,
    specialCommercialInsurance: true,
    insuranceLimit: true,
    address: true,
    redFile: true,
    deptPostVoList: false,
    ossIdList: true,
  }),
)

// 开始流程
async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
  // 业务提交
  await Upsert.value?.submit({
    success: async ({ id }) => {
      submitFormData.value = {
        tableName: 'sys_dept',
        businessKey: id,
        variables: {
          entity: {
            ...entity,
            id,
            deptId: id,
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

  const success = (data: DeptForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_0jtyn89':
      await Upsert.value?.workflowSubmit({ success })
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
