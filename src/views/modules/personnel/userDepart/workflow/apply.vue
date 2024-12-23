<template>
  <WorkflowPage :loading="loading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" :include-fields="includeFields" :show-loading="false" />

    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_1npxmwc'">
        <!-- <Upsert ref="Upsert" :include-fields="includeFields" :show-loading="false" /> -->
      </div>
      <!-- 工作交接 详情--交接内容--可编辑的附件列表 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0qv4t1b'">
        <detail ref="Detail3" :include-fields="includeFields2" :show-loading="false" />
      </div>
      <!-- 归档节点 详情--归档内容--可编辑的附件列表 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0zx1e0l'">
        <detail ref="Detail2" :include-fields="includeFields3" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="DetailOther" :include-fields="includeFields3" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import type { UserDepartForm } from '@/api/oa/personnel/userDepart/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'

type Entity = UserDepartForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')

// 引用
// 归档节点
const Detail2 = ref<InstanceType<typeof detail> | null>()
// 详情
const Detail = ref<InstanceType<typeof detail> | null>()
const DetailOther = ref<InstanceType<typeof detail> | null>()
// 工作交接
const Detail3 = ref<InstanceType<typeof detail> | null>()

// 字段
const includeFields = ref(
  filterTruthyKeys<UserDepartForm>({
    userId: true,
    deptId: true,
    postName: true,
    departDate: true,
    handoverPerson: true,
    reason: true,
    handoverContent: true,
    ossIdList: true,
    documentContent: true,
  }),
)

// 工作交接详情
const includeFields2 = ref(
  filterTruthyKeys<UserDepartForm>({
    userId: true,
    deptId: true,
    postName: true,
    departDate: true,
    handoverPerson: true,
    reason: true,
    handoverContent: true,
    ossIdList: false,
  }),
)

// 归档的节点详情
const includeFields3 = ref(
  filterTruthyKeys<UserDepartForm>({
    userId: true,
    deptId: true,
    postName: true,
    departDate: false,
    handoverPerson: true,
    reason: true,
    handoverContent: true,
    documentContent: true,
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
  // if (taskDefinitionKey.value == 'Activity_1npxmwc') {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value === 'Activity_1qpajzq') {
  //   // 部门经理会签需要选择交接人
  //   res = await Upsert1.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value === 'Activity_05cxsln') {
  //   // 工作交接
  //   res = await Upsert3.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value === 'Activity_0zx1e0l') {
  //   // 归档
  //   res = await Upsert2.value?.workflowSubmit()
  // }
  // if (res) {
  //   const { valid, data } = res
  //   if (valid) {
  //     Object.assign(submitFormData.value.variables.entity, data)
  //     // 打开审批弹窗
  //     open(taskId as string)
  //   }
  //   return true
  // }
  // 打开审批弹窗
  const { taskId } = proxy?.$route.query ?? {}
  open(taskId as string)
}

// 挂载
onMounted(async () => {
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}

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
        isEditNode: (taskDefinitionKey.value === 'Activity_0qv4t1b' || taskDefinitionKey.value === 'Activity_0zx1e0l') ? 'true' : 'false',
      },
    })

    nextTick(() => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            // 归档节点
            Detail2.value?.workflowView(entity)
            // 工作交接节点
            Detail3.value?.workflowView(entity)
            DetailOther.value?.workflowView(entity)
            break
          case 'view':
            Detail.value?.workflowView?.(entity)
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
