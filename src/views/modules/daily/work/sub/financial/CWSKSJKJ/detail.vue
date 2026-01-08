<template>
  <van-field
    v-model.trim="form.vv_customerName"
    v-show-field="['vv_customerName', includeFields]"
    label="客户名称"
    name="vv_customerName"
  />

  <DateSelect
    v-model="form.vv_issueDate"
    v-show-field="['vv_issueDate', includeFields]"
    name="vv_issueDate"
    label="开具日期"
  />

  <van-field
    v-show-field="['vv_issueAmount', includeFields]"
    label="开具金额"
    name="vv_issueAmount"
  >
    <template #input>
      <div class="flex flex-col">
        <span>{{ formatCurrency(form.vv_issueAmount) }}</span>
        <span class="text-red-400">{{ toCnMoney(form.vv_issueAmount) }}</span>
      </div>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['vv_customerName', 'vv_issueDate', 'vv_issueAmount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
