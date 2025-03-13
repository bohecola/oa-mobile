<template>
  <van-field
    v-show-field="['customizeApprover', includeFields]"
    label="审核人"
    name="customizeApprover"
  >
    <template #input>
      <UserSelect v-model="form.customizeApprover" multiple readonly />
    </template>
  </van-field>

  <DatePicker
    v-model="form.dd_month"
    v-show-field="['dd_month', includeFields]"
    name="dd_month"
    label="发薪月"
    :columns-type="['year', 'month']" readonly
  />

  <van-field v-show-field="['dd_totalAmount', includeFields]" label="总金额（元）" name="dd_totalAmount">
    <template #input>
      {{ form.dd_totalAmount }}
      <span v-if="!isNil(form.dd_totalAmount)" class="ml-3 text-red-400">{{ toCnMoney(form.dd_totalAmount) }}</span>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['dd_month', 'dd_totalAmount', 'customizeApprover', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
