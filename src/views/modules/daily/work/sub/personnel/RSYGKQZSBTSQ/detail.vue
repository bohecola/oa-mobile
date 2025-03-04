<template>
  <van-field v-show-field="['yy_type', includeFields]" label="证书类型" name="yy_type" input-align="left">
    <template #input>
      <DictSelect v-model="form.yy_type" dict-type="oa_document_type" readonly />
    </template>
  </van-field>

  <van-field v-model="form.yy_name" v-show-field="['yy_name', includeFields]" label="证书名称" name="yy_name" input-align="left" />

  <van-field v-show-field="['yy_certificateStatus', includeFields]" label="证书状态" name="yy_certificateStatus" input-align="left">
    <template #input>
      <DictSelect v-model="form.yy_certificateStatus" dict-type="sys_normal_disable" readonly />
    </template>
  </van-field>

  <van-field v-model="form.yy_speciality" v-show-field="['yy_speciality', includeFields]" label="专业名称" name="yy_speciality" input-align="left" />

  <van-field v-model="form.yy_no" v-show-field="['yy_no', includeFields]" label="编号" name="yy_no" input-align="left" />

  <van-field v-show-field="['yy_issuanceDate', includeFields]" label="发证时间" name="yy_issuanceDate" input-align="left">
    <template #input>
      {{ parseTime(form.yy_issuanceDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['yy_recheckDate', includeFields]" label="复审时间" name="yy_recheckDate" input-align="left">
    <template #input>
      {{ parseTime(form.yy_recheckDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['yy_startDate', includeFields]" label="开始日期" name="yy_startDate" input-align="left">
    <template #input>
      {{ parseTime(form.yy_startDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['yy_endDate', includeFields]" label="结束日期" name="yy_endDate" input-align="left">
    <template #input>
      {{ parseTime(form.yy_endDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.yy_unit" v-show-field="['yy_unit', includeFields]" label="工作/申报单位" name="yy_unit" input-align="left" />

  <van-field v-show-field="['yy_isTraining', includeFields]" label="是否参与培训" name="yy_isTraining" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.yy_isTraining" readonly />
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
    includeFields: () => ['yy_type', 'yy_name', 'yy_certificateStatus', 'yy_speciality', 'yy_no', 'yy_issuanceDate', 'yy_recheckDate', 'yy_startDate', 'yy_endDate', 'yy_unit', 'yy_isTraining', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
