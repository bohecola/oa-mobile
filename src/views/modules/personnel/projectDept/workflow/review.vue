<template>
  <WorkflowPage :entity-variables="submitFormData.variables?.entity" @approval="handleApproval">
    <Detail v-if="isView" ref="DetailRef" :include-fields="includeFieldsOther" />
    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_0jtyn89'" v-loading="loading">
        <!-- <upsert ref="Upsert" :include-fields="includeFields" :show-loading="false" /> -->
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else v-loading="loading">
        <Detail ref="DetailOtherRef" :include-fields="includeFieldsOther" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import Detail from '../detail.vue'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'
import type { DeptForm } from '@/api/system/dept/types'

type Entity = DeptForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')

// 引用
const DetailRef = ref<InstanceType<typeof Detail> | null>()
const DetailOtherRef = ref<InstanceType<typeof Detail> | null>()

// 字段
const includeFields = ref(
  filterTruthyKeys<DeptForm>({
    deptId: true,
    parentId: true,
    deptName: true,
    type: true,
    deptCategory: true,
    responsibility: true,
    purview: true,
    orderNum: false,
    leader: true,
    phone: false,
    email: false,
    status: false,
    adress: true,
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
    responsibility: true,
    purview: true,
    orderNum: false,
    leader: true,
    phone: false,
    email: false,
    status: false,
    adress: true,
    redFile: true,
    deptPostVoList: false,
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
  // if (taskDefinitionKey.value == 'Activity_0jtyn89') {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit()
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

// 挂载
onMounted(async () => {
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}
  const res = await useWorkflowViewData({ taskId, processInstanceId })

  if (res && res.data) {
    const { entity, task } = res.data
    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey
  }

  nextTick(async () => {
    switch (type as string) {
      case 'update':
      case 'approval': {
        try {
          loading.value = true
          await DetailRef.value?.workflowView({ taskId, processInstanceId })

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
