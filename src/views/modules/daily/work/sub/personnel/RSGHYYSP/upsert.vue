<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['c_deptId', includeFields]" :span="24">
        <el-form-item prop="c_deptId" label="申请部门">
          <DeptSelect v-model="form.c_deptId" clearable readonly />
        </el-form-item>
      </el-col>
    </el-row> -->

  <DatePicker v-model="form.c_useDate" v-show-field="['c_useDate', includeFields]" name="c_useDate" label="用印日期" />

  <van-field v-show-field="['c_sealType', includeFields]" label="用印类型" name="c_sealType" input-align="left">
    <template #input>
      <dict-select v-model="form.c_sealType" component="checkbox" dict-type="oa_daily_work_rsghyysp_seal_type" multiple />
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
    includeFields: () => ['c_deptId', 'c_useDate', 'c_sealType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
