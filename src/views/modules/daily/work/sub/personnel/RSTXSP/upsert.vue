<template>
  <van-field v-show-field="['bb_userId', includeFields]" name="bb_userId" label="调薪人员" input-align="left">
    <template #input>
      <UserSelect v-model="form.bb_userId" />
    </template>
  </van-field>

  <van-field v-show-field="['customizeApprover', includeFields]" name="customizeApprover" label="审核人" input-align="left">
    <template #input>
      <UserSelect v-model="form.customizeApprover" />
    </template>
  </van-field>

  <DatePicker v-model="form.bb_effectiveDate" v-show-field="['bb_effectiveDate', includeFields]" name="bb_effectiveDate" label="调薪生效日期" />

  <van-field-number
    v-model.number="form.bb_changeSalaryAfter"
    v-show-field="['bb_changeSalaryAfter', includeFields]"
    label="调薪后基本工资"
    name="bb_changeSalaryAfter"
    :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
    clearable
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

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

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
