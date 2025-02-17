<template>
  <van-field v-show-field="['fileType', includeFields]" label="资料类型" name="fileType" input-align="right">
    <template #input>
      <DictSelect v-model="form.fileType" dict-type="oa_file_type" multiple readonly />
    </template>
  </van-field>
  <van-field v-show-field="['isSeal', includeFields]" label="是否加盖公章" name="isSeal" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isSeal" readonly />
    </template>
  </van-field>

  <van-field v-model="form.ii_applicationMaterials" v-show-field="['ii_applicationMaterials', includeFields]" label="申请资料" name="ii_applicationMaterials" input-align="right" />

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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
