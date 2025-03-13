<template>
  <DictPicker
    v-model="form.fileUseType"
    v-show-field="['fileUseType', includeFields]"
    label="使用方式"
    name="fileUseType"
    dict-type="oa_file_use_type"
    placeholder="请选择"
    :multiple="false"
    :readonly="true"
  />

  <DictPicker
    v-model="form.sealFileCategory"
    v-show-field="['sealFileCategory', includeFields]"
    label="文件类别"
    name="sealFileCategory"
    dict-type="oa_seal_file_category"
    :multiple="false"
    :readonly="true"
  />

  <DictPicker
    v-model="form.sealUseType"
    v-show-field="['sealUseType', includeFields]"
    label="用印类型"
    name="sealUseType"
    dict-type="oa_seal_use_type"
    :multiple="true"
    :readonly="true"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'

import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['fileUseType', 'sealFileCategory', 'sealUseType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
