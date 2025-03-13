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

  <van-field
    v-show-field="['isSeal', includeFields]"
    label="是否加盖公章"
    name="isSeal"
    :rules="computedRules.isSeal"
  >
    <template #input>
      <YesNoSwitch v-model="form.isSeal" />
    </template>
  </van-field>

  <van-field
    v-model.trim="form.kk_applicationMaterials"
    v-show-field="['kk_applicationMaterials', includeFields]"
    label="申请资料"
    placeholder="请输入"
    name="kk_applicationMaterials"
    :rules="computedRules.kk_applicationMaterials"
  />

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
    includeFields: () => ['fileType', 'isSeal', 'kk_applicationMaterials', 'reason', 'ossIdList'],
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
