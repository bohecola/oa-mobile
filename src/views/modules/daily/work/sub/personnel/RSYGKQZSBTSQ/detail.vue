<template>
  <van-field
    v-show-field="['yy_entryCompanyDate', includeFields]"
    label="入职时间"
    name="yy_entryCompanyDate"
  >
    <template #input>
      {{ parseTime(form.yy_entryCompanyDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field
    v-show-field="['yy_subsidyStandards', includeFields]"
    label="补贴标准(元/月)"
    name="yy_subsidyStandards"
  >
    <template #input>
      {{ formatCurrency(form.yy_subsidyStandards) }}
      <span
        v-if="!isNil(form.yy_subsidyStandards)"
        class="ml-3 text-red-400"
      >{{ toCnMoney(form.yy_subsidyStandards) }}</span>
    </template>
  </van-field>

  <DictSelect
    v-model="form.yy_type"
    v-show-field="['yy_type', includeFields]"
    label="申请注册/使用证书类型"
    name="yy_type"
    dict-type="oa_document_type"
  />

  <van-field
    v-model="form.yy_name"
    v-show-field="['yy_name', includeFields]"
    label="申请注册/使用证书名称"
    name="yy_name"
  />

  <DictSelect
    v-model="form.yy_certificateLevel"
    v-show-field="['yy_certificateLevel', includeFields]"
    label="证书等级"
    name="yy_certificateLevel"
    dict-type="oa_certificate_level"
  />

  <van-field
    v-show-field="['yy_registrationCompanyDate', includeFields]"
    label="注册到公司日期"
    name="yy_registrationCompanyDate"
  >
    <template #input>
      {{ parseTime(form.yy_registrationCompanyDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field
    v-show-field="['yy_otherCompanyUseStatus', includeFields]"
    label="证书目前是否正在其他公司使用"
    name="yy_otherCompanyUseStatus"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.yy_otherCompanyUseStatus"
        readonly
      />
    </template>
  </van-field>

  <DictSelect
    v-model="form.yy_certificateStatus"
    v-show-field="['yy_certificateStatus', includeFields]"
    label="证书状态"
    name="yy_certificateStatus"
    dict-type="sys_normal_disable"
  />

  <van-field
    v-model="form.yy_speciality"
    v-show-field="['yy_speciality', includeFields]"
    label="专业名称"
    name="yy_speciality"
  />

  <van-field
    v-model="form.yy_no"
    v-show-field="['yy_no', includeFields]"
    label="编号"
    name="yy_no"
  />

  <DateSelect
    v-model="form.yy_issuanceDate"
    v-show-field="['yy_issuanceDate', includeFields]"
    name="yy_issuanceDate"
    label="发证时间"
  />

  <DateSelect
    v-model="form.yy_recheckDate"
    v-show-field="['yy_recheckDate', includeFields]"
    name="yy_recheckDate"
    label="复审时间"
  />

  <DateSelect
    v-model="form.yy_startDate"
    v-show-field="['yy_startDate', includeFields]"
    name="yy_startDate"
    label="开始日期"
  />

  <DateSelect
    v-model="form.yy_endDate"
    v-show-field="['yy_endDate', includeFields]"
    name="yy_endDate"
    label="结束日期"
  />

  <van-field
    v-model="form.yy_unit"
    v-show-field="['yy_unit', includeFields]"
    label="发证单位"
    name="yy_unit"
  />

  <van-field
    v-show-field="['yy_isTraining', includeFields]"
    label="是否参与培训"
    name="yy_isTraining"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.yy_isTraining"
        readonly
      />
    </template>
  </van-field>
  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['yy_type', 'yy_name', 'yy_certificateStatus', 'yy_certificateLevel', 'yy_otherCompanyUseStatus', 'yy_entryCompanyDate', 'yy_subsidyStandards', 'yy_registrationCompanyDate', 'yy_speciality', 'yy_no', 'yy_issuanceDate', 'yy_recheckDate', 'yy_startDate', 'yy_endDate', 'yy_unit', 'yy_isTraining', 'yy_subsidyStandards', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
