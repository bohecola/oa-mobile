<template>
  <van-field v-show-field="['fileType', includeFields]" label="资料类型" name="fileType" input-align="left">
    <template #input>
      <DictSelect v-model="form.fileType" dict-type="oa_file_type" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['fileUseType', includeFields]" label="使用方式" name="fileUseType" input-align="left">
    <template #input>
      <DictSelect v-model="form.fileUseType" dict-type="oa_file_use_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isSeal', includeFields]" label="是否加盖公章" name="isSeal" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.isSeal" readonly />
    </template>
  </van-field>

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
    includeFields: () => ['fileType', 'fileUseType', 'isSeal', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
