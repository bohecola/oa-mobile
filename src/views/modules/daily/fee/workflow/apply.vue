<template>
  <WorkflowPage
    :loading="isLoading"
    :entity-variables="submitFormData.variables?.entity"
    :group="false"
    @approval="handleApproval"
  >
    <van-form id="DailyWorkFormContainer" ref="Form" label-width="98">
      <van-cell-group inset class="!my-3">
        <van-field
          prop="dailyWorkType"
          label="日常费用类型"
          input-align="right"
          @click="handleDailyTypeClick"
        >
          <template #input>
            <DailyTypeSelect
              ref="DailyTypeSelectRef"
              v-model="form.feeType"
              v-model:no="form.no"
              v-model:rootNo="form.rootNo"
              v-model:wf-remark="form.wfRemark"
              type="1"
              @before-finish="onDailyTypeBeforeFinish"
            />
          </template>
        </van-field>

        <component :is="SubComponent[form.rootNo]" :key="form.no" />
      </van-cell-group>
    </van-form>
  </WorkflowPage>
</template>

<script setup lang="ts">
import type { FieldRule } from 'vant'
import { useForm } from '../form'
import SubComponent from '../sub'
import DailyTypeSelect from '../../components/DailyTypeSelect.vue'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { useWorkflowViewData } from '@/hooks'

type Entity = DailyFeeForm & { initiator: Initiator }

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 引用
const DailyTypeSelectRef = ref<InstanceType<typeof DailyTypeSelect> | null>()

// 表单
const { Form, form, rules, isLoading, reset, workflowView } = useForm()

// 日常类型根节点编码
const rootNo = ref('')

// 流程节点 Key
const taskDefinitionKey = ref(proxy?.$route.query.nodeId ?? '')
// 是否查看
const isView = computed(() => proxy?.$route.query.type === 'view')
// 日常事务类型选择器只读
const dailyTypeSelectReadOnly = computed(() => !['add', 'update'].includes(proxy.$route.query.type as string))

function getBaseFields() {
  return dailyTypeSelectReadOnly.value ? [] : (['feeType'] as KeysOfArray<DailyFeeForm>)
}

// 跟踪字段
const trackedFields = ref<KeysOfArray<DailyFeeForm>>(getBaseFields())

// 类型选择点击
function handleDailyTypeClick() {
  if (dailyTypeSelectReadOnly.value) {
    return false
  }
  DailyTypeSelectRef.value?.open()
}

// 类型选择完成
function onDailyTypeBeforeFinish() {
  reset()
  trackedFields.value = getBaseFields()
}

// 更新规则
function updateRuleRequired(field: string, required: boolean) {
  (rules.value[field] as Array<FieldRule>).forEach((e) => {
    e.required = required
  })
}

// 依赖收集
function trackFields(fields: KeysOfArray<DailyFeeForm>) {
  trackedFields.value = fields.reduce<KeysOfArray<DailyFeeForm>>((prev, curr) => {
    if (!prev.includes(curr)) {
      prev.push(curr)
    }

    return prev
  }, trackedFields.value)
}

// // 规则
// const computedRules = computed(() => {
//   const newRules = {};
//   for (const [key, value] of Object.entries(rules.value)) {
//     if (trackedFields.value.includes(key as any)) {
//       newRules[key] = value;
//     }
//   }

//   return newRules;
// });

provide('form', form)
provide('isView', isView)
provide('taskDefinitionKey', taskDefinitionKey)
provide('trackFields', trackFields)
provide('updateRuleRequired', updateRuleRequired)

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
})

// 审批
async function handleApproval({ open }: ApprovalPayload) {
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

// 挂载
onMounted(async () => {
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}

  isLoading.value = true

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
