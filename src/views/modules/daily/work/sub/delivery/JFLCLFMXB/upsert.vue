<template>
  <ProjectSelect
    v-model="form.ab_projectId"
    v-model:contract-no-str="form.ab_contractNo"
    v-model:business-type="form.ab_businessType"
    v-model:dept-id="form.needDepts"
    v-show-field="['ab_projectId', includeFields]"
    name="ab_projectId"
    label="项目"
    :rules="computedRules.ab_projectId"
    :params="{
      businessType: '1,2,5',
    }"
    clearable
  />

  <van-field
    v-model="form.ab_contractNo"
    v-show-field="['ab_contractNo', includeFields]"
    name="ab_contractNo"
    label="合同编号"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import ProjectSelect from '@/views/modules/business/components/ProjectSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['ab_projectId', 'ab_contractNo', 'reason', 'ossIdList'],
  },
)

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 表单
const form = inject<Ref<DailyWorkForm>>('form')
// 校验
const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
