<template>
  <van-field v-show-field="['bb_userId', includeFields]" name="bb_userId" label="调薪人员" :rules="computedRules.bb_userId">
    <template #input>
      <UserSelect v-model="form.bb_userId" @update:selected-value="onUserSelectValueChange" />
    </template>
  </van-field>

  <van-field
    v-show-field="['customizeApprover', includeFields]"
    name="customizeApprover"
    label="审核人"
    :rules="computedRules.customizeApprover"
  >
    <template #input>
      <UserSelect v-model="form.customizeApprover" />
    </template>
  </van-field>

  <DatePicker
    v-model="form.bb_effectiveDate"
    v-show-field="['bb_effectiveDate', includeFields]"
    name="bb_effectiveDate"
    label="调薪生效日期"
    :rules="computedRules.bb_effectiveDate"
  />

  <van-field-number
    v-model.number="form.bb_changeSalaryAfter"
    v-show-field="['bb_changeSalaryAfter', includeFields]"
    label="调薪后基本工资"
    name="bb_changeSalaryAfter"
    :rules="computedRules.bb_changeSalaryAfter"
    clearable
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserVO } from '@/api/system/user/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['customizeApprover', 'bb_userId', 'bb_effectiveDate', 'bb_changeSalaryAfter', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

function onUserSelectValueChange(val?: UserVO) {
  form.value.needDepts = val?.deptId as string
  form.value.maxPostLevel = val?.maxPostLevel
}
</script>
