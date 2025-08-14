<template>
  <DeptSelect
    v-model="form.needDepts"
    v-show-field="['needDepts', includeFields]"
    label="部门/项目部"
    name="needDepts"
    readonly
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
    includeFields: () => [
      'needDepts',
      'reason',
      'ossIdList',
    ],
  },
)

// 表单
const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
