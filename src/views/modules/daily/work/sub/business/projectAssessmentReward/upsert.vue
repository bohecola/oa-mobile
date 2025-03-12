<template>
  <van-field v-show-field="['a_contractId', includeFields]" label="合同名称" name="a_contractId" input-align="left">
    <template #input>
      <ContractSelect v-model="form.a_contractId" :params="{ type: 'in' }" />
    </template>
  </van-field>

  <DictPicker
    v-model="form.a_businessType"
    v-show-field="['a_businessType', includeFields]"
    label="项目类别"
    name="a_businessType"
    input-align="left"
    dict-type="oa_project_business_type"
  />

  <van-field v-show-field="['a_deptId', includeFields]" label="部门" name="a_deptId" input-align="left">
    <template #input>
      <DeptSelect v-model="form.a_deptId" />
    </template>
  </van-field>

  <van-field v-model="form.a_contractNo" v-show-field="['a_contractNo', includeFields]" label="合同编号" name="a_contractNo" input-align="left" />

  <van-field v-show-field="['a_partyA', includeFields]" label="甲方名称" name="a_partyA" input-align="left">
    <template #input>
      <SCSelect v-model="form.a_partyA" multiple />
    </template>
  </van-field>

  <van-field v-if="!isNil(form.a_businessType) && form.a_businessType !== '0'" v-show-field="['customizeApprover', includeFields]" label="审核人" name="customizeApprover" input-align="left">
    <template #input>
      <UserSelect v-model="form.customizeApprover" multiple />
    </template>
  </van-field>

  <van-field-number
    v-model.number="form.a_assessmentAmount"
    v-show-field="['a_assessmentAmount', includeFields]"
    name="a_assessmentAmount"
    label="考核金额（元）"
    placeholder="请输入"
  />

  <van-field-number
    v-model.number="form.a_rewardAmount"
    v-show-field="['a_rewardAmount', includeFields]"
    name="a_rewardAmount"
    label="奖励金额（元）"
    placeholder="请输入"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
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

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
