<template>
  <DeptSelect
    v-model="form.s_deptId"
    v-show-field="['s_deptId', includeFields]"
    name="s_deptId"
    label="项目部"
    :rules="computedRules.s_deptId"
  />

  <van-field
    v-model.trim="form.s_costCategory"
    v-show-field="['s_costCategory', includeFields]"
    label="申请费用类别"
    placeholder="请输入交通费、驻勤补助"
    name="s_costCategory"
    :rules="computedRules.s_costCategory"
  />

  <van-field
    v-model.trim="form.s_transportationStandards"
    v-show-field="['s_transportationStandards', includeFields]"
    label="拟申请交通工具标准"
    placeholder="请输入"
    name="s_transportationStandards"
    :rules="computedRules.s_transportationStandards"
  />

  <van-field
    v-model.trim="form.s_transportationFeeAmount"
    v-show-field="['s_transportationFeeAmount', includeFields]"
    label="拟申请交通费金额（元/单趟）"
    placeholder="请输入"
    name="s_transportationFeeAmount"
    :rules="computedRules.s_transportationFeeAmount"
  />

  <van-field
    v-model.trim="form.s_subsidyStandardDetails"
    v-show-field="['s_subsidyStandardDetails', includeFields]"
    label="驻勤补助标准明细"
    placeholder="请输入岗位、驻勤补助标准明细（元/天/人）"
    name="s_subsidyStandardDetails"
    :rules="computedRules.s_subsidyStandardDetails"
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
    includeFields: () => ['s_deptId', 's_costCategory', 's_transportationStandards', 's_transportationFeeAmount', 's_subsidyStandardDetails', 'reason', 'ossIdList'],
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
