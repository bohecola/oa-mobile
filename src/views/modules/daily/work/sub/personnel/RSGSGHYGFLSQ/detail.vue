<template>
  <van-field v-show-field="['m_welfareCategory', includeFields]" label="福利类别" name="m_welfareCategory" input-align="right">
    <template #input>
      <dict-select v-model="form.m_welfareCategory" dict-type="oa_daily_work_rsgsghygflsq_welfare_category" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['m_amount', includeFields]" label="合计金额（元）" name="m_amount" input-align="right">
    <template #input>
      {{ form.m_amount }}
      <span v-if="!isNil(form.m_amount)" class="ml-3 text-red-400">{{ toCnMoney(form.m_amount) }}</span>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['m_welfareCategory', 'm_amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
