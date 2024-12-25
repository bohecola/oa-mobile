<template>
  <van-field v-show-field="['ee_deptId', includeFields]" label="项目部" name="ee_deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.ee_deptId" readonly />
    </template>
  </van-field>

  <van-field v-model="form.ee_salesContractNo" v-show-field="['ee_salesContractNo', includeFields]" label="销售合同编号" name="ee_salesContractNo" input-align="right" />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['ee_deptId', 'ee_salesContractNo', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
