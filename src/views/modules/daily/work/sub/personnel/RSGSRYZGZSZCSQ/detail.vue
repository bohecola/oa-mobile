<template>
  <van-field v-show-field="['y_type', includeFields]" label="申请注册/使用证书类型" name="y_type" input-align="left">
    <template #input>
      <DictSelect v-model="form.y_type" dict-type="oa_document_type" :filter-fn="(item) => !['0', '1', '2', '3'].includes(item.value)" readonly />
    </template>
  </van-field>

  <van-field v-model="form.y_name" v-show-field="['y_name', includeFields]" label="申请注册/使用证书名称" name="y_name" input-align="left" />

  <van-field v-show-field="['y_certificateLevel', includeFields]" label="证书等级" name="y_certificateLevel" input-align="left">
    <template #input>
      <DictSelect v-model="form.y_certificateLevel" dict-type="oa_certificate_level" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['y_otherCompanyUseStatus', includeFields]" label="证书目前是否正在其他公司使用" name="y_otherCompanyUseStatus" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.y_otherCompanyUseStatus" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['y_certificateStatus', includeFields]" label="证书状态" name="y_certificateStatus" input-align="left">
    <template #input>
      <DictSelect v-model="form.y_certificateStatus" dict-type="sys_normal_disable" readonly />
    </template>
  </van-field>

  <van-field v-model="form.y_speciality" v-show-field="['y_speciality', includeFields]" label="专业名称" name="y_speciality" input-align="left" />

  <van-field v-model="form.y_no" v-show-field="['y_no', includeFields]" label="编号" name="y_no" input-align="left" />

  <van-field v-show-field="['y_issuanceDate', includeFields]" label="发证时间" name="y_issuanceDate" input-align="left">
    <template #input>
      {{ parseTime(form.y_issuanceDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['y_recheckDate', includeFields]" label="复审时间" name="y_recheckDate" input-align="left">
    <template #input>
      {{ parseTime(form.y_recheckDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['y_startDate', includeFields]" label="开始日期" name="y_startDate" input-align="left">
    <template #input>
      {{ parseTime(form.y_startDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['y_endDate', includeFields]" label="结束日期" name="y_endDate" input-align="left">
    <template #input>
      {{ parseTime(form.y_endDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.y_unit" v-show-field="['y_unit', includeFields]" label="发证单位" name="y_unit" input-align="left" />

  <van-field v-show-field="['y_isTraining', includeFields]" label="是否参与培训" name="y_isTraining" input-align="left">
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
      'y_certificateLevel',
      'y_otherCompanyUseStatus',
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
