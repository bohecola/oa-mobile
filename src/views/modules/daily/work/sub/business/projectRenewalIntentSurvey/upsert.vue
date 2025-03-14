<template>
  <van-field
    v-show-field="['needDepts', includeFields]"
    name="needDepts"
    label="需求部门"
    :rules="computedRules.needDepts"
  >
    <template #input>
      <DeptSelect v-model="form.needDepts" multiple />
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['needDepts', 'reason', 'ossIdList'],
  },
)

// 表单
const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')
</script>
