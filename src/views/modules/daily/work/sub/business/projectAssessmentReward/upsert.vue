<template>
  <van-field
    v-show-field="['a_contractId', includeFields]"
    label="合同名称"
    name="a_contractId"
    :rules="computedRules.a_contractId"
  >
    <template #input>
      <ContractSelect
        v-model="form.a_contractId"
        :params="{ type: 'in' }"
        @update:selected-value="onContractSelectValueChange"
      />
    </template>
  </van-field>

  <DictSelect
    v-model="form.a_businessType"
    v-show-field="['a_businessType', includeFields]"
    label="项目类别"
    name="a_businessType"
    :rules="computedRules.a_businessType"
    dict-type="oa_project_business_type"
  />

  <DeptSelect
    v-model="form.a_deptId"
    v-show-field="['a_deptId', includeFields]"
    name="a_deptId"
    label="部门"
    :rules="computedRules.a_deptId"
  />

  <van-field
    v-model.trim="form.a_contractNo"
    v-show-field="['a_contractNo', includeFields]"
    label="合同编号"
    name="a_contractNo"
    :rules="computedRules.a_contractNo"
  />

  <SCSelect
    v-model="form.a_partyA"
    v-show-field="['a_partyA', includeFields]"
    label="甲方名称"
    name="a_partyA"
    :rules="computedRules.a_partyA"
    multiple
  />

  <van-field
    v-if="!isNil(form.a_businessType) && form.a_businessType !== '0'"
    v-show-field="['customizeApprover', includeFields]"
    label="审核人"
    name="customizeApprover"
    :rules="computedRules.customizeApprover"
  >
    <template #input>
      <UserSelect
        v-model="form.customizeApprover"
        multiple
      />
    </template>
  </van-field>

  <van-field-number
    v-model.number="form.a_assessmentAmount"
    v-show-field="['a_assessmentAmount', includeFields]"
    name="a_assessmentAmount"
    label="考核金额（元）"
    placeholder="请输入"
    :rules="computedRules.a_assessmentAmount"
  />

  <van-field-number
    v-model.number="form.a_rewardAmount"
    v-show-field="['a_rewardAmount', includeFields]"
    name="a_rewardAmount"
    label="奖励金额（元）"
    placeholder="请输入"
    :rules="computedRules.a_rewardAmount"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { ContractVO } from '@/api/oa/business/contract/types'
import ContractSelect from '@/views/modules/business/components/ContractSelect/index.vue'
import SCSelect from '@/views/modules/business/components/SCSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'a_contractId',
      'a_businessType',
      'a_deptId',
      'a_contractNo',
      'a_partyA',
      'customizeApprover',
      'a_assessmentAmount',
      'a_rewardAmount',
      'reason',
      'ossIdList',
    ],
  },
)

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 表单
const form = inject<Ref<DailyWorkForm>>('form')

const Form = inject<Ref<FormInstance>>('Form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

function onContractSelectValueChange(val?: ContractVO) {
  form.value.a_deptId = val?.deptId
  form.value.a_partyA = val?.partyA
  form.value.a_contractNo = val?.no
  form.value.a_businessType = val?.businessType
  form.value.needDepts = val?.deptId as string
  // 清空审核人
  Form.value?.resetValidation(['customizeApprover'])
}
</script>
