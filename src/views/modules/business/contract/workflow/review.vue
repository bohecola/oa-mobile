<template>
  <WorkflowPage :entity-variables="submitFormData.variables?.entity" @approval="handleApproval">
    <Detail v-if="isView" ref="DetailRef" :include-fields="includeFields" />
    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_08sjg5i'" v-loading="loading">
        <!-- <upsert ref="Upsert" :include-fields="includeFields" :show-loading="false" /> -->
      </div>
      <!-- 收入- 部门经理节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_08vtkwi'" v-loading="loading">
        <Detail ref="Detail2Ref" :include-fields="includeFieldsDetail2" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else v-loading="loading">
        <Detail ref="DetailOtherRef" :include-fields="includeFieldsOther" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang='ts'>
import Detail from '../detail.vue'
import type { ContractForm } from '@/api/oa/business/contract/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'
import { filterTruthyKeys } from '@/utils'

type Entity = ContractForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')

// 引用
const DetailRef = ref<InstanceType<typeof Detail> | null>()
const Detail2Ref = ref<InstanceType<typeof Detail> | null>()
const DetailOtherRef = ref<InstanceType<typeof Detail> | null>()

// 字段
const includeFields = ref(
  filterTruthyKeys<ContractForm>({
    // no: true,
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
    originalFile: true,
    noAmountFile: true,
    status: true,
    remark: true,
    ossIdList: true,
  }),
)

// 收入部门经理 节点 - 查看
const includeFieldsDetail2 = filterTruthyKeys<ContractForm>({
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
})

// 字段
const includeFieldsOther = ref(
  filterTruthyKeys<ContractForm>({
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
    originalFile: true,
    noAmountFile: true,
    status: true,
    remark: true,
    ossIdList: true,
  }),
)

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// 是否查看
const isView = computed(() => proxy?.$route.query.type === 'view')

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  // let res: any
  // if (taskDefinitionKey.value == 'Activity_08sjg5i') {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value == 'Activity_08vtkwi') {
  //   // 收入部门经理 节点
  //   res = await Upsert2.value?.workflowSubmit()
  // }
  // if (res) {
  //   const { valid, data } = res
  //   if (valid) {
  //     Object.assign(submitFormData.value.variables.entity, data)
  //   }
  // }
  // 打开审批弹窗
  const { taskId } = proxy?.$route.query ?? {}
  open(taskId as string)
}

onMounted(async () => {
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}

  loading.value = true
  const res = await useWorkflowViewData({ taskId, processInstanceId })

  const { entity, task } = res.data
  submitFormData.value.variables.entity = entity
  taskDefinitionKey.value = task.taskDefinitionKey

  nextTick(async () => {
    switch (type as string) {
      case 'update':
      case 'approval': {
        try {
          // await Upsert.value?.workflowView({ taskId, processInstanceId });

          // await Upsert2.value?.workflowView({ taskId, processInstanceId });

          await Detail2Ref.value?.workflowView({ taskId, processInstanceId })

          await DetailOtherRef.value?.workflowView({ taskId, processInstanceId })
        }
        finally {
          loading.value = false
        }
        break
      }
      case 'view': {
        await DetailRef.value?.workflowView?.({ taskId, processInstanceId })
      }
    }
  })
})
</script>
