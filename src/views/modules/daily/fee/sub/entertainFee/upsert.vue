<template>
  <FeeBaseUpsert :include-fields="includeFields1" />

  <van-field
    v-show-field="['isAdministration', includeFields]"
    label="行政部协助"
    name="isAdministration"
    :rules="computedRules.isAdministration"
  >
    <template #input>
      <YesNoSwitch v-model="form.isAdministration" />
    </template>
  </van-field>

  <van-field
    v-model.trim="form.a_entertainObject"
    v-show-field="['a_entertainObject', includeFields]"
    label="招待对象"
    placeholder="请输入"
    name="a_entertainObject"
    :rules="computedRules.a_entertainObject"
  />

  <van-field
    v-model.trim="form.a_entertainCompany"
    v-show-field="['a_entertainCompany', includeFields]"
    label="招待单位"
    placeholder="请输入"
    name="a_entertainCompany"
    :rules="computedRules.a_entertainCompany"
  />

  <van-field-number
    v-model.number="form.a_customerNumber"
    v-show-field="['a_customerNumber', includeFields]"
    label="客户人数"
    type="digit"
    placeholder="请输入"
    name="a_customerNumber"
    :rules="computedRules.a_customerNumber"
  />

  <van-field-number
    v-model.number="form.a_accompanyNumber"
    v-show-field="['a_accompanyNumber', includeFields]"
    label="陪同人数"
    type="digit"
    placeholder="请输入"
    name="a_accompanyNumber"
    :rules="computedRules.a_accompanyNumber"
  />

  <van-field
    v-model.trim="form.a_entertainForm"
    v-show-field="['a_entertainForm', includeFields]"
    label="招待形式"
    placeholder="请输入"
    name="a_entertainForm"
    :rules="computedRules.a_entertainForm"
  />

  <DatePicker
    v-model="form.a_entertainDate"
    v-show-field="['a_entertainDate', includeFields]"
    name="a_entertainDate"
    label="招待日期"
    :rules="computedRules.a_entertainDate"
  />

  <van-field
    v-model="form.a_entertainAddress"
    v-show-field="['a_entertainAddress', includeFields]"
    type="textarea"
    rows="2"
    autosize
    label="招待地点"
    name="a_entertainAddress"
    :rules="computedRules.a_entertainAddress"
  />

  <van-field
    v-model="form.a_entertainReason"
    v-show-field="['a_entertainReason', includeFields]"
    type="textarea"
    rows="2"
    autosize
    label="招待事由"
    name="a_entertainReason"
    :rules="computedRules.a_entertainReason"
  />

  <FeeBaseUpsert :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import { trim } from 'lodash-es'
import FeeBaseUpsert from '../../../components/FeeBaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'isAdministration', 'a_entertainObject', 'a_entertainCompany', 'a_customerNumber', 'a_accompanyNumber', 'a_entertainForm', 'a_entertainDate', 'a_entertainAddress', 'a_entertainReason', 'reason', 'receiptInfo', 'ossIdList'],
  },
)

const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

const computedRules = inject<Ref<FormRules<DailyFeeForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyFeeForm>>('trackFields')
trackFields(props.includeFields)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
