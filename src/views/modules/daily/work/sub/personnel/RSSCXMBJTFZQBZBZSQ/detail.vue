<template>
  <DeptSelect
    v-model="form.s_deptId"
    v-show-field="['s_deptId', includeFields]"
    name="s_deptId"
    label="项目部"
  />
  <van-field
    v-model="form.s_costCategory"
    v-show-field="['s_costCategory', includeFields]"
    label="申请费用类别"
    name="s_costCategory"
  />

  <van-field
    v-model="form.s_transportationStandards"
    v-show-field="['s_transportationStandards', includeFields]"
    label="拟申请交通工具标准"
    name="s_transportationStandards"
  />

  <van-field
    v-model="form.s_transportationFeeAmount"
    v-show-field="['s_transportationFeeAmount', includeFields]" l
    label="拟申请交通费金额（元/单趟）"
    name="s_transportationFeeAmount"
  />

  <van-field
    v-model="form.s_startDate"
    v-show-field="['s_startDate', includeFields]"
    label="开始时间"
    name="s_startDate"
  />

  <van-field
    v-model="form.s_endDate"
    v-show-field="['s_endDate', includeFields]"
    label="结束时间"
    name="s_endDate"
  />

  <van-field
    v-model="form.s_subsidyStandardDetails"
    v-show-field="['s_subsidyStandardDetails', includeFields]"
    label="驻勤补助标准明细"
    name="s_subsidyStandardDetails"
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
    includeFields: () => ['s_deptId', 's_costCategory', 's_transportationStandards', 's_transportationFeeAmount', 's_subsidyStandardDetails', 's_startDate', 's_endDate', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
