<template>
  <van-field v-show-field="['sealType', includeFields]" label="申请类型" name="sealType" input-align="right">
    <template #input>
      <DictSelect v-model="form.sealType" dict-type="oa_seal_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isReturnSeal', includeFields]" label="是否交回原印" name="isReturnSeal" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isReturnSeal" readonly />
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
    includeFields: () => ['sealType', 'isReturnSeal', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
