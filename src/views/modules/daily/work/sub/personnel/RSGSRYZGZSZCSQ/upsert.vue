<template>
  <van-field v-show-field="['y_type', includeFields]" label="证书类型" name="y_type" input-align="left">
    <template #input>
      <DictSelect v-model="form.y_type" dict-type="oa_document_type" :filter-fn="(item) => !['0', '1', '2', '3'].includes(item.value)" />
    </template>
  </van-field>

  <van-field v-model="form.y_name" v-show-field="['y_name', includeFields]" label="证书名称" placeholder="请输入" name="y_name" input-align="left" />

  <van-field v-show-field="['y_certificateStatus', includeFields]" label="证书状态" name="y_certificateStatus" input-align="left">
    <template #input>
      <DictSelect v-model="form.y_certificateStatus" dict-type="sys_normal_disable" />
    </template>
  </van-field>

  <van-field v-model="form.y_speciality" v-show-field="['y_speciality', includeFields]" label="专业名称" placeholder="请输入" name="y_speciality" input-align="left" />

  <van-field v-model="form.y_no" v-show-field="['y_no', includeFields]" label="编号" placeholder="请输入" name="y_no" input-align="left" />

  <DatePicker v-model="form.y_issuanceDate" v-show-field="['y_issuanceDate', includeFields]" name="y_issuanceDate" label="发证时间" readonly />

  <DatePicker v-model="form.y_recheckDate" v-show-field="['y_recheckDate', includeFields]" name="y_recheckDate" label="复审时间" readonly />

  <DatePicker v-model="form.y_startDate" v-show-field="['y_startDate', includeFields]" name="y_startDate" label="开始日期" readonly />

  <DatePicker v-model="form.y_endDate" v-show-field="['y_endDate', includeFields]" name="y_endDate" label="结束日期" readonly />

  <van-field v-model="form.y_unit" v-show-field="['y_unit', includeFields]" label="工作/申报单位" placeholder="请输入" name="y_unit" input-align="left" />

  <van-field v-show-field="['y_isTraining', includeFields]" label="是否参与培训" name="y_isTraining" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.y_isTraining" />
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
    includeFields: () => [
      'y_type',
      'y_name',
      'y_certificateStatus',
      'y_speciality',
      'y_no',
      'y_issuanceDate',
      'y_recheckDate',
      'y_startDate',
      'y_endDate',
      'y_unit',
      'y_isTraining',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
