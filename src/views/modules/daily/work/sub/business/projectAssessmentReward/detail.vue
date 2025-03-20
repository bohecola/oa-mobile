<template>
  <van-field
    v-show-field="['a_contractId', includeFields]"
    label="合同名称"
    name="a_contractId"
  >
    <template #input>
      <ContractSelect
        v-model="form.a_contractId"
        :params="{ type: 'in' }"
        readonly
      />
    </template>
  </van-field>

  <DictSelect
    v-model="form.a_businessType"
    v-show-field="['a_businessType', includeFields]"
    label="项目类别"
    name="a_businessType"
    dict-type="oa_project_business_type"
  />

  <DeptSelect
    v-model="form.a_deptId"
    v-show-field="['a_deptId', includeFields]"
    name="a_deptId"
    label="部门"
  />

  <van-field
    v-show-field="['a_contractNo', includeFields]"
    label="合同编号"
    name="a_contractNo"
  >
    <template #input>
      {{ form.a_contractNo }}
    </template>
  </van-field>

  <van-field
    v-show-field="['a_partyA', includeFields]"
    label="甲方名称"
    name="a_partyA"
  >
    <template #input>
      <SCSelect
        v-model="form.a_partyA"
        multiple
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-if="!isNil(form.a_businessType) && form.a_businessType !== '0'"
    v-show-field="['customizeApprover', includeFields]"
    label="审核人"
    name="customizeApprover"
  >
    <template #input>
      <UserSelect
        v-model="form.customizeApprover"
        multiple
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['a_assessmentAmount', includeFields]"
    label="考核金额（元）"
    name="a_assessmentAmount"
  >
    <template #input>
      <span>{{ form.a_assessmentAmount }}</span>
      <span
        v-if="!isNil(form.a_assessmentAmount)"
        class="ml-3 text-red-400"
      >{{ toCnMoney(form.a_assessmentAmount) }}</span>
    </template>
  </van-field>

  <van-field
    v-show-field="['a_rewardAmount', includeFields]"
    label="奖励金额（元）"
    name="a_rewardAmount"
  >
    <template #input>
      <span>{{ form.a_rewardAmount }}</span>
      <span
        v-if="!isNil(form.a_rewardAmount)"
        class="ml-3 text-red-400"
      >{{ toCnMoney(form.a_rewardAmount) }}</span>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import ContractSelect from '@/views/modules/business/components/ContractSelect/index.vue'
import SCSelect from '@/views/modules/business/components/SCSelect.vue'

withDefaults(
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

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
