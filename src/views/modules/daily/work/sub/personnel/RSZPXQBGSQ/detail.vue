<template>
  <DeptSelect
    v-model="form.gg_deptId"
    v-show-field="['gg_deptId', includeFields]"
    name="gg_deptId"
    label="部门/项目部"
  />

  <van-field
    v-model="form.gg_recruitmentNo"
    v-show-field="['gg_recruitmentNo', includeFields]"
    label="招聘编号"
    name="gg_recruitmentNo"
  />

  <van-field
    v-model="form.gg_formType"
    v-show-field="['gg_formType', includeFields]"
    label="招聘需求申请表单类型"
    name="gg_formType"
  />

  <van-field
    v-model="form.gg_contractNo"
    v-show-field="['gg_contractNo', includeFields]"
    label="合同号"
    name="gg_contractNo"
  />

  <DictSelect
    v-model="form.gg_changeType"
    v-show-field="['gg_changeType', includeFields]"
    label="变更类型"
    name="gg_changeType"
    dict-type="oa_daily_work_rszpxqbgsq_change_type"
  />

  <DictSelect
    v-model="form.gg_changeDetails"
    v-show-field="['gg_changeDetails', includeFields]"
    label="变更明细"
    name="gg_changeDetails"
    dict-type="oa_daily_work_rszpxqbgsq_change_details"
    multiple
  />

  <van-field
    v-model="form.gg_changeBeforeRecruitNumber"
    v-show-field="['gg_changeBeforeRecruitNumber', includeFields]"
    label="变更前需求招聘人数"
    name="gg_changeBeforeRecruitNumber"
  />

  <van-field
    v-model="form.gg_changeAfterRecruitNumber"
    v-show-field="['gg_changeAfterRecruitNumber', includeFields]"
    label="变更后实际需求招聘人数"
    name="gg_changeAfterRecruitNumber"
  />

  <!-- <van-field v-model="form.gg_changeBeforeSalaryRange" v-show-field="['gg_changeBeforeSalaryRange', includeFields]" label="变更前薪资范围" name="gg_changeBeforeSalaryRange"  />

  <van-field v-model="form.gg_changeAfterSalaryRange" v-show-field="['gg_changeAfterSalaryRange', includeFields]" label="变更后薪资范围" name="gg_changeAfterSalaryRange"  /> -->

  <van-field
    v-model="form.gg_fixedNumber"
    v-show-field="['gg_fixedNumber', includeFields]"
    label="现项目部定员数"
    name="gg_fixedNumber"
  />

  <van-field
    v-model="form.gg_changeAfterFixedNumber"
    v-show-field="['gg_changeAfterFixedNumber', includeFields]"
    label="变更后项目部定员数"
    name="gg_changeAfterFixedNumber"
  />

  <van-field
    v-model="form.gg_changeAfterNumberPost"
    v-show-field="['gg_changeAfterNumberPost', includeFields]"
    label="变更后需招聘人数及岗位"
    name="gg_changeAfterNumberPost"
  />

  <DateSelect
    v-model="form.gg_effectiveDate"
    v-show-field="['gg_effectiveDate', includeFields]"
    name="gg_effectiveDate"
    label="变更生效日期"
  />

  <van-field
    v-model="form.gg_additionalBudgetExpenses"
    v-show-field="['gg_additionalBudgetExpenses', includeFields]"
    name="gg_additionalBudgetExpenses"
    label="预算费用追加金额(元)"
  />

  <van-field
    v-model="form.gg_changeReason"
    v-show-field="['gg_changeReason', includeFields]"
    label="变更原因"
    name="gg_changeReason"
  />

  <van-field
    v-model="form.gg_content"
    v-show-field="['gg_content', includeFields]"
    label="招聘详细内容"
    name="gg_content"
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
    includeFields: () => ['gg_deptId', 'gg_changeType', 'gg_changeDetails', 'gg_additionalBudgetExpenses', 'gg_recruitmentNo', 'gg_formType', 'gg_contractNo', 'gg_changeBeforeRecruitNumber', 'gg_changeAfterRecruitNumber', 'gg_changeBeforeSalaryRange', 'gg_changeAfterSalaryRange', 'gg_fixedNumber', 'gg_changeAfterFixedNumber', 'gg_changeAfterNumberPost', 'gg_changeReason', 'gg_effectiveDate', 'gg_content', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
