<template>
  <WorkflowPage :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" />

    <template v-else>
      <!-- 采购申请 -->
      <div v-if="taskDefinitionKey === 'Activity_11sjm5p'" v-loading="loading">
        <detail ref="Upsert" :include-fields="applyFields" :show-loading="false" />
      </div>

      <!-- 中间节点 -->
      <!-- <div v-else-if="taskDefinitionKey == 'Activity_0bj6sxt'" v-loading="loading">
        <detail ref="Detail2" :include-fields="includeFieldsDetail2" :show-loading="false" />
        <upsert ref="Upsert2" :include-fields="includeFieldsUpsert2" :show-loading="false" />
        <detail ref="Detail3" :include-fields="includeFieldsDetail3" :show-loading="false" />
      </div> -->

      <!-- 其他审批通用节点 -->
      <div v-else v-loading="loading">
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

// const Detail2 = ref<InstanceType<typeof detail> | null>();
// const Upsert2 = ref<InstanceType<typeof upsert> | null>();
// const Detail3 = ref<InstanceType<typeof detail> | null>();

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

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<PurchaseForm>({
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
  }),
)

// 申请字段
const applyFields = ref(
  filterTruthyKeys<PurchaseForm>({
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
  }),
)

// 其他通用节点审批字段
const commonFields = ref(
  filterTruthyKeys<PurchaseForm>({
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
  }),
)

// // 开始流程
// async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
//   // 业务提交
//   await Upsert.value?.submit({
//     success: async ({ id, no }) => {
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
  // let res: any

  // // 申请节点
  // if (taskDefinitionKey.value === 'Activity_11sjm5p') {
  //   res = await Upsert.value?.workflowSubmit()
  // }
  // // else if ('Activity_0bj6sxt' === taskDefinitionKey.value) {
  // //   // 归档节点
  // //   res = await Upsert2.value?.workflowSubmit();
  // // }

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
        isEditNode: (taskDefinitionKey.value === 'Activity_11sjm5p') ? 'true' : 'false',
      },
    })
  }

  nextTick(async () => {
    try {
      switch (type as string) {
        case 'update':
        case 'approval': {
          await Upsert.value?.workflowView({ taskId, processInstanceId })

          // await Detail2.value?.workflowView({ taskId, processInstanceId });
          // await Upsert2.value?.workflowView({ taskId, processInstanceId });
          // await Detail3.value?.workflowView({ taskId, processInstanceId });

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
