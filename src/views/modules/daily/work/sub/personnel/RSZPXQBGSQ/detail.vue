<template>
  <van-field v-show-field="['gg_deptId', includeFields]" label="部门/项目部" name="gg_deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.gg_deptId" readonly />
    </template>
  </van-field>

  <van-field v-model="form.gg_recruitmentNo" v-show-field="['gg_recruitmentNo', includeFields]" label="招聘编号" name="gg_recruitmentNo" input-align="right" />

  <van-field v-model="form.gg_formType" v-show-field="['gg_formType', includeFields]" label="招聘需求申请表单类型" name="gg_formType" input-align="right" />

  <van-field v-model="form.gg_contractNo" v-show-field="['gg_contractNo', includeFields]" label="合同号" name="gg_contractNo" input-align="right" />

  <van-field v-show-field="['gg_changeType', includeFields]" name="gg_changeType" label="变更类型" input-align="right">
    <template #input>
      <DictSelect v-model="form.gg_changeType" dict-type="oa_daily_work_rszpxqbgsq_change_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['gg_changeDetails', includeFields]" name="gg_changeDetails" label="变更明细" input-align="right">
    <template #input>
      <DictSelect v-model="form.gg_changeDetails" dict-type="oa_daily_work_rszpxqbgsq_change_details" multiple readonly />
    </template>
  </van-field>

  <van-field v-model="form.gg_changeBeforeRecruitNumber" v-show-field="['gg_changeBeforeRecruitNumber', includeFields]" label="变更前需求招聘人数" name="gg_changeBeforeRecruitNumber" input-align="right" />

  <van-field v-model="form.gg_changeAfterRecruitNumber" v-show-field="['gg_changeAfterRecruitNumber', includeFields]" label="变更后实际需求招聘人数" name="gg_changeAfterRecruitNumber" input-align="right" />

  <van-field v-model="form.gg_changeBeforeSalaryRange" v-show-field="['gg_changeBeforeSalaryRange', includeFields]" label="变更前薪资范围" name="gg_changeBeforeSalaryRange" input-align="right" />

  <van-field v-model="form.gg_changeAfterSalaryRange" v-show-field="['gg_changeAfterSalaryRange', includeFields]" label="变更后薪资范围" name="gg_changeAfterSalaryRange" input-align="right" />

  <van-field v-model="form.gg_fixedNumber" v-show-field="['gg_fixedNumber', includeFields]" label="现项目部定员数" name="gg_fixedNumber" input-align="right" />

  <van-field v-model="form.gg_changeAfterFixedNumber" v-show-field="['gg_changeAfterFixedNumber', includeFields]" label="变更后实际需求招聘人数" name="gg_changeAfterFixedNumber" input-align="right" />

  <van-field v-model="form.gg_changeAfterNumberPost" v-show-field="['gg_changeAfterNumberPost', includeFields]" label="变更前薪资范围" name="gg_changeAfterNumberPost" input-align="right" />

  <van-field v-model="form.gg_effectiveDate" v-show-field="['gg_effectiveDate', includeFields]" name="gg_effectiveDate" label="变更生效日期" input-align="right">
    <template #input>
      {{ parseTime(form.gg_effectiveDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.gg_changeReason" v-show-field="['gg_changeReason', includeFields]" label="变更原因" name="gg_changeAfterFixedNumber" input-align="right" />

  <van-field v-model="form.gg_content" v-show-field="['gg_content', includeFields]" label="招聘详细内容" name="gg_content" input-align="right" />

  <van-field v-model="form.gg_additionalBudgetExpenses" v-show-field="['gg_additionalBudgetExpenses', includeFields]" name="gg_additionalBudgetExpenses" label="预算费用追加金额(元)" input-align="right">
    <template #input>
      <span>{{ form.gg_additionalBudgetExpenses }}</span>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
