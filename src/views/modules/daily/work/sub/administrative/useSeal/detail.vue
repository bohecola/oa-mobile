<template>
  <van-field v-show-field="['fileUseType', includeFields]" label="使用方式：" name="fileUseType" input-align="right">
    <template #input>
      <DictSelect v-model="form.fileUseType" dict-type="oa_file_use_type" :multiple="false" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['sealFileCategory', includeFields]" label="文件类别：" name="sealFileCategory" input-align="right">
    <template #input>
      <DictSelect v-model="form.sealFileCategory" dict-type="oa_seal_file_category" :multiple="false" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['sealUseType', includeFields]" label="用印类型：" name="sealUseType" input-align="right">
    <template #input>
      <DictSelect v-model="form.sealUseType" dict-type="oa_seal_use_type" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../components/BaseDetail.vue'

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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
