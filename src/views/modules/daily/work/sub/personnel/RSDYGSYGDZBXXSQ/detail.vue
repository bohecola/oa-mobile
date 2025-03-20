<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['f_userId', includeFields]" :span="24">
      <el-form-item prop="f_userId" label="申请人">
        <UserSelectPro v-model="form.f_userId" :multiple="false" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->
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

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['f_userId', 'f_deptId', 'f_fileType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
