<template>
  <van-field v-show-field="['y_type', includeFields]" label="证书类型" name="y_type" input-align="right">
    <template #input>
      <DictSelect v-model="form.y_type" dict-type="oa_document_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['y_name', includeFields]" label="证书名称" name="y_name" input-align="right">
    <template #input>
      {{ form.y_name }}
    </template>
  </van-field>

  <van-field v-show-field="['y_status', includeFields]" label="证书状态" name="y_status" input-align="right">
    <template #input>
      <DictSelect v-model="form.y_status" dict-type="sys_normal_disable" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['y_speciality', includeFields]" label="专业名称" name="y_speciality" input-align="right">
    <template #input>
      {{ form.y_speciality }}
    </template>
  </van-field>

  <van-field v-show-field="['y_no', includeFields]" label="编号" name="y_no" input-align="right">
    <template #input>
      {{ form.y_no }}
    </template>
  </van-field>

  <van-field v-show-field="['y_issuanceDate', includeFields]" label="发证时间" name="y_issuanceDate" input-align="right">
    <template #input>
      {{ parseTime(form.y_issuanceDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['y_recheckDate', includeFields]" label="复审时间" name="y_recheckDate" input-align="right">
    <template #input>
      {{ parseTime(form.y_recheckDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['y_unit', includeFields]" label="工作/申报单位" name="y_unit" input-align="right">
    <template #input>
      {{ form.y_unit }}
    </template>
  </van-field>

  <van-field v-show-field="['y_startDate', includeFields]" label="开始日期" name="y_startDate" input-align="right">
    <template #input>
      {{ parseTime(form.y_startDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['y_endDate', includeFields]" label="结束日期" name="y_endDate" input-align="right">
    <template #input>
      {{ parseTime(form.y_endDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['y_isTraining', includeFields]" label="是否参与培训" name="y_isTraining" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.y_isTraining" readonly />
    </template>
  </van-field>

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
    includeFields: () => [
      'y_type',
      'y_name',
      'y_status',
      'y_speciality',
      'y_no',
      'y_issuanceDate',
      'y_recheckDate',
      'y_startDate',
      'y_endDate',
      'y_isTraining',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
