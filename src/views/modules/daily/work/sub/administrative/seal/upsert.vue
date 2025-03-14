<template>
  <DictPicker
    v-model="form.sealType"
    v-show-field="['sealType', includeFields]"
    label="申请类型"
    name="sealType"
    dict-type="oa_seal_type"
    :multiple="false"
    :rules="computedRules.sealType"
  />

  <van-field
    v-show-field="['isReturnSeal', includeFields]"
    label="是否交回原印"
    name="isReturnSeal"
    :rules="computedRules.isReturnSeal"
  >
    <template #input>
      <YesNoSwitch v-model="form.isReturnSeal" />
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'

import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['sealType', 'isReturnSeal', 'reason', 'ossIdList'],
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
