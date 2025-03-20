<template>
  <FeeBaseDetail :include-fields="includeFields1" />

  <van-field
    v-show-field="['isAdministration', includeFields]"
    label="行政部协助"
    name="isAdministration"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.isAdministration"
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-model="form.a_entertainObject"
    v-show-field="['a_entertainObject', includeFields]"
    label="招待对象"
    name="a_entertainObject"
  />

  <van-field
    v-model="form.a_entertainCompany"
    v-show-field="['a_entertainCompany', includeFields]"
    label="招待单位"
    name="a_entertainCompany"
  />

  <van-field-number
    v-model="form.a_customerNumber"
    v-show-field="['a_customerNumber', includeFields]"
    label="客户人数"
    name="a_customerNumber"
  />

  <van-field-number
    v-model="form.a_accompanyNumber"
    v-show-field="['a_accompanyNumber', includeFields]"
    label="陪同人数"
    name="a_accompanyNumber"
  />

  <van-field
    v-model="form.a_entertainForm"
    v-show-field="['a_entertainForm', includeFields]"
    label="招待形式"
    name="a_entertainForm"
  />

  <DateSelect
    v-model="form.a_entertainDate"
    v-show-field="['a_entertainDate', includeFields]"
    name="a_entertainDate"
    label="招待日期"
  />

  <van-field
    v-model="form.a_entertainAddress"
    v-show-field="['a_entertainAddress', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="招待地点"
    name="a_entertainAddress"
  />

  <van-field
    v-model="form.a_entertainReason"
    v-show-field="['a_entertainReason', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="招待事由"
    name="a_entertainReason"
  />

  <FeeBaseDetail :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
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
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
