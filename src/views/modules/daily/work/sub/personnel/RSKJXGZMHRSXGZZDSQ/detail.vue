<template>
  <van-field v-show-field="['d_deptId', includeFields]" label="部门/项目部" name="d_deptId">
    <template #input>
      <DeptSelect v-model="form.d_deptId" clearable readonly />
    </template>
  </van-field>

  <DictSelect
    v-model="form.d_proveType"
    v-show-field="['d_proveType', includeFields]"
    label="证明类别"
    name="d_proveType"
    multiple
    component="checkbox"
    dict-type="oa_daily_work_rskjxgzmhrsxgzzdsq_prove_category"
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
    includeFields: () => ['d_deptId', 'd_proveType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
