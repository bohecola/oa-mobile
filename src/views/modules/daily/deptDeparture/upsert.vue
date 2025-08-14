<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    label-width="auto"
    label-align="top"
    input-align="left"
    required="auto"
    scroll-to-error
  >
    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="申请类型"
      name="type"
      dict-type="oa_dept_departure_type"
      :rules="computedRules.type"
      clearable
    />

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      label="部门/项目部"
      name="deptId"
      :rules="computedRules.deptId"
      clearable
    />

    <DateSelect
      v-model="form.departureDate"
      v-show-field="['departureDate', includeFields]"
      label="进场/撤场日期"
      name="departureDate"
      :rules="computedRules.departureDate"
      clearable
    />

    <van-field
      v-model="form.reason"
      v-show-field="['reason', includeFields]"
      name="reason"
      label="进场/撤场说明"
      type="textarea"
      placeholder="请输入"
      rows="1"
      :rules="computedRules.reason"
      autosize
    />

    <template v-if="form.type === '2'">
      <van-field
        v-show-field="['isAssign', includeFields]"
        label="委托他人提交资料"
        name="isAssign"
        :rules="computedRules.isAssign"
      >
        <template #input>
          <YesNoSwitch
            v-model="form.isAssign"
            @change="(value) => {
              if (value === 'N') {
                form.assignUser = undefined
              }
            }"
          />
        </template>
      </van-field>

      <van-field
        v-if="form.isAssign === 'Y'"
        v-show-field="['assignUser', includeFields]"
        label="指派人"
        name="assignUser"
        :rules="computedRules.assignUser"
        is-link
        @click="UserSelectRef?.open"
      >
        <template #input>
          <UserSelect ref="UserSelectRef" v-model="form.assignUser" />
        </template>
      </van-field>

      <van-field
        v-show-field="['ossIdList', includeFields]"
        label="附件"
        name="ossIdList"
        :rules="computedRules.ossIdList"
      >
        <template #input>
          <UploadFile
            v-model="form.ossIdList"
            value-type="array"
          />
        </template>
      </van-field>
    </template>
  </van-form>
</template>

<script setup lang="ts">
import type { FieldRule } from 'vant'
import { useForm } from './form'
import type { DeptDepartureForm } from '@/api/oa/daily/deptDeparture/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useWorkflowHelper } from '@/hooks'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DeptDepartureForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<DeptDepartureForm>
    },
    showLoading: true,
  },
)

const UserSelectRef = ref<InstanceType<typeof UserSelect>>()

const { Form, form, rules, isLoading, updateLoading, reset, view, submit, workflowSubmit, workflowView } = useForm()

const { taskDefinitionKey } = useWorkflowHelper()

const vShowField = createFieldVisibilityDirective<DeptDepartureForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<DeptDepartureForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }

  // 经理提交节点 => 委托他人时不校验提交附件
  if (taskDefinitionKey.value === 'Activity_1ljuzl8') {
    (newRules.ossIdList as Array<FieldRule>)?.forEach(e => (e.required = form.value.isAssign === 'N'))
  }

  return newRules
})

defineExpose({
  Form,
  updateLoading,
  reset,
  view,
  submit,
  workflowSubmit,
  workflowView,
})
</script>
