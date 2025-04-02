<template>
  <DeptSelect
    v-model="form.d_deptId"
    v-model:value="form.needDepts"
    v-show-field="['d_deptId', includeFields]"
    name="d_deptId"
    label="部门/项目部"
    :rules="computedRules.d_deptId"
  />

  <DictSelect
    v-model="form.d_proveType"
    v-show-field="['d_proveType', includeFields]"
    label="证明类别"
    name="d_proveType"
    multiple
    component="checkbox"
    dict-type="oa_daily_work_rskjxgzmhrsxgzzdsq_prove_category"
    :rules="computedRules.d_proveType"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['d_deptId', 'd_proveType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
