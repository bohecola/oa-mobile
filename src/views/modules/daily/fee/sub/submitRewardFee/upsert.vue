<template>
  <FeeBaseUpsert :include-fields="includeFields1" />

  <van-field
    v-model="form.d_articleName"
    v-show-field="['d_articleName', includeFields]"
    label="投稿名称"
    placeholder="请输入"
    name="d_articleName"
    :rules="computedRules.d_articleName"
  />

  <van-field
    v-show-field="['d_articleDetail', includeFields]"
    type="textarea"
    rows="2"
    autozize
    label="投稿详情"
    name="d_articleDetail"
    :rules="computedRules.d_articleDetail"
  />

  <van-field-number
    v-model.number="form.d_rewardAmount"
    v-show-field="['d_rewardAmount', includeFields]"
    label="奖励金额"
    name="d_rewardAmount"
    :rules="computedRules.d_rewardAmount"
    clearable
  />

  <FeeBaseUpsert :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import FeeBaseUpsert from '../../../components/FeeBaseUpsert.vue'
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

const computedRules = inject<Ref<FormRules<DailyFeeForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyFeeForm>>('trackFields')
trackFields(props.includeFields)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
