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

  <van-field v-show-field="['cc_socialSecurityProcessingCategory', includeFields]" name="cc_socialSecurityProcessingCategory" label="社保办理类别" input-align="left">
    <template #input>
      <DictSelect v-model="form.cc_socialSecurityProcessingCategory" dict-type="oa_daily_work_rswzzryblsbzjhjssplc_ss_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['cc_insuranceType', includeFields]" name="cc_insuranceType" label="险种" input-align="left">
    <template #input>
      <DictSelect v-model="form.cc_insuranceType" dict-type="oa_daily_work_rswzzryblsbzjhjssplc_insurance_type" :multiple="true" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['cc_effectiveMonth', includeFields]" name="cc_effectiveMonth" label="生效月份" input-align="left">
    <template #input>
      {{ parseTime(form.cc_effectiveMonth, '{y}-{m}') }}
    </template>
  </van-field>

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
