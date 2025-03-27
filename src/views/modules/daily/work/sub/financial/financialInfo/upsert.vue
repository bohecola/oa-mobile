<template>
  <DictSelect
    v-model="form.fileType"
    v-show-field="['fileType', includeFields]"
    label="资料类型"
    name="fileType"
    dict-type="oa_file_type"
    multiple
    :rules="computedRules.fileType"
    clearable
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
    v-model.trim="form.ii_applicationMaterials"
    v-show-field="['ii_applicationMaterials', includeFields]"
    label="申请资料"
    placeholder="请输入成本资料（项目成本等）、财税资料（财务报告、报表，税务资料及其他）"
    type="textarea"
    rows="1"
    autosize
    name="ii_applicationMaterials"
    :rules="computedRules.ii_applicationMaterials"
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
    includeFields: () => ['fileType', 'isSeal', 'ii_applicationMaterials', 'reason', 'ossIdList'],
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
