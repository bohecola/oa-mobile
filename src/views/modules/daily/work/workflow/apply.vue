<template>
  <WorkflowPage :loading="isLoading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <van-form id="DailyWorkFormContainer" ref="Form" :model="form" label-width="140px" :validate-on-rule-change="false">
      <van-cell-group inset class="!my-3">
        <van-field prop="dailyWorkType" :label="`日常事务类型${dailyWorkTypeSelectReadOnly ? '：' : ''}`" input-align="right">
          <template #input>
            <span>{{ dailyWorkTypeName }}</span>
          </template>
          <!-- <DailyWorkTypeSelect
            v-model="form.dailyWorkType"
            v-model:daily-work-no="form.no"
            v-model:wf-remark="form.wfRemark"
            :readonly="dailyWorkTypeSelectReadOnly"
            :disabled="dailyWorkTypeSelectReadOnly"
            @before-change="onDailyWorkTypeBeforeChange"
          /> -->
        </van-field>

        <component :is="SubComponent[form.no]" :key="form.no" />
      </van-cell-group>
    </van-form>
  </WorkflowPage>
</template>

<script setup name="DailyWorkApply" lang="ts">
import { useForm } from '../form'
import SubComponent from '../sub'
// import DailyWorkTypeSelect from '../components/DailyWorkTypeSelect.vue'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { useWorkflowViewData } from '@/hooks'
import { getDailyWorkType } from '@/api/oa/daily/category'

  type Entity = DailyWorkForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 表单
const { Form, form, isLoading, reset, workflowView } = useForm()

// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')
// 是否查看
const isView = computed(() => proxy?.$route.query.type === 'view')
// 日常事务类型选择器只读
const dailyWorkTypeSelectReadOnly = computed(() => !['add', 'update'].includes(proxy?.$route.query.type as string))

// 跟踪字段
const trackedFields = ref<KeysOfArray<DailyWorkForm>>([])

function onDailyWorkTypeBeforeChange() {
  reset()
  trackedFields.value = []
}

// 依赖收集
function trackFields(fields: KeysOfArray<DailyWorkForm>) {
  trackedFields.value = fields.reduce<KeysOfArray<DailyWorkForm>>((prev, curr) => {
    if (!prev.includes(curr)) {
      prev.push(curr)
    }

    return prev
  }, trackedFields.value)
  console.log(trackedFields.value, 222)
}

// 规则
// const computedRules = computed(() => {
//   const newRules = {}
//   for (const [key, value] of Object.entries(rules.value)) {
//     if (trackedFields.value.includes(key as any)) {
//       newRules[key] = value
//     }
//   }
//   return newRules
// })

provide('form', form)
provide('isView', isView)
provide('taskDefinitionKey', taskDefinitionKey)
provide('trackFields', trackFields)

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// 审批
async function handleApproval({ open }: ApprovalPayload) {
  // 申请组件审批、判断写在组件里面
  const { taskId } = proxy?.$route.query ?? {}

  // const res = await workflowSubmit()

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
const dailyWorkTypeName = ref('')
async function getDailyWorkName(id: string) {
  const res = await getDailyWorkType(id)
  dailyWorkTypeName.value = res.data.name
}

// 挂载
onMounted(async () => {
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}

  isLoading.value = true

  if (taskId || processInstanceId) {
    const res = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task } = res.data
    getDailyWorkName(entity.dailyWorkType)
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
      case 'approval':
      case 'view': {
        await workflowView({ taskId, processInstanceId })
      }
    }

    isLoading.value = false
  })
})
</script>
