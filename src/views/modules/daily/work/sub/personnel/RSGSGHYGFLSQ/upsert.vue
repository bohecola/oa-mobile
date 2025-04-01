<template>
  <DictSelect
    v-model="form.m_welfareCategory"
    v-show-field="['m_welfareCategory', includeFields]"
    label="福利类别"
    name="m_welfareCategory"
    dict-type="oa_daily_work_rsgsghygflsq_welfare_category"
    :rules="computedRules.m_welfareCategory"
    clearable
  />

  <van-field-number
    v-model.number="form.m_amount"
    v-show-field="['m_amount', includeFields]"
    name="m_amount"
    label="合计金额（元）"
    placeholder="请输入"
    :rules="computedRules.m_amount"
  >
    <template #extra>
      <div v-if="form.m_amount">
        <span class=" text-red-400">{{ toCnMoney(form.m_amount) }}</span>
      </div>
    </template>
  </van-field-number>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)
</script>
