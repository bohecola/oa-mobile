<template>
  <DictSelect
    v-model="form.yy_dailyWorkId"
    v-show-field="['yy_dailyWorkId', includeFields]"
    label="证书注册申请"
    name="yy_dailyWorkId"
    :options="dailyWorkData"
    :rules="computedRules.yy_dailyWorkId"
    @change="onChange"
  />

  <DateSelect
    v-model="form.yy_entryCompanyDate"
    v-show-field="['yy_entryCompanyDate', includeFields]"
    name="yy_entryCompanyDate"
    label="入职时间"
  />

  <van-field-number
    v-model.number="form.yy_subsidyStandards"
    v-show-field="['yy_subsidyStandards', includeFields]"
    label="补贴标准(元/月)"
    name="yy_subsidyStandards"
    :rules="computedRules.yy_subsidyStandards"
  />

  <div v-if="!isNil(form.yy_dailyWorkId)">
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

    <DateSelect
      v-model="form.yy_registrationCompanyDate"
      v-show-field="['yy_registrationCompanyDate', includeFields]"
      name="yy_registrationCompanyDate"
      label="注册到公司日期"
    />

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
  </div>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { getDailyWorkByRelateConditionsBo } from '@/api/oa/daily/fee'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useUserStore } from '@/store/user'
import { getUserInfo } from '@/api/oa/personnel/user'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['yy_type', 'yy_name', 'yy_certificateStatus', 'yy_speciality', 'yy_no', 'yy_issuanceDate', 'yy_recheckDate', 'yy_startDate', 'yy_endDate', 'yy_unit', 'yy_isTraining', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const dailyWorkData = ref([])

const user = useUserStore()

async function getList() {
// 公司人员资格证书注册申请流程走完之后才可以申请补贴，传的编码是公司人员资格证书注册申请流程的编码
  const params = {
    no: 'RSGSRYZGZSZCSQ',
    userId: user.info.userId,
    status: '2',
  }
  const res = await getDailyWorkByRelateConditionsBo(params)
  dailyWorkData.value = res.data.map((e) => {
    const content = JSON.parse(e.contentJson)
    return {
      ...e,
      content,
      value: e.id,
      label: `${content.y_name} - ${content.y_no}`,
    }
  })
}

function onChange(value: string) {
  const obj = dailyWorkData.value.find(e => e.id === value)
  if (obj) {
    form.value.yy_dailyWorkId = obj.id
    form.value.yy_type = obj.content?.y_type
    form.value.yy_name = obj.content?.y_name
    form.value.yy_certificateStatus = obj.content?.y_certificateStatus
    form.value.yy_speciality = obj.content?.y_speciality
    form.value.yy_no = obj.content?.y_no
    form.value.yy_issuanceDate = obj.content?.y_issuanceDate
    form.value.yy_recheckDate = obj.content?.y_recheckDate
    form.value.yy_startDate = obj.content?.y_startDate
    form.value.yy_endDate = obj.content?.y_endDate
    form.value.yy_isTraining = obj.content?.y_isTraining
    form.value.yy_unit = obj.content?.y_unit
    form.value.yy_certificateLevel = obj.content?.y_certificateLevel
    form.value.yy_otherCompanyUseStatus = obj.content?.y_otherCompanyUseStatus
    form.value.yy_registrationCompanyDate = obj.updateTime
    form.value.ossIdList = obj.ossIdList
    // detailForm.value.id = obj.id;
  }
}

async function getUser() {
  const { data } = await getUserInfo(user.info.userId)
  form.value.yy_entryCompanyDate = data.entryCompanyDate
}

onMounted(async () => {
  await getList()
  await getUser()
})
</script>
