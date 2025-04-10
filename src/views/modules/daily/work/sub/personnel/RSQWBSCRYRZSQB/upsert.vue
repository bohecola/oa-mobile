<template>
  <UserEmploymentSelect
    v-model="form.ff_userId"
    v-show-field="['ff_userId', includeFields]"
    name="ff_userId"
    label="员工"
    :rules="computedRules.ff_userId"
    clearable
    @confirm="getPreUser"
  />

  <DeptSelect
    v-model="form.ff_deptId"
    v-model:value="form.needDepts"
    v-show-field="['ff_deptId', includeFields]"
    name="ff_deptId"
    label="项目部"
    readonly
  />

  <van-field-number
    v-model.number="form.ff_age"
    v-show-field="['ff_age', includeFields]"
    label="年龄"
    type="digit"
    placeholder="请输入"
    name="ff_age"
    :rules="computedRules.ff_age"
  />

  <DictSelect
    v-model="form.ff_sex"
    v-show-field="['ff_sex', includeFields]"
    label="性别"
    name="ff_sex"
    dict-type="sys_user_sex"
    :rules="computedRules.ff_sex"
  />

  <DictSelect
    v-model="form.ff_nation"
    v-show-field="['ff_nation', includeFields]"
    label="民族"
    name="ff_nation"
    dict-type="oa_nation"
    :rules="computedRules.ff_nation"
  />

  <DictSelect
    v-model="form.ff_education"
    v-show-field="['ff_education', includeFields]"
    label="学历"
    name="ff_education"
    dict-type="oa_education_type"
    :rules="computedRules.ff_education"
  />

  <DictSelect
    v-model="form.ff_certificates"
    v-show-field="['ff_certificates', includeFields]"
    label="持证情况"
    name="ff_certificates"
    dict-type="oa_document_type"
    multiple
    :rules="computedRules.ff_certificates"
  />

  <DateSelect
    v-model="form.ff_interviewDate"
    v-show-field="['ff_interviewDate', includeFields]"
    name="ff_interviewDate"
    label="面试日期"
    :rules="computedRules.ff_interviewDate"
  />

  <van-field
    v-model.trim="form.ff_employmentMethod"
    v-show-field="['ff_employmentMethod', includeFields]"
    label="入职方式"
    placeholder="请输入公司、项目部"
    name="ff_employmentMethod"
    :rules="computedRules.ff_employmentMethod"
  />

  <van-field
    v-model.trim="form.ff_employmentPost"
    v-show-field="['ff_employmentPost', includeFields]"
    label="入职岗位"
    placeholder="请输入风电检修班长、风电检修员、风电见习检修员、光伏电站检修班长、光伏电站检修员、光伏电站见习检修员、电工"
    name="ff_employmentPost"
    :rules="computedRules.ff_employmentPost"
  />

  <van-field
    v-model.trim="form.ff_employmentNature"
    v-show-field="['ff_employmentNature', includeFields]"
    label="入职性质"
    placeholder="请输入杰而森全外包人员"
    name="ff_employmentNature"
    :rules="computedRules.ff_employmentNature"
  />

  <DateSelect
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
  >
    <template #extra>
      <div v-if="form.ff_wages">
        <span class=" text-red-400">{{ toCnMoney(form.ff_wages) }}</span>
      </div>
    </template>
  </van-field-number>

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
    v-model="form.ff_probationWagesRate"
    v-show-field="['ff_probationWagesRate', includeFields]"
    name="ff_probationWagesRate"
    label="试用期薪资发放标准"
    :rules="computedRules.ff_probationWagesRate"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import UserEmploymentSelect from '@/views/modules/personnel/components/PreUserSelect.vue'
import type { UserPreEmploymentVO } from '@/api/oa/personnel/userPreEmployment/types'
import { listUserEmployment } from '@/api/oa/personnel/userEmployment'

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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)

// TODO: 通过预入职id获取预入职信息
async function getPreUser(value: string, selectedList: UserPreEmploymentVO[]) {
  const { rows } = await listUserEmployment({ preEmploymentId: value })
  const [preUser] = selectedList
  const [ue] = rows

  form.value.ff_deptId = preUser.deptId
  form.value.ff_age = preUser.age
  form.value.ff_sex = preUser.sex
  form.value.ff_interviewDate = preUser.interviewDate.split(' ')[0]
  form.value.ff_isProbation = preUser.isProbation
  form.value.ff_certificates = preUser.certificates

  form.value.ff_nation = ue.nation
  form.value.ff_education = ue.education
  form.value.ff_hopeDate = ue.hopeDate.split(' ')[0]
  form.value.ff_wages = ue.wages
  form.value.ff_probationWagesRate = ue.probationWagesRate
}
</script>
