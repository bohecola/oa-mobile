<template>
  <DeptSelect
    v-model="form.s_deptId"
    v-model:value="form.needDepts"
    v-show-field="['s_deptId', includeFields]"
    name="s_deptId"
    label="项目部"
    :rules="computedRules.s_deptId"
  />

  <van-field
    v-model.trim="form.s_costCategory"
    v-show-field="['s_costCategory', includeFields]"
    label="补助类别"
    placeholder="请输入"
    name="s_costCategory"
    :rules="computedRules.s_costCategory"
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
    includeFields: () => ['s_deptId', 's_costCategory', 's_transportationStandards', 's_transportationFeeAmount', 's_subsidyStandardDetails', 's_startDate', 's_endDate', 'reason', 'ossIdList'],
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
