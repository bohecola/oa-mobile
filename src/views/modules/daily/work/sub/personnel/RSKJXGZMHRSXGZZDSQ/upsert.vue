<template>
  <DeptSelect
    v-model="form.d_deptId"
    v-model:value="form.needDepts"
    v-show-field="['d_deptId', includeFields]"
    name="d_deptId"
    label="部门/项目部"
    :rules="computedRules.d_deptId"
  />

  <DictSelect
    v-model="form.d_proveType"
    v-show-field="['d_proveType', includeFields]"
    label="证明类别"
    name="d_proveType"
    multiple
    component="checkbox"
    dict-type="oa_daily_work_rskjxgzmhrsxgzzdsq_prove_category"
    :rules="computedRules.d_proveType"
  />

  <DictSelect
    v-if="isShowPersonnelCategory"
    v-model="form.d_personnelCategory"
    v-show-field="['d_personnelCategory', includeFields]"
    label="人员类别"
    name="d_personnelCategory"
    dict-type="oa_user_type"
    multiple
    :readonly="false"
    :rules="computedRules.d_personnelCategory"
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
    includeFields: () => ['d_deptId', 'd_proveType', 'd_personnelCategory', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 更新规则
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')

// 是否显示人员类别
const isShowPersonnelCategory = computed(() => {
  return form.value.d_proveType?.split(',').some(item => ['0', '1', '4'].includes(item))
})

onMounted(() => {
  updateRuleRequired('d_personnelCategory', isShowPersonnelCategory.value)
})
</script>
