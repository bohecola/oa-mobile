<template>
  <DictPicker
    v-model="form.fileType"
    v-show-field="['fileType', includeFields]"
    label="资料类型"
    name="fileType"
    dict-type="oa_file_type"
    :multiple="true"
    :rules="computedRules.fileType"
    :required="true"
  />

  <DictPicker
    v-model="form.fileUseType"
    v-show-field="['fileUseType', includeFields]"
    label="使用方式"
    name="fileUseType"
    dict-type="oa_file_use_type"
    :rules="computedRules.fileUseType"
    :required="true"
  />

  <van-field
    v-show-field="['isSeal', includeFields]"
    label="是否加盖公章"
    name="isSeal"
    input-align="left"
    :rules="computedRules.isSeal"
  >
    <template #input>
      <YesNoSwitch v-model="form.isSeal" />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'

import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['fileType', 'fileUseType', 'isSeal', 'reason', 'ossIdList'],
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
