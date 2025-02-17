<template>
  <van-field v-model="form.d_articleName" v-show-field="['d_articleName', includeFields]" label="投稿名称" name="d_articleName" input-align="right" />

  <van-field v-show-field="['d_articleDetail', includeFields]" label="投稿详情" name="d_articleDetail" input-align="right">
    <template #input>
      <TextareaView :value="form.d_articleDetail" />
    </template>
  </van-field>

  <van-field v-show-field="['d_rewardAmount', includeFields]" label="奖励金额" name="d_rewardAmount" input-align="right">
    <template #input>
      <span class="mr-3">{{ formatCurrency(form.d_rewardAmount) }}</span>
    </template>
  </van-field>

  <FeeBaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'd_articleName', 'd_articleDetail', 'd_rewardAmount', 'reason', 'receiptInfo', 'ossIdList'],
  },
)
const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()
</script>
