<template>
  <van-field v-show-field="['k_deptId', includeFields]" name="k_deptId" label="项目部" input-align="right">
    <template #input>
      <DeptSelect v-model="form.k_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['k_userType', includeFields]" name="k_userType" label="人员类别" input-align="right">
    <template #input>
      {{ form.k_userType }}
    </template>
  </van-field>

  <van-field v-model="form.k_nature" v-show-field="['k_nature', includeFields]" label="聘用人员性质" name="k_nature" input-align="right" />

  <van-field v-model="form.k_category" v-show-field="['k_category', includeFields]" label="聘用类别" name="k_category" input-align="right" />

  <van-field v-model="form.k_postId" v-show-field="['k_postId', includeFields]" label="人员岗位" name="k_postId" input-align="right" />

  <van-field v-model="form.k_number" v-show-field="['k_number', includeFields]" label="人员数量" name="k_number" input-align="right" />

  <van-field v-show-field="['k_isUniform', includeFields]" name="k_isUniform" label="是否配备公司工作服" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.k_isUniform" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['k_isUseOriginalSalaryStandard', includeFields]" name="k_isUseOriginalSalaryStandard" label="是否延用原工资标准" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.k_isUseOriginalSalaryStandard" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['k_originalSalaryStandard', includeFields]" label="原工资标准（人/元/月）" name="k_originalSalaryStandard" input-align="right">
    <template #input>
      {{ form.k_originalSalaryStandard }}
      <span v-if="!isNil(form.k_originalSalaryStandard)" class="ml-3 text-red-400">{{ toCnMoney(form.k_originalSalaryStandard) }}</span>
    </template>
  </van-field>

  <van-field v-show-field="['k_newSalaryStandard', includeFields]" label="新工资标准（人/元/月）" name="k_newSalaryStandard" input-align="right">
    <template #input>
      {{ form.k_newSalaryStandard }}
      <span v-if="!isNil(form.k_newSalaryStandard)" class="ml-3 text-red-400">{{ toCnMoney(form.k_newSalaryStandard) }}</span>
    </template>
  </van-field>

  <van-field v-show-field="['k_effectiveDate', includeFields]" label="生效日期" name="k_effectiveDate" input-align="right">
    <template #input>
      {{ parseTime(form.k_effectiveDate, '{y}-{m}') }}
    </template>
  </van-field>

  <van-field v-model="form.k_monthlyWorkingMode" v-show-field="['k_monthlyWorkingMode', includeFields]" label="月度上班及休假模式" name="k_monthlyWorkingMode" input-align="right" />

  <van-field v-show-field="['k_salaryStandards', includeFields]" label="工资标准（人/元/月）" name="k_salaryStandards" input-align="right">
    <template #input>
      {{ form.k_salaryStandards }}
      <span v-if="!isNil(form.k_salaryStandards)" class="ml-3 text-red-400">{{ toCnMoney(form.k_salaryStandards) }}</span>
    </template>
  </van-field>

  <van-field v-show-field="['k_specialInstructions', includeFields]" label="工资发放特殊说明" name="k_specialInstructions" input-align="right">
    <template #input>
      <TextareaView :value="form.k_specialInstructions" />
    </template>
  </van-field>

  <van-field v-show-field="['k_otherDistribution', includeFields]" label="其他补助、发放标准及发放形式" name="k_otherDistribution" input-align="right">
    <template #input>
      <TextareaView :value="form.k_otherDistribution" />
    </template>
  </van-field>

  <van-field v-show-field="['k_originalDistribution', includeFields]" label="原补助、发放标准及发放形式" name="k_originalDistribution" input-align="right">
    <template #input>
      <TextareaView :value="form.k_originalDistribution" />
    </template>
  </van-field>

  <van-field v-show-field="['k_changeAfterDistribution', includeFields]" label="变更后补助、发放标准及发放形式" name="k_changeAfterDistribution" input-align="right">
    <template #input>
      <TextareaView :value="form.k_changeAfterDistribution" />
    </template>
  </van-field>

  <van-field v-show-field="['k_changeReason', includeFields]" label="变更聘用原因" name="k_changeReason" input-align="right">
    <template #input>
      <TextareaView :value="form.k_changeReason" />
    </template>
  </van-field>

  <van-field v-show-field="['k_startDate', includeFields]" label="聘用开始日期" name="k_startDate" input-align="right">
    <template #input>
      {{ parseTime(form.k_startDate, '{y}-{m}') }}
    </template>
  </van-field>

  <van-field v-show-field="['k_endDate', includeFields]" label="聘用结束日期" name="k_endDate" input-align="right">
    <template #input>
      {{ parseTime(form.k_endDate, '{y}-{m}') }}
    </template>
  </van-field>

  <van-field v-model="form.k_signeContractType" v-show-field="['k_signeContractType', includeFields]" label="聘用人员签订合同类型" name="k_signeContractType" input-align="right" />

  <van-field v-model="form.k_purchaseInsuranceType" v-show-field="['k_purchaseInsuranceType', includeFields]" label="聘用人员购买保险类型" name="k_purchaseInsuranceType" input-align="right" />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import PostSelect from '@/views/modules/personnel/components/PostSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['k_deptId', 'k_userType', 'k_isKeyAccountsVP', 'k_nature', 'k_category', 'k_postId', 'k_number', 'k_isUniform', 'k_isUseOriginalSalaryStandard', 'k_originalSalaryStandard', 'k_newSalaryStandard', 'k_effectiveDate', 'k_monthlyWorkingMode', 'k_salaryStandards', 'k_specialInstructions', 'k_otherDistribution', 'k_originalDistribution', 'k_changeAfterDistribution', 'k_changeReason', 'k_startDate', 'k_endDate', 'k_signeContractType', 'k_purchaseInsuranceType', 'reason', 'ossIdList'],
  },
)

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
