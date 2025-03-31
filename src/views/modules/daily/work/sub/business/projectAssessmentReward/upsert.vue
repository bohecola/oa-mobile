<template>
  <ContractSelect
    v-model="form.a_contractId"
    v-show-field="['a_contractId', includeFields]"
    label="合同名称"
    name="a_contractId"
    :rules="computedRules.a_contractId"
    :params="{ type: 'in' }"
    clearable
    @update:selected-list="onContractSelectedListChange"
  />

  <DictSelect
    v-model="form.a_businessType"
    v-show-field="['a_businessType', includeFields]"
    label="项目类别"
    name="a_businessType"
    :rules="computedRules.a_businessType"
    dict-type="oa_project_business_type"
    readonly
  />

  <DeptSelect
    v-model="form.a_deptId"
    v-show-field="['a_deptId', includeFields]"
    name="a_deptId"
    label="部门"
    :rules="computedRules.a_deptId"
    readonly
  />

  <van-field
    v-model.trim="form.a_contractNo"
    v-show-field="['a_contractNo', includeFields]"
    label="合同编号"
    name="a_contractNo"
    :rules="computedRules.a_contractNo"
    readonly
  />

  <SCSelect
    v-model="form.a_partyA"
    v-show-field="['a_partyA', includeFields]"
    label="甲方名称"
    name="a_partyA"
    :rules="computedRules.a_partyA"
    multiple
    readonly
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
import ContractSelect from '@/views/modules/business/components/ContractSelect.vue'
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

const resetFields = inject<(names: KeysOfArray<DailyWorkForm>) => void>('resetFields')

// 表单
const form = inject<Ref<DailyWorkForm>>('form')

const Form = inject<Ref<FormInstance>>('Form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

function onContractSelectedListChange(selectedList: ContractVO[]) {
  const [contract] = selectedList

  form.value.a_deptId = contract?.deptId
  form.value.a_partyA = contract?.partyA
  form.value.a_contractNo = contract?.no
  form.value.a_businessType = contract?.businessType
  form.value.needDepts = contract?.deptId as string

  // TODO 清空表单数据
  // 清空审核人
  resetFields(['customizeApprover'])
}
</script>
