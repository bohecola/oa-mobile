<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    :group="false"
    @approval="handleApproval"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />

    <template v-else>
      <!-- 预算评审申请节点 -->
      <div v-if="taskDefinitionKey === 'Activity_0kwfbrq'">
        <!-- <el-form-item label="选择预算：">
          <el-select v-model="psId" clearable @change="onPsIdChange">
            <el-option
              v-for="item in options"
              :key="item.id"
              :value="item.id"
              :label="`${item.name}（${parseTime(item.startDate, '{y}-{m}-{d}')} ~ ${parseTime(item.endDate, '{y}-{m}-{d}')}）`"
            />
          </el-select>
        </el-form-item>
        <detail v-if="!isNil(psId)" ref="ApplyDetail" :include-fields="overviewFields" /> -->
      </div>

      <!-- 部门经理/部门副经理 -->
      <div v-else-if="['Activity_0iv2mib', 'Activity_1qa8d0k'].includes(taskDefinitionKey as string)">
        <detail ref="DeptDetail" :include-fields="overviewFields" :show-loading="false" />
      </div>

      <!-- 其他通用审批节点 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="overviewFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import detail from '../detail.vue'
import { useProjectSubjectOptions } from './helper'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { ProjectSubjectForm } from '@/api/oa/finance/projectSubject/types'
import { useWorkflowViewData } from '@/hooks'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'

type Entity = ProjectSubjectForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const ApplyDetail = ref<InstanceType<typeof detail> | null>()
const DeptDetail = ref<InstanceType<typeof detail> | null>()
const CommonDetail = ref<InstanceType<typeof detail> | null>()

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy.$route.query.nodeId ?? '')
// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// const { psId, options } = useProjectSubjectOptions()

// 是否查看
const isView = computed(() => proxy.$route.query.type === 'view')

const overFields: PartialBooleanRecord<ProjectSubjectForm> = {
  type: true,
  name: true,
  contractNo: true,
  startDate: true,
  endDate: true,
  itemList: true,
  ossIdList: true,
}

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<ProjectSubjectForm>({
    ...overFields,
  }),
)

// 预算切换
function onPsIdChange(val: string) {
  nextTick(() => {
    if (!isNil(val)) {
      ApplyDetail.value.view(val)
    }
  })
}

// // 开始流程
// async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
//   if (isNil(psId.value)) {
//     return proxy?.$modal.msgWarning('请选择预算')
//   }

//   submitFormData.value = {
//     tableName: 'oa_project_subject',
//     businessKey: psId.value,
//     variables: {
//       entity: {
//         ...entity,
//         id: psId.value,
//       },
//     },
//   }
//   // 启动流程
//   await startWorkFlow(submitFormData.value).then(next)
// }

// // 暂存
// async function handleTempSave({ load, done, initiator }: TempSavePayload) {
//   const { valid, data } = await ApplyUpsert.value?.workflowSubmit()

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
//   const { valid, data } = await ApplyUpsert.value?.workflowSubmit()

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
  // 打开审批弹窗
  open(taskId as string)
}

// 挂载
onMounted(async () => {
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
        isEditNode: (['Activity_0kwfbrq'].includes(taskDefinitionKey.value as string) ? 'true' : 'false'),
      },
    })

    nextTick(async () => {
      try {
        switch (type as string) {
          case 'update':
          case 'approval':
            await DeptDetail.value?.viewByDept(entity.id)
            await CommonDetail.value?.view(entity.id)
            break
          case 'view':
            await Detail.value?.view(entity.id)
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
