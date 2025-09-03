<template>
  <ContractSelect
    v-model="form.uu_contractId"
    v-show-field="['uu_contractId', includeFields]"
    label="合同名称"
    name="uu_contractId"
    :params="{ type: 'in' }"
  />

  <DeptSelect
    v-model="form.uu_deptId"
    v-show-field="['uu_deptId', includeFields]"
    name="uu_deptId"
    label="部门"
  />

  <template v-if="!isNil(form.uu_contractId)">
    <van-field
      v-show-field="['uu_contractNo', includeFields]"
      label="合同编号"
      name="uu_contractNo"
    >
      <template #input>
        {{ form.uu_contractNo }}
      </template>
    </van-field>

    <SCSelect
      v-model="form.uu_partyA"
      v-show-field="['uu_partyA', includeFields]"
      label="甲方名称"
      name="uu_partyA"
      multiple
    />
  </template>

  <van-field
    v-show-field="['uu_assessmentReport', includeFields]"
    label="考核通报"
    name="uu_assessmentReport"
  >
    <template #input>
      <UploadFile v-model="form.uu_assessmentReport" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import ContractSelect from '@/views/modules/business/components/ContractSelect.vue'
import SCSelect from '@/views/modules/business/components/SCSelect.vue'

withDefaults(
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

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
