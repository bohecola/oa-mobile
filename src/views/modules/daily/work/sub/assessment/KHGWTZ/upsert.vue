<template>
  <DeptSelect
    v-model="form.needDepts"
    v-show-field="['needDepts', includeFields]"
    label="部门/项目部"
    name="needDepts"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
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

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 表单
const form = inject<Ref<DailyWorkForm>>('form')
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
