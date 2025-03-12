<template>
  <DictPicker
    v-model="form.fileType"
    v-show-field="['fileType', includeFields]"
    label="资料类型"
    name="fileType"
    input-align="left"
    dict-type="oa_file_type"
    :multiple="true"
  />

  <van-field v-show-field="['isSeal', includeFields]" label="是否加盖公章" name="isSeal" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.isSeal" />
    </template>
  </van-field>

  <van-field v-model="form.ii_applicationMaterials" v-show-field="['ii_applicationMaterials', includeFields]" label="申请资料" placeholder="请输入" name="ii_applicationMaterials" input-align="left" />

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
    includeFields: () => ['fileType', 'isSeal', 'ii_applicationMaterials', 'reason', 'ossIdList'],
  },
)

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_file_type } = toRefs<any>(proxy?.useDict('oa_file_type'))

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
