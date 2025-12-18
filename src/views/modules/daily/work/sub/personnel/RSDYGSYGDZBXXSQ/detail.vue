<template>
  <DeptSelect
    v-model="form.f_deptId"
    v-show-field="['f_deptId', includeFields]"
    name="f_deptId"
    label="部门"
  />

  <DictSelect
    v-model="form.f_fileType"
    v-show-field="['f_fileType', includeFields]"
    label="资料类别"
    name="f_fileType"
    multiple
    dict-type="oa_daily_work_rsdygsygdzbxxsq_file_type"
  />

  <DictSelect
    v-model="form.f_personnelCategory"
    v-show-field="['f_personnelCategory', includeFields]"
    label="人员类别"
    name="f_personnelCategory"
    dict-type="oa_user_type"
    multiple
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
    includeFields: () => ['f_userId', 'f_deptId', 'f_fileType', 'f_personnelCategory', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
