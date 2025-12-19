<template>
  <DeptSelect
    v-model="form.f_deptId"
    v-model:value="form.needDepts"
    v-show-field="['f_deptId', includeFields]"
    name="f_deptId"
    label="部门"
    :rules="computedRules.f_deptId"
  />

  <DictSelect
    v-model="form.f_fileType"
    v-show-field="['f_fileType', includeFields]"
    label="资料类别"
    name="f_fileType"
    dict-type="oa_daily_work_rsdygsygdzbxxsq_file_type"
    multiple
    :rules="computedRules.f_fileType"
    clearable
  />

  <DictSelect
    v-if="isShowPersonnelCategory"
    v-model="form.f_personnelCategory"
    v-show-field="['f_personnelCategory', includeFields]"
    label="人员类别"
    name="f_personnelCategory"
    dict-type="oa_user_type"
    multiple
    :readonly="false"
    :rules="computedRules.f_personnelCategory"
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
    includeFields: () => ['f_userId', 'f_deptId', 'f_fileType', 'f_personnelCategory', 'reason', 'ossIdList'],
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
  return form.value.f_fileType?.includes('3')
})

onMounted(() => {
  updateRuleRequired('f_personnelCategory', isShowPersonnelCategory.value)
})
</script>
