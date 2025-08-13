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
    </div>

    <template v-else>
      <!-- 申请节点 -->
      <div v-if="taskDefinitionKey === 'Activity_0b1xl27'">
        <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 部门经理提交 -->
      <div v-else-if="taskDefinitionKey === 'Activity_1ljuzl8'">
        <detail ref="ManagerDetail" :include-fields="managerDetailFields" :show-loading="false" />
        <upsert ref="ManagerUpsert" :include-fields="managerUpsertFields" :show-loading="false" />
      </div>

      <!-- 指派人提交 -->
      <div v-else-if="taskDefinitionKey === 'Activity_08ufmxa'">
        <detail ref="AssignDetail" :include-fields="assignDetailFields" :show-loading="false" />
        <upsert ref="AssignUpsert" :include-fields="assignUpsertFields" :show-loading="false" />
      </div>

      <!-- 通用审批节点 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="commonFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { DeptDepartureForm } from '@/api/oa/daily/deptDeparture/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import { useWorkflow, useWorkflowViewData } from '@/hooks'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 流程
const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<DeptDepartureForm>()

// 引用
const Detail = ref<InstanceType<typeof detail>>()
const Upsert = ref<InstanceType<typeof upsert>>()

const ManagerDetail = ref<InstanceType<typeof detail>>()
const ManagerUpsert = ref<InstanceType<typeof upsert>>()

const AssignDetail = ref<InstanceType<typeof detail>>()
const AssignUpsert = ref<InstanceType<typeof upsert>>()

const ArchiveDetail = ref<InstanceType<typeof detail>>()

const CommonDetail = ref<InstanceType<typeof detail>>()

const allFields: PartialBooleanRecord<DeptDepartureForm> = {
  deptId: true,
  departureDate: true,
  reason: true,
  isAssign: true,
  assignUser: true,
  ossIdList: true,
}

// 总览字段
const overviewFields = filterTruthyKeys<DeptDepartureForm>(allFields)

// 通用审批字段
const commonFields = computed(() => {
  const allFieldsNodes = ['Activity_1ljuzl8', 'Activity_08ufmxa', 'Activity_14vmfwo']
  if (allFieldsNodes.includes(taskDefinitionKey.value)) {
    return filterTruthyKeys<DeptDepartureForm>(allFields)
  }

  return filterTruthyKeys<DeptDepartureForm>({
    ...allFields,
    isAssign: false,
    assignUser: false,
    ossIdList: false,
  })
})

// 申请字段
const applyFields = filterTruthyKeys<DeptDepartureForm>({
  ...allFields,
  isAssign: false,
  assignUser: false,
  ossIdList: false,
})

// 经理提交
const managerDetailFields = filterTruthyKeys<DeptDepartureForm>({
  ...allFields,
  isAssign: false,
  assignUser: false,
  ossIdList: false,
})
const managerUpsertFields = filterTruthyKeys<DeptDepartureForm>({
  isAssign: true,
  assignUser: true,
  ossIdList: true,
})

// 指派人提交
const assignDetailFields = filterTruthyKeys<DeptDepartureForm>({
  ...allFields,
  ossIdList: false,
})
const assignUpsertFields = filterTruthyKeys<DeptDepartureForm>({
  ossIdList: true,
})

// 开始流程
async function handleStartWorkflow(options: StartWorkFlowOptions<DeptDepartureForm>) {
  const { entity, next } = options

  const { initiator } = entity

  const processInstanceName = `${procdefName.value}-${initiator.nickName}`

  // 业务提交
  await Upsert.value?.submit({
    success: async ({ id }) => {
      submitFormData.value = {
        tableName: 'oa_dept_departure',
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

  const success = (data: DeptDepartureForm) => {
    Object.assign(submitFormData.value.variables.entity, data)
    open(taskId as string)
  }

  switch (taskDefinitionKey.value) {
    // 申请节点
    case 'Activity_0b1xl27':
      await Upsert.value?.workflowSubmit({ success })
      break
    // 经理提交节点
    case 'Activity_1ljuzl8':
      await ManagerUpsert.value?.workflowSubmit({ success })
      break
    // 指派人提交节点
    case 'Activity_08ufmxa':
      await AssignUpsert.value?.workflowSubmit({ success })
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
            ManagerDetail.value?.workflowView(entity)
            ManagerUpsert.value?.workflowView(entity)
            AssignDetail.value?.workflowView(entity)
            AssignUpsert.value?.workflowView(entity)
            ArchiveDetail.value?.workflowView(entity)
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
