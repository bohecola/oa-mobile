<template>
  <WorkflowPage
    :loading="loading"
    :entity-variables="submitFormData.variables?.entity"
    @approval="handleApproval"
  >
    <detail v-if="isView" ref="Detail" :include-fields="overviewFields" :show-loading="false" />

    <template v-else>
      <!-- 发起流程 第一步节点 -->
      <div v-if="taskDefinitionKey === 'Activity_1npxmwc'">
        <!-- <upsert ref="Upsert" :include-fields="applyFields" :show-loading="false" /> -->
      </div>
      <!-- 工作交接 详情--交接内容--可编辑的附件列表 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0qv4t1b'">
        <detail ref="Detail3" :include-fields="handoverDetailFields" :show-loading="false" />
        <detail ref="Upsert3" :include-fields="['departDate', 'handoverContent']" :show-loading="false" />
        <detail ref="Detail4" :include-fields="['reason']" :show-loading="false" />
        <detail ref="Upsert4" :include-fields="['ossIdList']" :show-loading="false" />
      </div>

      <!-- 人力扣款节点 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0jjf8i3'">
        <detail ref="HRDeductionDetail1" :include-fields="HRDeductionDetail1Fields1" :show-loading="false" />
        <detail ref="HRDeductionUpsert" :include-fields="['userType']" :show-loading="false" />
        <detail ref="HRDeductionDetail2" :include-fields="HRDeductionDetail1Fields2" :show-loading="false" />
      </div>

      <!-- 归档节点 详情--归档内容--可编辑的附件列表 -->
      <div v-else-if="taskDefinitionKey === 'Activity_0zx1e0l'">
        <detail ref="Detail2" :include-fields="documentDetailFields" :show-loading="false" />
        <detail ref="Upsert2" :include-fields="['documentContent', 'ossIdList']" :show-loading="false" />
      </div>
      <!-- 其他审批通用节点 -->
      <div v-else>
        <detail ref="DetailOther" :include-fields="commonFields" :show-loading="false" />
      </div>
    </template>
  </WorkflowPage>
</template>

<script setup lang="ts">
// import upsert from '../upsert.vue'
import { isNil } from 'lodash-es'
import detail from '../detail.vue'
import type { UserDepartForm } from '@/api/oa/personnel/userDepart/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { startWorkFlow } from '@/api/workflow/task'
import { filterTruthyKeys } from '@/utils'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from '@/components/WorkflowPage/types'
import { useWorkflowViewData } from '@/hooks'

type Entity = UserDepartForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const loading = ref(false)
// 流程节点 Key
const taskDefinitionKey = ref(proxy.$route.query.nodeId as string ?? '')

// 引用
const Upsert = ref<InstanceType<typeof detail> | null>()
// 归档节点
const Upsert2 = ref<InstanceType<typeof detail> | null>()
const Detail2 = ref<InstanceType<typeof detail> | null>()
// 详情
const Detail = ref<InstanceType<typeof detail> | null>()
const DetailOther = ref<InstanceType<typeof detail> | null>()
// 工作交接
const Upsert3 = ref<InstanceType<typeof detail> | null>()
const Detail3 = ref<InstanceType<typeof detail> | null>()
const Upsert4 = ref<InstanceType<typeof detail> | null>()
const Detail4 = ref<InstanceType<typeof detail> | null>()

// 人力扣款
const HRDeductionUpsert = ref<InstanceType<typeof detail> | null>()
const HRDeductionDetail1 = ref<InstanceType<typeof detail> | null>()
const HRDeductionDetail2 = ref<InstanceType<typeof detail> | null>()

// 所有字段
const allFields: PartialBooleanRecord<UserDepartForm> = {
  id: true,
  userId: true,
  deptId: true,
  deptType: true,
  postId: true,
  userType: true,
  entryCompanyDate: true,
  departPreDate: true,
  specialCommercialInsurance: true,
  isLoginCompanyEmail: true,
  departDate: true,
  reason: true,
  handoverPerson: true,
  handoverContent: true,
  documentContent: true,
  ossIdList: true,
}

