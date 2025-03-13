<template>
  <DictPicker
    v-model="form.administrationFileType"
    v-show-field="['administrationFileType', includeFields]"
    label="申请资料"
    name="administrationFileType"
    dict-type="oa_administration_file_type"
    :multiple="true"
    :rules="computedRules.administrationFileType"
    :required="true"
  />

  <DictPicker
    v-model="form.fileType"
    v-show-field="['fileType', includeFields]"
    label="资料类型"
    name="fileType"
    dict-type="oa_file_type"
    :multiple="true"
    :rules="computedRules.administrationFileType"
    :required="true"
  />

  <van-field
    v-show-field="['isUseSeal', includeFields]"
    label="是否用印"
    name="isUseSeal"
    :rules="computedRules.isUseSeal"
  >
    <template #input>
      <YesNoSwitch v-model="form.isUseSeal" />
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
    includeFields: () => ['administrationFileType', 'fileType', 'isUseSeal', 'reason', 'ossIdList'],
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
