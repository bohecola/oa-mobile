<template>
  <van-field v-show-field="['customizeApprover', includeFields]" label="审核人" name="customizeApprover" input-align="right">
    <template #input>
      <UserSelect v-model="form.customizeApprover" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['dd_month', includeFields]" label="发薪月" name="dd_month" input-align="right">
    <template #input>
      {{ parseTime(form.dd_month, '{y}-{m}') }}
    </template>
  </van-field>

  <van-field v-show-field="['dd_totalAmount', includeFields]" label="总金额（元）" name="dd_totalAmount" input-align="right">
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
