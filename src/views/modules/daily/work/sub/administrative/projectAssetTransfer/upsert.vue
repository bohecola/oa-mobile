<template>
  <van-field
    v-model.trim="form.oo_evacuationMaterialPlan"
    v-show-field="['oo_evacuationMaterialPlan', includeFields]"
    label="撤场物资处理方案"
    name="oo_evacuationMaterialPlan"
    placeholder="请输入返回公司（需邮寄回公司物资清单），项目分流（分流到其他项目物资清单），情况说明（遗失、损坏等无法交回情况）"
    :rules="computedRules.oo_evacuationMaterialPlan"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['oo_evacuationMaterialPlan', 'reason', 'ossIdList'],
  },
)
const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
