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
    includeFields: () => ['f_userId', 'f_deptId', 'f_fileType', 'reason', 'ossIdList'],
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
