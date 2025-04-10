<template>
  <UserEmploymentSelect
    v-model="form.ff_userId"
    v-show-field="['ff_userId', includeFields]"
    name="ff_userId"
    label="员工"
  />

  <DeptSelect
    v-model="form.ff_deptId"
    v-show-field="['ff_deptId', includeFields]"
    name="ff_deptId"
    label="项目部"
  />

  <van-field
    v-model="form.ff_age"
    v-show-field="['ff_age', includeFields]"
    label="年龄"
    name="ff_age"
  />

  <DictSelect
    v-model="form.ff_sex"
    v-show-field="['ff_sex', includeFields]"
    label="性别"
    name="ff_sex"
    dict-type="sys_user_sex"
  />

  <DictSelect
    v-model="form.ff_nation"
    v-show-field="['ff_nation', includeFields]"
    label="民族"
    name="ff_nation"
    dict-type="ff_nation"
  />

  <DictSelect
    v-model="form.ff_education"
    v-show-field="['ff_education', includeFields]"
    label="学历"
    name="ff_education"
    dict-type="oa_education_type"
  />

  <DictSelect
    v-model="form.ff_certificates"
    v-show-field="['ff_certificates', includeFields]"
    label="持证情况"
    name="ff_certificates"
    dict-type="oa_document_type"
    multiple
  />

  <DateSelect
    v-model="form.ff_interviewDate"
    v-show-field="['ff_interviewDate', includeFields]"
    name="ff_interviewDate"
    label="面试日期"
  />

  <van-field
    v-model="form.ff_employmentMethod"
    v-show-field="['ff_employmentMethod', includeFields]"
    label="入职方式"
    name="ff_employmentMethod"
  />

  <van-field
    v-model="form.ff_employmentPost"
    v-show-field="['ff_employmentPost', includeFields]"
    label="入职岗位"
    name="ff_employmentPost"
  />

  <van-field
    v-model="form.ff_employmentNature"
    v-show-field="['ff_employmentNature', includeFields]"
    label="入职性质"
    name="ff_employmentNature"
  />

  <DateSelect
    v-model="form.ff_hopeDate"
    v-show-field="['ff_hopeDate', includeFields]"
    name="ff_hopeDate"
    label="预计到岗日期"
  />

  <van-field
    v-model="form.ff_wages"
    v-show-field="['ff_wages', includeFields]"
    name="ff_wages"
    label="月工资总额（元/月）"
  >
    <template #input>
      <span>{{ form.ff_wages }}</span>
      <span
        v-if="!isNil(form.ff_wages)"
        class="ml-3 text-red-400"
      >{{ toCnMoney(form.ff_wages) }}</span>
    </template>
  </van-field>

  <van-field
    v-model="form.ff_otherBenefits"
    v-show-field="['ff_otherBenefits', includeFields]"
    label="其他福利"
    name="ff_otherBenefits"
  />

  <van-field
    v-show-field="['ff_isProbation', includeFields]"
    name="ff_isProbation"
    label="是否有试用期"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.ff_isProbation"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-model="form.ff_probationCycle"
    v-show-field="['ff_probationCycle', includeFields]"
    name="ff_probationCycle"
    label="试用期时长(月)"
  />

  <van-field
    v-show-field="['ff_probationWagesRate', includeFields]"
    name="ff_probationWagesRate"
    label="试用期薪资发放标准"
  >
    <template #input>
      <span>{{ form.ff_probationWagesRate }}%</span>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import UserEmploymentSelect from '@/views/modules/personnel/components/PreUserSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['ff_deptId', 'ff_userId', 'ff_age', 'ff_sex', 'ff_nation', 'ff_education', 'ff_certificates', 'ff_interviewDate', 'ff_employmentMethod', 'ff_employmentPost', 'ff_employmentNature', 'ff_hopeDate', 'ff_wages', 'ff_otherBenefits', 'ff_isProbation', 'ff_probationCycle', 'ff_probationWagesRate', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
