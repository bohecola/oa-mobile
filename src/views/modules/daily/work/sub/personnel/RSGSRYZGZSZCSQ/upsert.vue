<template>
  <DictSelect
    v-model="form.y_type"
    v-show-field="['y_type', includeFields]"
    label="申请注册/使用证书类型"
    name="y_type"
    dict-type="oa_document_type"
    :filter-fn="(item) => !['0', '1', '2', '3'].includes(item.value)"
    :rules="computedRules.y_type"
  />

  <van-field
    v-model.trim="form.y_name"
    v-show-field="['y_name', includeFields]"
    label="申请注册/使用证书名称"
    placeholder="请输入"
    name="y_name"
    :rules="computedRules.y_name"
  />

  <DictSelect
    v-model="form.y_certificateLevel"
    v-show-field="['y_certificateLevel', includeFields]"
    label="证书等级"
    name="y_certificateLevel"
    dict-type="oa_certificate_level"
    :rules="computedRules.y_certificateLevel"
  />

  <van-field
    v-show-field="['y_otherCompanyUseStatus', includeFields]"
    label="证书目前是否正在其他公司使用"
    name="y_otherCompanyUseStatus"
    :rules="computedRules.y_otherCompanyUseStatus"
  >
    <template #input>
      <YesNoSwitch v-model="form.y_otherCompanyUseStatus" />
    </template>
  </van-field>

  <DictSelect
    v-model="form.y_certificateStatus"
    v-show-field="['y_certificateStatus', includeFields]"
    label="证书状态"
    name="y_certificateStatus"
    dict-type="sys_normal_disable"
    :rules="computedRules.y_certificateStatus"
  />

  <van-field
    v-model.trim="form.y_speciality"
    v-show-field="['y_speciality', includeFields]"
    label="专业名称"
    placeholder="请输入"
    name="y_speciality"
    :rules="computedRules.y_speciality"
  />

  <van-field
    v-model.trim="form.y_no"
    v-show-field="['y_no', includeFields]"
    label="编号"
    placeholder="请输入"
    name="y_no"
    :rules="computedRules.y_no"
  />

  <DateSelect
    v-model="form.y_issuanceDate"
    v-show-field="['y_issuanceDate', includeFields]"
    name="y_issuanceDate"
    label="发证时间"
    :rules="computedRules.y_issuanceDate"
  />

  <DateSelect
    v-model="form.y_recheckDate"
    v-show-field="['y_recheckDate', includeFields]"
    name="y_recheckDate"
    label="复审时间"
    clearable
  />

  <DateSelect
    v-model="form.y_startDate"
    v-show-field="['y_startDate', includeFields]"
    name="y_startDate"
    label="开始日期"
    clearable
  />

  <DateSelect
    v-model="form.y_endDate"
    v-show-field="['y_endDate', includeFields]"
    name="y_endDate"
    label="结束日期"
    clearable
  />

  <van-field
    v-model.trim="form.y_unit"
    v-show-field="['y_unit', includeFields]"
    label="发证单位"
    placeholder="请输入"
    name="y_unit"
    :rules="computedRules.y_unit"
  />

  <van-field
    v-show-field="['y_isTraining', includeFields]"
    label="是否参与培训"
    name="y_isTraining"
    :rules="computedRules.y_isTraining"
  >
    <template #input>
      <YesNoSwitch v-model="form.y_isTraining" />
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)
</script>
