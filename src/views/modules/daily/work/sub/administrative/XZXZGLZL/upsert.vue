<template>
  <DictSelect
    v-model="form.administrationFileType"
    v-show-field="['administrationFileType', includeFields]"
    label="申请资料"
    name="administrationFileType"
    dict-type="oa_administration_file_type"
    :rules="computedRules.administrationFileType"
    clearable
  />

  <DictSelect
    v-model="form.fileType"
    v-show-field="['fileType', includeFields]"
    label="资料类型"
    name="fileType"
    dict-type="oa_file_type"
    multiple
    :rules="computedRules.administrationFileType"
    clearable
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
