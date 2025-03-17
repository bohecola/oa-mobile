<template>
  <van-field
    v-show-field="['gg_deptId', includeFields]"
    label="部门/项目部"
    name="gg_deptId"
    :rules="computedRules.gg_deptId"
  >
    <template #input>
      <DeptSelect v-model="form.gg_deptId" />
    </template>
  </van-field>

  <van-field
    v-model.trim="form.gg_recruitmentNo"
    v-show-field="['gg_recruitmentNo', includeFields]"
    label="招聘编号"
    placeholder="请输入"
    name="gg_recruitmentNo"
    :rules="computedRules.gg_recruitmentNo"
  />

  <van-field
    v-model.trim="form.gg_formType"
    v-show-field="['gg_formType', includeFields]"
    label="招聘需求申请表单类型"
    placeholder="请输入纸质申请单、线上申请单"
    name="gg_formType"
    :rules="computedRules.gg_formType"
  />

  <van-field
    v-model.trim="form.gg_contractNo"
    v-show-field="['gg_contractNo', includeFields]"
    label="合同号"
    placeholder="请输入"
    name="gg_contractNo"
    :rules="computedRules.gg_contractNo"
  />

  <DictPicker
    v-model="form.gg_changeType"
    v-show-field="['gg_changeType', includeFields]"
    label="变更类型"
    name="gg_changeType"
    dict-type="oa_daily_work_rszpxqbgsq_change_type"
    :multiple="false"
    :rules="computedRules.gg_changeType"

    @change="onTypeChange"
  />

  <DictPicker
    v-model="form.gg_changeDetails"
    v-show-field="['gg_changeDetails', includeFields]"
    label="变更明细"
    name="gg_changeDetails"
    dict-type="oa_daily_work_rszpxqbgsq_change_details"
    :multiple="true"
    :rules="computedRules.gg_changeDetails"
  />

  <van-field-number
    v-model.number="form.gg_changeBeforeRecruitNumber"
    v-show-field="['gg_changeBeforeRecruitNumber', includeFields]"
    label="变更前需求招聘人数"
    placeholder="请输入"
    type="digit"
    name="gg_changeBeforeRecruitNumber"
    :rules="computedRules.gg_changeBeforeRecruitNumber"
  />

  <van-field-number
    v-model.number="form.gg_changeAfterRecruitNumber"
    v-show-field="['gg_changeAfterRecruitNumber', includeFields]"
    label="变更后实际需求招聘人数"
    type="digit"
    placeholder="请输入"
    name="gg_changeAfterRecruitNumber"
    :rules="computedRules.gg_changeAfterRecruitNumber"
  />

  <!-- <van-field v-model="form.gg_changeBeforeSalaryRange" v-show-field="['gg_changeBeforeSalaryRange', includeFields]" label="变更前薪资范围" placeholder="请输入" name="gg_changeBeforeSalaryRange" :rules="computedRules.gg_deptId" />

    <van-field v-model="form.gg_changeAfterSalaryRange" v-show-field="['gg_changeAfterSalaryRange', includeFields]" label="变更后薪资范围" placeholder="请输入" name="gg_changeAfterSalaryRange" :rules="computedRules.gg_deptId" /> -->

  <van-field-number
    v-model.number="form.gg_fixedNumber"
    v-show-field="['gg_fixedNumber', includeFields]"
    label="现项目部定员数"
    placeholder="请输入"
    type="digit"
    name="gg_fixedNumber"
    :rules="computedRules.gg_fixedNumber"
  />

  <van-field-number
    v-model.number="form.gg_changeAfterFixedNumber"
    v-show-field="['gg_changeAfterFixedNumber', includeFields]"
    label="变更后项目部定员数"
    placeholder="请输入"
    type="digit"
    name="gg_changeAfterFixedNumber"
    :rules="computedRules.gg_changeAfterFixedNumber"
  />

  <van-field
    v-model.trim="form.gg_changeAfterNumberPost"
    v-show-field="['gg_changeAfterNumberPost', includeFields]"
    label="变更后需招聘人数及岗位"
    placeholder="请输入"
    type="digit"
    name="gg_changeAfterNumberPost"
    :rules="computedRules.gg_changeAfterNumberPost"
  />

  <DatePicker
    v-model="form.gg_effectiveDate"
    v-show-field="['gg_effectiveDate', includeFields]"
    name="gg_effectiveDate"
    label="变更生效日期"
    :rules="computedRules.gg_effectiveDate"
  />

  <van-field-number
    v-model.number="form.gg_additionalBudgetExpenses"
    v-show-field="['gg_additionalBudgetExpenses', includeFields]"
    name="gg_additionalBudgetExpenses"
    label="预算费用追加金额(元)"
    placeholder="请输入"
    :rules="computedRules.gg_additionalBudgetExpenses"
  />

  <van-field
    v-model.trim="form.gg_changeReason"
    v-show-field="['gg_changeReason', includeFields]"
    label="变更原因"
    placeholder="请输入"
    name="gg_changeAfterFixedNumber"
    :rules="computedRules.gg_deptId"
  />

  <van-field
    v-model="form.gg_content"
    v-show-field="['gg_content', includeFields]"
    label="招聘详细内容"
    placeholder="请输入"
    name="gg_content"
    :rules="computedRules.gg_content"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
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
const Form = inject<Ref<FormInstance>>('Form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 申请类型切换
function onTypeChange() {
  Form?.value?.resetValidation(['gg_changeDetails'])
}
</script>
