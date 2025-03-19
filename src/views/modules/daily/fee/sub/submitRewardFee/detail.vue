<template>
  <FeeBaseDetail :include-fields="includeFields1" />

  <van-field
    v-model="form.d_articleName"
    v-show-field="['d_articleName', includeFields]"
    label="投稿名称"
    name="d_articleName"
  />

  <van-field
    v-show-field="['d_articleDetail', includeFields]"
    label="投稿详情"
    name="d_articleDetail"
  >
    <template #input>
      <TextareaView :value="form.d_articleDetail" />
    </template>
  </van-field>

  <van-field
    v-show-field="['d_rewardAmount', includeFields]"
    label="奖励金额"
    name="d_rewardAmount"
  >
    <template #input>
      <span class="mr-3">{{ formatCurrency(form.d_rewardAmount) }}</span>
    </template>
  </van-field>

  <FeeBaseDetail :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'd_articleName', 'd_articleDetail', 'd_rewardAmount', 'reason', 'receiptInfo', 'ossIdList'],
  },
)
const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
