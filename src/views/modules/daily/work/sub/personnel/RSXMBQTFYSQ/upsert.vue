<template>
  <van-field v-show-field="['ee_deptId', includeFields]" label="项目部" name="ee_deptId" :rules="computedRules.ee_deptId">
    <template #input>
      <DeptSelect v-model="form.ee_deptId" />
    </template>
  </van-field>

  <van-field
    v-model.trim="form.ee_salesContractNo"
    v-show-field="['ee_salesContractNo', includeFields]"
    label="销售合同编号"
    placeholder="请输入"
    name="ee_salesContractNo"
    :rules="computedRules.ee_salesContractNo"
  />

  <van-field
    v-model.trim="form.ee_category"
    v-show-field="['ee_category', includeFields]"
    label="申请类别"
    placeholder="请输入业主相关费用"
    name="ee_category"
    :rules="computedRules.ee_category"
  />

  <van-field
    v-model.trim="form.ee_subsidyAmountStandard"
    v-show-field="['ee_subsidyAmountStandard', includeFields]"
    label="申请补助金额标准"
    placeholder="请输入申请补助金额标准:元/人/天或元/人/月"
    name="ee_subsidyAmountStandard"
    :rules="computedRules.ee_subsidyAmountStandard"
  />

  <van-field
    v-model.trim="form.ee_recipientsNumber"
    v-show-field="['ee_recipientsNumber', includeFields]"
    label="发放人数" placeholder="请输入"
    name="ee_recipientsNumber"
    :rules="computedRules.ee_recipientsNumber"
  />

  <van-field
    v-model.trim="form.ee_subsidyTotalAmountMonth"
    v-show-field="['ee_subsidyTotalAmountMonth', includeFields]"
    label="申请补助总金额(元/月)"
    placeholder="请输入"
    name="ee_subsidyTotalAmountMonth"
    :rules="computedRules.ee_subsidyTotalAmountMonth"
  />

  <van-field
    v-model.trim="form.ee_subsidyTotalAmountDay"
    v-show-field="['ee_subsidyTotalAmountDay', includeFields]"
    label="申请补助总金额(元/天)"
    placeholder="请输入"
    name="ee_subsidyTotalAmountDay"
    :rules="computedRules.ee_subsidyTotalAmountDay"
  />

  <van-field
    v-model.trim="form.ee_distributionCycle"
    v-show-field="['ee_distributionCycle', includeFields]"
    label="发放周期"
    placeholder="请输入一次性发放、连续发放（如果是连续发放，需选择执行结束日期、执行结束日期说明）"
    name="ee_distributionCycle"
    :rules="computedRules.ee_distributionCycle"
  />

  <DatePicker
    v-if="form.ee_distributionCycle === '连续发放'"
    v-model="form.ee_startDate"
    v-show-field="['ee_startDate', includeFields]"
    name="ee_startDate"
    label="执行开始日期"
    :rules="computedRules.ee_startDate"
  />

  <DatePicker
    v-if="form.ee_distributionCycle === '连续发放'"
    v-model="form.ee_endDate"
    v-show-field="['ee_endDate', includeFields]"
    name="ee_endDate"
    label="执行结束日期"
    :rules="computedRules.ee_endDate"
  />

  <van-field
    v-model.trim="form.ee_distributionMethod"
    v-show-field="['ee_distributionMethod', includeFields]"
    label="发放方式"
    placeholder="请输入随月度工资发放/随发票报销/其他(详细说明)"
    name="ee_distributionMethod"
    :rules="computedRules.ee_distributionMethod"
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
    includeFields: () => ['ee_deptId', 'ee_salesContractNo', 'ee_category', 'ee_subsidyAmountStandard', 'ee_recipientsNumber', 'ee_subsidyTotalAmountMonth', 'ee_subsidyTotalAmountDay', 'ee_startDate', 'ee_endDate', 'ee_distributionCycle', 'ee_distributionMethod', 'reason', 'ossIdList'],
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
