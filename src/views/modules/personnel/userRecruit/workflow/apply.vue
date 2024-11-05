<template>
  <WorkflowPage :loading="loading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" :include-fields="includeFields" />
    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_0g08l2m'">
        <!-- <upsert ref="Upsert" :include-fields="includeFields" :show-loading="false" /> -->
      </div>
      <!-- 其他审批通用节点 -->
      <!-- 查看需要编号，编号后端在新增时处理 -->
      <div v-else>
        <detail ref="DetailOther" :include-fields="includeFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang='ts'>
import detail from '../detail.vue'
import type { UserRecruitForm } from '@/api/oa/personnel/userRecruit/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'

type Entity = UserRecruitForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const DetailOther = ref<InstanceType<typeof detail> | null>()

// 字段
const includeFields = ref(
  filterTruthyKeys<UserRecruitForm>({
    no: true,
    deptId: true,
    status: false,
    recruitStartDate: false,
    recruitEndDate: false,
    hopeArriveDate: true,
    applyReason: true,
    remark: false,
    userRecruitPostBoList: true,
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
  // if (taskDefinitionKey.value == 'Activity_0g08l2m') {
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
        isEditNode: 'false',
      },
    })
  }

  nextTick(async () => {
    try {
      switch (type as string) {
        case 'update':
        case 'approval': {
          await Detail.value?.workflowView({ taskId, processInstanceId })

          await DetailOther.value?.workflowView({ taskId, processInstanceId })

          break
        }
        case 'view': {
          await Detail.value?.workflowView?.({ taskId, processInstanceId })
        }
      }
    }
    finally {
      loading.value = false
    }
  })
})
</script>
