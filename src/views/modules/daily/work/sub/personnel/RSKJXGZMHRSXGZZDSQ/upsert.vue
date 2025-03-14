<template>
  <van-field v-show-field="['d_deptId', includeFields]" label="部门/项目部" name="d_deptId" :rules="computedRules.d_deptId">
    <template #input>
      <DeptSelect v-model="form.d_deptId" clearable />
    </template>
  </van-field>

  <van-field v-show-field="['d_proveType', includeFields]" label="证明类别" name="d_proveType" :rules="computedRules.d_proveType">
    <template #input>
      <dict-select v-model="form.d_proveType" component="checkbox" dict-type="oa_daily_work_rskjxgzmhrsxgzzdsq_prove_category" multiple />
    </template>
  </van-field>

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
