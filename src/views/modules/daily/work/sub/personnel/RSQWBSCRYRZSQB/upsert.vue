<template>
  <van-field
    v-show-field="['ff_userId', includeFields]"
    label="员工"
    name="ff_userId"
    :rules="computedRules.ff_userId"
  >
    <template #input>
      <PreUserSelect v-model="form.ff_userId" @get-row="getPreUser" />
    </template>
  </van-field>
  <van-field
    v-show-field="['ff_deptId', includeFields]"
    label="项目部"
    name="ff_deptId"
    :rules="computedRules.ff_deptId"
  >
    <template #input>
      <DeptSelect v-model="form.ff_deptId" />
    </template>
  </van-field>

  <van-field-number
    v-model.number="form.ff_age"
    v-show-field="['ff_age', includeFields]"
    label="年龄"
    placeholder="请输入"
    name="ff_age"
    :rules="computedRules.ff_age"
  />

  <DictPicker
    v-model="form.ff_sex"
    v-show-field="['ff_sex', includeFields]"
    label="性别"
    name="ff_sex"
    dict-type="sys_user_sex"
    :multiple="false"
    :rules="computedRules.ff_sex"
    :required="true"
  />

  <DictPicker
    v-model="form.ff_nation"
    v-show-field="['ff_nation', includeFields]"
    label="民族"
    name="ff_nation"
    dict-type="ff_nation"
    :multiple="false"
    :rules="computedRules.ff_nation"
    :required="true"
  />

  <DictPicker
    v-model="form.ff_education"
    v-show-field="['ff_education', includeFields]"
    label="学历"
    name="ff_education"
    dict-type="oa_education_type"
    :multiple="false"
    :rules="computedRules.ff_education"
    :required="true"
  />

  <DictPicker
    v-model="form.ff_certificates"
    v-show-field="['ff_certificates', includeFields]"
    label="持证情况"
    name="ff_certificates"
    dict-type="oa_document_type"
    :multiple="true"
    :rules="computedRules.ff_certificates"
    :required="true"
  />

  <DatePicker
    v-model="form.ff_interviewDate"
    v-show-field="['ff_interviewDate', includeFields]"
    name="ff_interviewDate"
    label="面试日期"
    placeholder="请输入"
    :rules="computedRules.ff_interviewDate"
  />

  <van-field
    v-model.trim="form.ff_employmentMethod"
    v-show-field="['ff_employmentMethod', includeFields]"
    label="入职方式"
    placeholder="请输入"
    name="ff_employmentMethod"
    :rules="computedRules.ff_employmentMethod"
  />

  <van-field
    v-model.trim="form.ff_employmentPost"
    v-show-field="['ff_employmentPost', includeFields]"
    label="入职岗位"
    placeholder="请输入"
    name="ff_employmentPost"
    :rules="computedRules.ff_employmentPost"
  />

  <van-field
    v-model.trim="form.ff_employmentNature"
    v-show-field="['ff_employmentNature', includeFields]"
    label="入职性质"
    placeholder="请输入"
    name="ff_employmentNature"
    :rules="computedRules.ff_employmentNature"
  />

  <DatePicker
    v-model="form.ff_hopeDate"
    v-show-field="['ff_hopeDate', includeFields]"
    name="ff_hopeDate"
    label="预计到岗日期"
    :rules="computedRules.ff_hopeDate"
  />

  <van-field-number
    v-model.number="form.ff_wages"
    v-show-field="['ff_wages', includeFields]"
    label="月工资总额（元/月）"
    name="ff_wages"
    :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
    clearable
  />

  <van-field
    v-model.trim="form.ff_otherBenefits"
    v-show-field="['ff_otherBenefits', includeFields]"
    label="其他福利"
    placeholder="请输入"
    name="ff_otherBenefits"
    :rules="computedRules.ff_otherBenefits"
  />

  <van-field
    v-show-field="['ff_isProbation', includeFields]"
    name="ff_isProbation"
    label="是否有试用期"
    :rules="computedRules.ff_isProbation"
  >
    <template #input>
      <YesNoSwitch v-model="form.ff_isProbation" />
    </template>
  </van-field>

  <van-field
    v-model.trim="form.ff_probationCycle"
    v-show-field="['ff_probationCycle', includeFields]"
    name="ff_probationCycle"
    label="试用期时长(月)"
    placeholder="请输入"
    :rules="computedRules.ff_probationCycle"
  />

  <van-field
    v-show-field="['ff_performanceWages', includeFields]"
    name="ff_performanceWages"
    label="试用期薪资发放标准"
    :rules="computedRules.ff_performanceWages"
  >
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
import type { UserPreEmploymentVO } from '@/api/oa/personnel/userPreEmployment/types'
import { listUserEmployment } from '@/api/oa/personnel/userEmployment'

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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)

async function getPreUser(row: UserPreEmploymentVO) {
  form.value.ff_deptId = row.deptId
  const res = await listUserEmployment({ preEmploymentId: row.id, pageNum: undefined, pageSize: undefined })
  form.value.ff_age = row.age
  form.value.ff_sex = row.sex
  form.value.ff_nation = res.rows[0].nation
  form.value.ff_education = res.rows[0].education
  form.value.ff_hopeDate = res.rows[0].hopeDate
  form.value.ff_interviewDate = row.interviewDate
  form.value.ff_isProbation = row.isProbation
  form.value.ff_certificates = row.certificates
  form.value.ff_wages = res.rows[0].wages
  form.value.ff_performanceWages = res.rows[0].performanceWages
}
</script>
