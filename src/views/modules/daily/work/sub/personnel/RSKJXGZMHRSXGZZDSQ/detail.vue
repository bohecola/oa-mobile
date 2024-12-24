<template>
  <van-field v-show-field="['d_deptId', includeFields]" label="部门/项目部" name="d_deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.d_deptId" clearable readonly />
    </template>
  </van-field>

  <van-field v-show-field="['d_proveType', includeFields]" label="证明类别" name="d_proveType" input-align="right">
    <template #input>
      <dict-select v-model="form.d_proveType" component="checkbox" dict-type="oa_daily_work_rskjxgzmhrsxgzzdsq_prove_category" multiple readonly />
    </template>
  </van-field>

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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
