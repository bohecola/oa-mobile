<template>
  <van-field v-show-field="['ee_deptId', includeFields]" label="项目部" name="ee_deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.ee_deptId" readonly />
    </template>
  </van-field>

  <van-field v-model="form.ee_salesContractNo" v-show-field="['ee_salesContractNo', includeFields]" label="销售合同编号" name="ee_salesContractNo" input-align="right" />

  <van-field v-model="form.ee_category" v-show-field="['ee_category', includeFields]" label="申请类别" name="ee_category" input-align="right" />

  <van-field v-model="form.ee_subsidyAmountStandard" v-show-field="['ee_subsidyAmountStandard', includeFields]" label="申请补助金额标准" name="ee_subsidyAmountStandard" input-align="right" />

  <van-field v-model="form.ee_recipientsNumber" v-show-field="['ee_recipientsNumber', includeFields]" label="发放人数" name="ee_recipientsNumber" input-align="right" />

  <van-field v-model="form.ee_subsidyTotalAmountMonth" v-show-field="['ee_subsidyTotalAmountMonth', includeFields]" label="申请补助总金额(元/月)" name="ee_subsidyTotalAmountMonth" input-align="right" />

  <van-field v-model="form.ee_subsidyTotalAmountDay" v-show-field="['ee_subsidyTotalAmountDay', includeFields]" label="申请补助总金额(元/天)" name="ee_subsidyTotalAmountDay" input-align="right" />

  <van-field v-model="form.ee_distributionCycle" v-show-field="['ee_distributionCycle', includeFields]" label="发放周期" name="ee_distributionCycle" input-align="right" />

  <van-field v-if="form.ee_distributionCycle === '连续发放'" v-show-field="['ee_startDate', includeFields]" label="执行开始日期" name="ee_startingDate" input-align="right">
    <template #input>
      {{ parseTime(form.ee_startDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>
  <van-field v-if="form.ee_distributionCycle === '连续发放'" v-show-field="['ee_endDate', includeFields]" label="执行结束日期" name="ee_startingDate" input-align="right">
    <template #input>
      {{ parseTime(form.ee_endDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.ee_distributionMethod" v-show-field="['ee_distributionMethod', includeFields]" label="发放方式" name="ee_distributionMethod" input-align="right" />

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
</script>
