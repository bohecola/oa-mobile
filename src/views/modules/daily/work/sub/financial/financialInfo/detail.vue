<template>
  <DictSelect
    v-model="form.fileType"
    label="资料类型"
    name="fileType"
    dict-type="oa_file_type"
    multiple
  />

  <van-field
    v-show-field="['isSeal', includeFields]"
    label="是否加盖公章"
    name="isSeal"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.isSeal"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-model.trim="form.ii_applicationMaterials"
    v-show-field="['ii_applicationMaterials', includeFields]"
    label="申请资料"
    name="ii_applicationMaterials"
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
    includeFields: () => ['fileType', 'isSeal', 'ii_applicationMaterials', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
