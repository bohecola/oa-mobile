<template>
  <DeptSelect
    v-model="form.d_deptId"
    v-show-field="['d_deptId', includeFields]"
    name="d_deptId"
    label="部门/项目部"
  />

  <DictSelect
    v-model="form.d_proveType"
    v-show-field="['d_proveType', includeFields]"
    label="证明类别"
    name="d_proveType"
    multiple
    component="checkbox"
    dict-type="oa_daily_work_rskjxgzmhrsxgzzdsq_prove_category"
  />

  <DictSelect
    v-model="form.d_personnelCategory"
    v-show-field="['d_personnelCategory', includeFields]"
    label="人员类别"
    name="d_personnelCategory"
    dict-type="oa_user_type"
    multiple
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['d_deptId', 'd_proveType', 'd_personnelCategory', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
