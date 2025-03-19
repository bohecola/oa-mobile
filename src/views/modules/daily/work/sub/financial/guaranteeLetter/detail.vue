<template>
  <DictSelect
    v-model="form.contractCategory"
    v-show-field="['contractCategory', includeFields]"
    label="销售合同类别"
    name="contractCategory"
    dict-type="oa_contract_category_in"
  />

  <van-field
    v-model="form.jj_type"
    v-show-field="['jj_type', includeFields]"
    label="业务类型"
    name="jj_type"
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
    includeFields: () => ['contractCategory', 'jj_type', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
