<template>
  <van-field v-show-field="['e_deptId', includeFields]" name="e_deptId" label="部门/项目部" :rules="computedRules.e_deptId">
    <template #input>
      <DeptSelect v-model="form.e_deptId" />
    </template>
  </van-field>

  <van-field-number
    v-model.number="form.e_userCounts"
    v-show-field="['e_userCounts', includeFields]"
    name="e_userCounts"
    label="证明开具人数"
    :rules="computedRules.e_userCounts"
  />

  <DictPicker
    v-model="form.e_proveType"
    v-show-field="['e_proveType', includeFields]"
    label="证明类型"
    name="q_type"
    dict-type="oa_daily_work_rsscxmbyrzryxgzmkjsp_prove_type"
    :multiple="true"
    :rules="computedRules.e_proveType"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['e_deptId', 'e_userCounts', 'e_proveType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)
</script>