// 总览字段
const overviewFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
  }),
)

// 申请字段
const applyFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    departDate: false,
    userType: false,
    handoverContent: false,
    documentContent: false,
  }),
)

// 工作交接详情
const handoverDetailFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    departDate: false,
    handoverContent: false,
    reason: false,
    ossIdList: false,
  }),
)

// 人力扣款详情1
const HRDeductionDetail1Fields1 = ref(
  filterTruthyKeys<UserDepartForm>({
    userId: true,
    deptId: true,
    postId: true,
  }),
)

// 人力扣款详情2
const HRDeductionDetail1Fields2 = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    userType: false,
    userId: false,
    deptId: false,
    postId: false,
    documentContent: false,
  }),
)

// 归档的节点详情
const documentDetailFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    documentContent: false,
    ossIdList: false,
  }),
)

const commonFields = ref(
  filterTruthyKeys<UserDepartForm>({
    ...allFields,
    documentContent: false,
  }),
)

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// 是否查看
const isView = computed(() => proxy.$route.query.type === 'view')

provide('taskDefinitionKey', taskDefinitionKey)

// // 开始流程
// async function handleStartWorkflow(entity: Entity, next?: (result: any) => void) {
//   // 业务提交
//   await Upsert.value?.submit({
//     success: async (id) => {
//       // 表名
//       submitFormData.value.tableName = 'oa_user_depart'
//       // 业务主键
//       submitFormData.value.businessKey = id
//       // 流程变量
//       submitFormData.value.variables = {
//         entity: {
//           ...entity,
//           id,
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

//     await handleStartWorkflow(entity, (res) => {
//       proxy?.$modal.msgSuccess('暂存成功')
//       proxy.$tab.closePage(proxy.$route)
//       proxy.$router.go(-1)
//     }).finally(done)
//   }
// }

// // 提交
// async function handleSubmit({ load, done, open, initiator }: SubmitPayload) {
//   const { valid, data } = await Upsert.value?.workflowSubmit()

//   if (valid) {
//     load()
//     const entity = { ...data, initiator }

//     await handleStartWorkflow(entity, res => open(res.data?.taskId)).finally(done)
//   }
// }

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  // 打开审批弹窗
  const { taskId } = proxy.$route.query
  // let res: any
  // if (taskDefinitionKey.value === 'Activity_1npxmwc') {
  //   // 发起流程 第一步节点
  //   res = await Upsert.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value === 'Activity_0qv4t1b') {
  //   // 工作交接
  //   res = await Upsert3.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value === 'Activity_0zx1e0l') {
  //   // 归档
  //   res = await Upsert2.value?.workflowSubmit()
  // }
  // else if (taskDefinitionKey.value === 'Activity_0jjf8i3') {
  //   // 人力扣款
  //   res = await HRDeductionUpsert.value?.workflowSubmit()
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

    // 提示在PC 端审批
    const shouldUserTypeEdit = isNil(entity.userType) && taskDefinitionKey.value === 'Activity_0jjf8i3'

    proxy?.$router.replace({
      query: {
        ...proxy?.$route.query,
        taskDefinitionKey: taskDefinitionKey.value,
        isEditNode: ['Activity_0qv4t1b', 'Activity_0zx1e0l'].includes(taskDefinitionKey.value) || shouldUserTypeEdit ? 'true' : 'false',
      },
    })

    nextTick(() => {
      try {
        switch (type) {
          case 'update':
          case 'approval':
            Upsert.value?.workflowView(entity)
            // 归档节点
            Detail2.value?.workflowView(entity)
            Upsert2.value?.workflowView(entity)
            // 工作交接节点
            Detail3.value?.workflowView(entity)
            Upsert3.value?.workflowView(entity)
            Detail4.value?.workflowView(entity)
            Upsert4.value?.workflowView(entity)
            // 人力扣款
            HRDeductionDetail1.value?.workflowView(entity)
            HRDeductionUpsert.value?.workflowView(entity)
            HRDeductionDetail2.value?.workflowView(entity)
            // 其他节点
            DetailOther.value?.workflowView(entity)
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
