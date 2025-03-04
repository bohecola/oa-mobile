<template>
  <van-field v-model="form.oo_evacuationMaterialPlan" v-show-field="['oo_evacuationMaterialPlan', includeFields]" label="撤场物资处理方案" name="oo_evacuationMaterialPlan" input-align="left" />

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
    includeFields: () => ['oo_evacuationMaterialPlan', 'reason', 'ossIdList'],
  },
)
const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
