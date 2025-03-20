<template>
  <DictSelect
    v-model="form.y_type"
    v-show-field="['y_type', includeFields]"
    label="申请注册/使用证书类型"
    name="y_type"
    dict-type="oa_document_type"
    :filter-fn="(item) => !['0', '1', '2', '3'].includes(item.value)"
  />

  <van-field
    v-model="form.y_name"
    v-show-field="['y_name', includeFields]"
    label="申请注册/使用证书名称"
    name="y_name"
  />

  <DictSelect
    v-model="form.y_certificateLevel"
    v-show-field="['y_certificateLevel', includeFields]"
    label="证书等级"
    name="y_certificateLevel"
    dict-type="oa_certificate_level"
  />

  <van-field
    v-show-field="['y_otherCompanyUseStatus', includeFields]"
    label="证书目前是否正在其他公司使用"
    name="y_otherCompanyUseStatus"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.y_otherCompanyUseStatus"
        readonly
      />
    </template>
  </van-field>

  <DictSelect
    v-model="form.y_certificateStatus"
    v-show-field="['y_certificateStatus', includeFields]"
    label="证书状态"
    name="y_certificateStatus"
    dict-type="sys_normal_disable"
  />

  <van-field
    v-model="form.y_speciality"
    v-show-field="['y_speciality', includeFields]"
    label="专业名称"
    name="y_speciality"
  />

  <van-field
    v-model="form.y_no"
    v-show-field="['y_no', includeFields]"
    label="编号"
    name="y_no"
  />

  <DateSelect
    v-model="form.y_issuanceDate"
    v-show-field="['y_issuanceDate', includeFields]"
    name="y_issuanceDate"
    label="发证时间"
  />

  <DateSelect
    v-model="form.y_recheckDate"
    v-show-field="['y_recheckDate', includeFields]"
    name="y_recheckDate"
    label="复审时间"
  />

  <DateSelect
    v-model="form.y_startDate"
    v-show-field="['y_startDate', includeFields]"
    name="y_startDate"
    label="开始日期"
  />

  <DateSelect
    v-model="form.y_endDate"
    v-show-field="['y_endDate', includeFields]"
    name="y_endDate"
    label="结束日期"
  />

  <van-field
    v-model="form.y_unit"
    v-show-field="['y_unit', includeFields]"
    label="发证单位"
    name="y_unit"
  />

  <van-field
    v-show-field="['y_isTraining', includeFields]"
    label="是否参与培训"
    name="y_isTraining"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.y_isTraining"
        readonly
      />
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
