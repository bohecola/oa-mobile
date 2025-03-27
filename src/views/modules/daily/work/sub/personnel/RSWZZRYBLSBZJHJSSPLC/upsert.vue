<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['cc_userId', includeFields]" :span="24">
        <el-form-item prop="cc_userId" label="申请人">
          <UserSelectPro v-model="form.cc_userId" multiple  />
        </el-form-item>
      </el-col>
    </el-row> -->
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['cc_deptId', includeFields]" :span="24">
        <el-form-item prop="cc_deptId" label="所属部门">
          <DeptSelect v-model="form.cc_deptId"  />
        </el-form-item>
      </el-col>
    </el-row> -->

  <DictSelect
    v-model="form.cc_socialSecurityProcessingCategory"
    v-show-field="['cc_socialSecurityProcessingCategory', includeFields]"
    label="社保办理类别"
    name="cc_socialSecurityProcessingCategory"
    dict-type="oa_daily_work_rswzzryblsbzjhjssplc_ss_type"
    :rules="computedRules.cc_socialSecurityProcessingCategory"
    clearable
  />

  <DictSelect
    v-model="form.cc_insuranceType"
    v-show-field="['cc_insuranceType', includeFields]"
    label="险种"
    name="cc_insuranceType"
    dict-type="oa_daily_work_rswzzryblsbzjhjssplc_insurance_type"
    multiple
    :rules="computedRules.cc_insuranceType"
    clearable
  />

  <DateSelect
    v-model="form.cc_effectiveMonth"
    v-show-field="['cc_effectiveMonth', includeFields]"
    name="cc_effectiveMonth"
    label="生效月份"
    :columns-type="['year', 'month']"
    component="date-picker"
    clearable
  />

  <BaseUpsert
    :include-fields="includeFields"
    :rules="computedRules.cc_insuranceType"
  />
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
    includeFields: () => ['cc_socialSecurityProcessingCategory', 'cc_insuranceType', 'cc_effectiveMonth', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)
</script>
