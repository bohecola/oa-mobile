<template>
  <DictPicker
    v-model="form.fileUseType"
    v-show-field="['fileUseType', includeFields]"
    label="使用方式"
    name="fileUseType"
    dict-type="oa_file_use_type"
    :multiple="false"
    :rules="computedRules.fileUseType"
  />

  <DictPicker
    v-model="form.sealFileCategory"
    v-show-field="['sealFileCategory', includeFields]"
    label="文件类别"
    name="sealFileCategory"
    dict-type="oa_seal_file_category"
    :multiple="false"
    :rules="computedRules.sealFileCategory"
  />

  <DictPicker
    v-model="form.sealUseType"
    v-show-field="['sealUseType', includeFields]"
    label="用印类型"
    name="sealUseType"
    dict-type="oa_seal_use_type"
    :multiple="true"
    :rules="computedRules.sealUseType"
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
    includeFields: () => ['fileUseType', 'sealFileCategory', 'sealUseType', 'reason', 'ossIdList'],
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
