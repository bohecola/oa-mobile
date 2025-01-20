<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    @approval="handleApproval"
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
        <detail ref="ArchiveUpsert" :include-fields="archiveUpsertFields" :show-loading="false" />
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
// import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import type { ContractForm } from '@/api/oa/business/contract/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import { useWorkflowViewData } from '@/hooks'

type Entity = ContractForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy.$route.query.nodeId ?? '')

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const Upsert = ref<InstanceType<typeof detail> | null>()

const ArchiveDetail1 = ref<InstanceType<typeof detail> | null>()
const ArchiveUpsert = ref<InstanceType<typeof detail> | null>()
const ArchiveDetail2 = ref<InstanceType<typeof detail> | null>()

const CommonDetail = ref<InstanceType<typeof detail> | null>()

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
  status: true,
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

// 归档查看
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
// 归档编辑
const archiveUpsertFields = filterTruthyKeys<ContractForm>({
  startDate: true,
  endDate: true,
  signDate: true,
  description: true,
  remark: true,
  originalFile: true,
  noAmountFile: true,
})

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
  processInstanceName: '',
})

// 是否查看
const isView = computed(() => proxy.$route.query.type === 'view')

// // 开始流程
// async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
//   // 业务提交
//   await Upsert.value?.submit({
//     success: async ({ id }) => {
//       submitFormData.value = {
//         tableName: 'oa_contract',
//         businessKey: id,
//         variables: {
//           entity: {
//             ...entity,
//             id,
//           },
//         },
//         processInstanceName: `${proxy.$route.query.procdefName}-${entity.no}-${entity.initiator.nickName}`,
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
  // let res: any
  // if (taskDefinitionKey.value === 'Activity_08sjg5i') {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value === 'Activity_0bj6sxt') {
  //   // 归档 节点
  //   res = await ArchiveUpsert.value?.workflowSubmit()
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
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}
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
      },
    })

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
