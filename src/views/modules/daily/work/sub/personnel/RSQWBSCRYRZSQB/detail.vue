<template>
  <van-field v-show-field="['ff_userId', includeFields]" label="员工" name="ff_deptId" input-align="left">
    <template #input>
      <PreUserSelect v-model="form.ff_userId" readonly />
    </template>
  </van-field>
  <van-field v-show-field="['ff_deptId', includeFields]" label="项目部" name="ff_deptId" input-align="left">
    <template #input>
      <DeptSelect v-model="form.ff_deptId" readonly />
    </template>
  </van-field>

  <van-field v-model="form.ff_age" v-show-field="['ff_age', includeFields]" label="年龄" name="ff_age" input-align="left" />

  <van-field v-show-field="['ff_sex', includeFields]" label="性别" name="ff_sex" input-align="left">
    <template #input>
      <DictSelect v-model="form.ff_sex" dict-type="sys_user_sex" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['ff_nation', includeFields]" label="民族" name="ff_nation" input-align="left">
    <template #input>
      <DictSelect v-model="form.ff_nation" dict-type="oa_nation" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['ff_education', includeFields]" label="学历" name="ff_education" input-align="left">
    <template #input>
      <DictSelect v-model="form.ff_education" dict-type="oa_education_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['ff_certificates', includeFields]" name="ff_certificates" label="持证情况" input-align="left">
    <template #input>
      <DictSelect v-model="form.ff_certificates" dict-type="oa_document_type" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['ff_interviewDate', includeFields]" name="ff_interviewDate" label="面试日期" input-align="left">
    <template #input>
      {{ parseTime(form.ff_interviewDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.ff_employmentMethod" v-show-field="['ff_employmentMethod', includeFields]" label="入职方式" name="ff_employmentMethod" input-align="left" />

  <van-field v-model="form.ff_employmentPost" v-show-field="['ff_employmentPost', includeFields]" label="入职岗位" name="ff_employmentPost" input-align="left" />

  <van-field v-model="form.ff_employmentNature" v-show-field="['ff_employmentNature', includeFields]" label="入职性质" name="ff_employmentNature" input-align="left" />

  <van-field v-model="form.ff_hopeDate" v-show-field="['ff_hopeDate', includeFields]" name="ff_hopeDate" label="预计到岗日期" input-align="left">
    <template #input>
      {{ parseTime(form.ff_hopeDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.ff_wages" v-show-field="['ff_wages', includeFields]" name="ff_wages" label="月工资总额（元/月）" input-align="left">
    <template #input>
      <span>{{ form.ff_wages }}</span>
      <span v-if="!isNil(form.ff_wages)" class="ml-3 text-red-400">{{ toCnMoney(form.ff_wages) }}</span>
    </template>
  </van-field>

  <van-field v-model="form.ff_otherBenefits" v-show-field="['ff_otherBenefits', includeFields]" label="其他福利" name="ff_otherBenefits" input-align="left" />

  <van-field v-show-field="['ff_isProbation', includeFields]" name="ff_isProbation" label="是否有试用期" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.ff_isProbation" readonly />
    </template>
  </van-field>

  <van-field v-model="form.ff_probationCycle" v-show-field="['ff_probationCycle', includeFields]" name="ff_probationCycle" label="试用期时长(月)" input-align="left" />

  <van-field v-show-field="['ff_performanceWages', includeFields]" name="ff_performanceWages" label="试用期薪资发放标准" input-align="left">
    <template #input>
      <span>{{ form.ff_performanceWages }}%</span>
    </template>
  </van-field>
  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import PreUserSelect from '@/views/modules/personnel/userEmployment/workflow/components/PreUserSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['ff_deptId', 'ff_userId', 'ff_age', 'ff_sex', 'ff_nation', 'ff_education', 'ff_certificates', 'ff_interviewDate', 'ff_employmentMethod', 'ff_employmentPost', 'ff_employmentNature', 'ff_hopeDate', 'ff_wages', 'ff_otherBenefits', 'ff_isProbation', 'ff_probationCycle', 'ff_performanceWages', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
