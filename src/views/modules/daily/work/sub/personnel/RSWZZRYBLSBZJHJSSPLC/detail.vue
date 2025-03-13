<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['cc_userId', includeFields]" :span="24">
      <el-form-item prop="cc_userId" label="申请人">
        <UserSelectPro v-model="form.cc_userId" :multiple="true" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['cc_deptId', includeFields]" :span="24">
      <el-form-item prop="cc_deptId" label="所属部门">
        <DeptSelect v-model="form.cc_deptId" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->

  <DictPicker
    v-model="form.cc_socialSecurityProcessingCategory"
    v-show-field="['cc_socialSecurityProcessingCategory', includeFields]"
    label="社保办理类别"
    name="cc_socialSecurityProcessingCategory"
    dict-type="oa_daily_work_rswzzryblsbzjhjssplc_ss_type"
    :multiple="true"
    :readonly="true"
  />

  <DictPicker
    v-model="form.cc_insuranceType"
    v-show-field="['cc_insuranceType', includeFields]"
    label="险种"
    name="cc_insuranceType"
    dict-type="oa_daily_work_rswzzryblsbzjhjssplc_insurance_type"
    :multiple="true"
    :readonly="true"
  />

  <DatePicker
    v-model="form.cc_effectiveMonth"
    v-show-field="['cc_effectiveMonth', includeFields]"
    name="cc_effectiveMonth"
    label="生效月份"
    :columns-type="['year', 'month']"
    readonly
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
    includeFields: () => ['cc_socialSecurityProcessingCategory', 'cc_insuranceType', 'cc_effectiveMonth', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
