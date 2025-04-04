<template>
  <WorkflowPage :loading="isLoading" :entity-variables="submitFormData.variables?.entity" :group="false" @approval="handleApproval">
    <van-form
      ref="Form"
      :class="dailyTypeSelectReadOnly ? 'reset-label' : ''"
      label-width="auto"
      label-align="top"
    >
      <van-cell-group inset class="!my-3">
        <van-field
          name="dailyWorkType"
          label="日常事务类型"
          input-align="left"
          @click="handleDailyTypeClick"
        >
          <template #input>
            <DailyTypeSelect
              ref="DailyTypeSelectRef"
              v-model="form.dailyWorkType"
              v-model:no="form.no"
              v-model:wf-remark="form.wfRemark"
              v-model:is-default-page="isDefaultPage"
              @before-finish="onDailyTypeBeforeFinish"
              @update:no="onNoChange"
            />
          </template>
        </van-field>
        <van-field
          v-if="form.dailyWorkType"
          prop="companyId"
          label="公司"
          input-align="left"
        >
          <template #input>
            <ComanySelect v-model="form.companyId" readonly />
          </template>
        </van-field>

        <template v-if="!isNil(form.no)">
          <component :is="isDefaultPage === 'Y' ? SubComponent.DefaultWork : SubComponent[form.no]" :key="form.no" />
        </template>
      </van-cell-group>
    </van-form>
  </WorkflowPage>
</template>

<script setup name="DailyWorkApply" lang="ts">
import type { FieldRule } from 'vant'
import { isNil } from 'lodash-es'
import { useForm } from '../form'
import SubComponent from '../sub'
import DailyTypeSelect from '../../components/DailyTypeSelect.vue'
import ComanySelect from '../../../personnel/components/ComanySelect.vue'
import type { ApprovalPayload, Initiator } from '@/components/WorkflowPage/types'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { useWorkflowViewData } from '@/hooks'
import { useStore } from '@/store'
import { getDept } from '@/api/system/dept'

type Entity = DailyWorkForm & { initiator: Initiator }

const { user } = useStore()
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 引用
const DailyTypeSelectRef = ref<InstanceType<typeof DailyTypeSelect> | null>()
// 表单
const { Form, form, rules, isLoading, reset, workflowView } = useForm()

// 流程表单
const submitFormData = ref<StartProcessBo<Entity>>({
  businessKey: '',
  tableName: '',
  variables: {},
  processInstanceName: '',
})
// 流程节点 Key
const taskDefinitionKey = ref(proxy.$route.query.nodeId as string)
// 是否是默认页面
const isDefaultPage = ref(undefined)

// 是否查看
const isView = computed(() => proxy.$route.query.type === 'view')
// 日常事务类型选择器只读
const dailyTypeSelectReadOnly = computed(() => !['add', 'update'].includes(proxy.$route.query.type as string))

// 跟踪字段
const trackedFields = ref<KeysOfArray<DailyWorkForm>>(getBaseFields())
// // 动态规则
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

function getBaseFields() {
  return dailyTypeSelectReadOnly.value ? [] : (['dailyWorkType', 'companyId'] as KeysOfArray<DailyWorkForm>)
}

// 类型选择点击
async function handleDailyTypeClick() {
  if (dailyTypeSelectReadOnly.value) {
    return false
  }
  DailyTypeSelectRef.value?.open()
  // 根据当前登录用户的部门deptid获取公司id
  const { data } = await getDept(user.info.deptId)
  form.value.companyId = data.parentId
}

// 类型选择完成
function onDailyTypeBeforeFinish() {
  reset()
  trackedFields.value = getBaseFields()
}

// 事务编码变更
function onNoChange(value?: string) {
  // 部门人事主管权限更换审批 || 项目部其他费用申请 => 资料类型默认值 0
  if (['RSXMBRSZGQXGHSP', 'RSXMBQTFYSQ'].includes(value) && proxy.$route.query.type === 'add') {
    form.value.fileType = '0'
  }
}

// 更新规则
function updateRuleRequired(field: string, required: boolean) {
  (rules.value[field] as Array<FieldRule>).forEach((e) => {
    e.required = required
  })
}

// 依赖收集
function trackFields(fields: KeysOfArray<DailyWorkForm>) {
  trackedFields.value = fields.reduce<KeysOfArray<DailyWorkForm>>((prev, curr) => {
    if (!prev.includes(curr)) {
      prev.push(curr)
    }

    return prev
  }, trackedFields.value)
}

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

const isEditNode = computed(() => {
  const key = taskDefinitionKey.value as string
  if (key === 'Activity_1p4ss2n' && user.info.userId === form.value.customizeApprover) {
    return 'true'
  }
  else if (['Activity_171tryh'].includes(key) && form.value.no === 'RSXMBPYQWBRYSQ') {
    return 'true'
  }
  else if (['Activity_171tryh'].includes(key) && form.value.no === 'RSZPXQBGSQ') {
    return 'true'
  }
  else if (['Activity_0y4z19l'].includes(key) && form.value.no === 'RSYGKQZSBTSQ') {
    return 'true'
  }
  else {
    return 'false'
  }
})

// 自定义审核人展示在PC端编辑提示
watch([isEditNode, taskDefinitionKey], () => {
  proxy?.$router.replace({
    query: {
      ...proxy?.$route.query,
      taskDefinitionKey: taskDefinitionKey.value,
      isEditNode: isEditNode.value,
    },
  })
}, {
  immediate: true,
})

// 挂载
onMounted(async () => {
  const { type, taskId, processInstanceId } = proxy?.$route.query ?? {}

  if (taskId || processInstanceId) {
    isLoading.value = true
    const res = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity, task } = res.data
    submitFormData.value.variables.entity = entity
    taskDefinitionKey.value = task.taskDefinitionKey

    nextTick(() => {
      switch (type as string) {
        case 'update':
        case 'approval':
        case 'view': {
          workflowView(entity)
        }
      }
      isLoading.value = false
    })
  }
})
</script>
