<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['n_userId', includeFields]" :span="24">
        <el-form-item prop="n_userId" label="申请人">
          <UserSelectPro v-model="form.n_userId" :multiple="false"  />
        </el-form-item>
      </el-col>
    </el-row> -->

  <DateSelect
    v-model="form.n_mounth"
    v-show-field="['n_mounth', includeFields]"
    name="n_mounth"
    label="申请月份"
    :columns-type="['year', 'month']"
    component="date-picker"
    :rules="computedRules.n_mounth"
  />

  <DictSelect
    v-model="form.n_giftGoldCategory"
    v-show-field="['n_giftGoldCategory', includeFields]"
    label="礼（慰问）金类别"
    name="n_giftGoldCategory"
    dict-type="oa_daily_work_rsygwwjsq_gift_gold_category"
    multiple
    component="checkbox"
    :rules="computedRules.n_giftGoldCategory"
  />

  <van-field-number
    v-model.number="form.n_amount"
    v-show-field="['n_amount', includeFields]"
    label="本月礼（慰问）金合计"
    name="n_amount"
    :rules="computedRules.n_amount"
    clearable
  />

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
    includeFields: () => ['n_userId', 'n_mounth', 'n_giftGoldCategory', 'n_amount', 'reason', 'ossIdList'],
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
