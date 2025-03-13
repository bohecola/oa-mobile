<template>
  <van-field
    v-show-field="['y_type', includeFields]"
    label="申请注册/使用证书类型"
    name="y_type"
    :rules="computedRules.y_type"
  >
    <template #input>
      <DictSelect v-model="form.y_type" dict-type="oa_document_type" :filter-fn="(item) => !['0', '1', '2', '3'].includes(item.value)" />
    </template>
  </van-field>

  <van-field
    v-model.trim="form.y_name"
    v-show-field="['y_name', includeFields]"
    label="申请注册/使用证书名称"
    placeholder="请输入"
    name="y_name"
    :rules="computedRules.y_name"
  />

  <van-field
    v-show-field="['y_certificateLevel', includeFields]"
    label="证书等级"
    name="y_certificateLevel"
    :rules="computedRules.y_certificateLevel"
  >
    <template #input>
      <DictSelect v-model="form.y_certificateLevel" dict-type="oa_certificate_level" />
    </template>
  </van-field>

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

  <DictPicker
    v-model="form.y_certificateStatus"
    v-show-field="['y_certificateStatus', includeFields]"
    label="证书状态"
    name="y_certificateStatus"
    dict-type="sys_normal_disable"
    :multiple="false"
    :rules="computedRules.y_certificateStatus"
    :required="true"
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

  <DatePicker
    v-model="form.y_issuanceDate"
    v-show-field="['y_issuanceDate', includeFields]"
    name="y_issuanceDate"
    label="发证时间"
    :rules="computedRules.y_issuanceDate"
  />

  <DatePicker
    v-model="form.y_recheckDate"
    v-show-field="['y_recheckDate', includeFields]"
    name="y_recheckDate"
    label="复审时间"
    :rules="computedRules.y_recheckDate"
  />

  <DatePicker
    v-model="form.y_startDate"
    v-show-field="['y_startDate', includeFields]"
    name="y_startDate"
    label="开始日期"
    :rules="computedRules.y_startDate"
  />

  <DatePicker
    v-model="form.y_endDate"
    v-show-field="['y_endDate', includeFields]"
    name="y_endDate"
    label="结束日期"
    :rules="computedRules.y_endDate"
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

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)
</script>
