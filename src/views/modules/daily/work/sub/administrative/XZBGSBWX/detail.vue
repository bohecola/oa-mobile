<template>
  <van-field
    v-model.trim="form.v_assetNo"
    v-show-field="['v_assetNo', includeFields]"
    name="v_assetNo"
    label="固定资产编号"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')

const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
