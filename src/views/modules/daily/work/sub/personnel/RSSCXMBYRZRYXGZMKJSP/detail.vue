<template>
  <DeptSelect
    v-model="form.e_deptId"
    v-show-field="['e_deptId', includeFields]"
    name="e_deptId"
    label="部门/项目部"
  />

  <van-field-number
    v-model.number="form.e_userCounts"
    v-show-field="['e_deptId', includeFields]"
    name="e_deptId"
    label="证明开具人数"
  />

  <DictSelect
    v-model="form.e_proveType"
    v-show-field="['e_proveType', includeFields]"
    label="证明类型"
    name="e_proveType"
    multiple
    dict-type="oa_daily_work_rsscxmbyrzryxgzmkjsp_prove_type"
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
