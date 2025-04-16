<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    @approval="handleApproval"
  >
    <template v-if="isView">
      <detail ref="Detail" :include-fields="overviewFields" :show-loading="false" />
      <div class="mt-6">
        <detail ref="OssIdDetail" :include-fields="['ossIdList']" :show-loading="false" />
      </div>
    </template>

    <template v-else>
      <!-- 预算评审申请节点 -->
      <div v-if="taskDefinitionKey === 'Activity_0kwfbrq'">
        <DictSelect
          v-model="psId"
          label="选择预算"
          :options="options"
          clearable
          @change="onPsIdChange"
        />
        <detail v-if="!isNil(psId)" ref="ApplyDetail" :include-fields="applyDetailFields" />
        <!-- <div class="mt-6">
          <upsert v-if="!isNil(psId)" ref="ApplyUpsert" :include-fields="['ossIdList']" />
        </div> -->
      </div>

      <!-- 其他通用审批节点 -->
      <div v-else>
        <detail ref="CommonDetail" :include-fields="overviewFields" :show-loading="false" />
        <div class="mt-6">
          <detail ref="OssIdDetail" :include-fields="['ossIdList']" :show-loading="false" />
        </div>
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import detail from '../detail.vue'
import { useProjectSubjectOptions } from './helper'
import { useWorkflow, useWorkflowViewData } from '@/hooks'
import type { ProjectSubjectForm } from '@/api/oa/finance/projectSubject/types'
import { filterTruthyKeys } from '@/utils'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { loading, submitFormData, taskDefinitionKey, procdefName, isView } = useWorkflow<ProjectSubjectForm>()

// 引用
const Detail = ref<InstanceType<typeof detail>>()
const ApplyDetail = ref<InstanceType<typeof detail>>()
const ApplyUpsert = ref<InstanceType<typeof detail>>()
const CommonDetail = ref<InstanceType<typeof detail>>()
const OssIdDetail = ref<InstanceType<typeof detail>>()

const { psId, options } = useProjectSubjectOptions()

const overFields: PartialBooleanRecord<ProjectSubjectForm> = {
  type: true,
  name: true,
  contractNo: true,
  businessType: true,
  startDate: true,
  endDate: true,
  xmbSubjectFeeType: true,
  itemList: true,
  ossIdList: true,
}

// 申请详情字段
const applyDetailFields = filterTruthyKeys<ProjectSubjectForm>({
  ...overFields,
  ossIdList: false,
})

// 总览字段
const overviewFields = filterTruthyKeys<ProjectSubjectForm>({
  ...overFields,
  ossIdList: false,
})

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
    psId.value = entity.id

    nextTick(async () => {
      try {
        switch (type as string) {
          case 'update':
            await ApplyDetail.value?.view(entity.id)
            ApplyUpsert.value?.workflowView(entity)
            break
          case 'approval':
            await CommonDetail.value?.view(entity.id)
            OssIdDetail.value?.workflowView(entity)

            await ApplyDetail.value?.view(entity.id)
            ApplyUpsert.value?.workflowView(entity)
            break
          case 'view':
            await Detail.value?.view(entity.id)
            OssIdDetail.value?.workflowView(entity)
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
