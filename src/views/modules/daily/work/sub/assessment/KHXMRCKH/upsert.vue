<template>
  <ContractSelect
    v-model="form.uu_contractId"
    v-show-field="['uu_contractId', includeFields]"
    label="合同名称"
    name="uu_contractId"
    :rules="computedRules.uu_contractId"
    :params="{ type: 'in' }"
    clearable
    @update:selected-list="onContractSelectedListChange"
  />

  <DeptSelect
    v-model="form.uu_deptId"
    v-show-field="['uu_deptId', includeFields]"
    name="uu_deptId"
    label="部门"
    :rules="computedRules.uu_deptId"
    :readonly="!isNil(form.uu_contractId)"
  />

  <template v-if="!isNil(form.uu_contractId)">
    <van-field
      v-model.trim="form.uu_contractNo"
      v-show-field="['uu_contractNo', includeFields]"
      label="合同编号"
      name="uu_contractNo"
      :rules="computedRules.uu_contractNo"
      readonly
    />

    <SCSelect
      v-model="form.uu_partyA"
      v-show-field="['uu_partyA', includeFields]"
      label="甲方名称"
      name="uu_partyA"
      :rules="computedRules.uu_partyA"
      multiple
      readonly
    />
  </template>

  <van-field
    v-show-field="['uu_assessmentReport', includeFields]"
    name="uu_assessmentReport"
    label="考核通报"
    :rules="computedRules.uu_assessmentReport"
  >
    <template #input>
      <UploadFile v-model="form.uu_assessmentReport" />
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { ContractVO } from '@/api/oa/business/contract/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import ContractSelect from '@/views/modules/business/components/ContractSelect.vue'
import SCSelect from '@/views/modules/business/components/SCSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'uu_contractId',
      'uu_deptId',
      'uu_contractNo',
      'uu_partyA',
      'uu_assessmentReport',
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

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

function onContractSelectedListChange(selectedList: ContractVO[]) {
  const [contract] = selectedList

  form.value.uu_deptId = contract?.deptId
  form.value.uu_partyA = contract?.partyA
  form.value.uu_contractNo = contract?.no
  form.value.needDepts = contract?.deptId as string
}
</script>
