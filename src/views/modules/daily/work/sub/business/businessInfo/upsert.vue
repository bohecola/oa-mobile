<template>
  <DictPicker
    v-model="form.fileType"
    v-show-field="['fileType', includeFields]"
    label="资料类型"
    name="fileType"
    dict-type="oa_file_type"
    :multiple="true"
    :rules="computedRules.fileType"
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
    type="textarea"
    rows="1"
    autosize
    placeholder="请输入合同相关文件、公司资质扫码件/授权书及其他对外证明文件（申请事由）"
    name="kk_applicationMaterials"
    :rules="computedRules.kk_applicationMaterials"
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
