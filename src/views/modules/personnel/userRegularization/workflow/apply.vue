<template>
  <WorkflowPage :entity-variables="submitFormData.variables?.entity" @approval="handleApproval">
    <detail v-if="isView" ref="Detail" />
    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_16orier'" v-loading="loading">
        <!-- <upsert ref="Upsert" :show-loading="false" /> -->
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else v-loading="loading">
        <detail ref="DetailOther" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'
import type { UserMessageAllVo } from '@/api/oa/personnel/userRegularization/types'

type Entity = UserMessageAllVo & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const DetailOther = ref<InstanceType<typeof detail> | null>()

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
  // if (taskDefinitionKey.value == 'Activity_16orier') {
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
  if (taskId || processInstanceId) {
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
  }

  nextTick(async () => {
    switch (type as string) {
      case 'update':
      case 'approval': {
        try {
          loading.value = true
          await Detail.value?.workflowView({ taskId, processInstanceId })

          await DetailOther.value?.workflowView({ taskId, processInstanceId })
        }
        finally {
          loading.value = false
        }
        break
      }
      case 'view': {
        await Detail.value?.workflowView?.({ taskId, processInstanceId })
      }
    }
  })
})
</script>
