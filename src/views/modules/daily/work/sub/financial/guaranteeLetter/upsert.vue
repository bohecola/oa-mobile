<template>
  <DictPicker
    v-model="form.contractCategory"
    v-show-field="['contractCategory', includeFields]"
    label="销售合同类别"
    name="contractCategory"
    dict-type="oa_contract_category_in"
    :rules="computedRules.contractCategory"
  />

  <van-field
    v-model="form.jj_type"
    v-show-field="['jj_type', includeFields]"
    label="业务类型"
    type="textarea"
    rows="1"
    autosize
    placeholder="请输入履约保函、投标保函、预付款保函、工程维修保函、质量保函、付款保函"
    name="jj_type"
    :rules="computedRules.jj_type"
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
    includeFields: () => ['contractCategory', 'jj_type', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
