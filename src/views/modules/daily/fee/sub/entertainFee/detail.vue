<template>
  <FeeBaseDetail :include-fields="includeFields1" />

  <van-field v-show-field="['isAdministration', includeFields]" label="行政部协助" name="isAdministration" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.isAdministration" readonly />
    </template>
  </van-field>

  <van-field v-model="form.a_entertainObject" v-show-field="['a_entertainObject', includeFields]" label="招待对象" name="a_entertainObject" input-align="left" />

  <van-field v-model="form.a_entertainCompany" v-show-field="['a_entertainCompany', includeFields]" label="招待单位" name="a_entertainCompany" input-align="left" />

  <van-field v-model="form.a_customerNumber" v-show-field="['a_customerNumber', includeFields]" label="客户人数" name="a_customerNumber" input-align="left" />

  <van-field v-model="form.a_accompanyNumber" v-show-field="['a_accompanyNumber', includeFields]" label="陪同人数" name="a_accompanyNumber" input-align="left" />

  <van-field v-model="form.a_entertainForm" v-show-field="['a_entertainForm', includeFields]" label="招待形式" name="a_entertainForm" input-align="left" />

  <van-field v-show-field="['a_entertainDate', includeFields]" label="招待日期" name="a_entertainDate" input-align="left">
    <template #input>
      {{ parseTime(form.a_entertainDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['a_entertainAddress', includeFields]" label="招待地点" name="a_entertainAddress" input-align="left">
    <template #input>
      <TextareaView :value="form.a_entertainAddress" />
    </template>
  </van-field>

  <van-field v-model="form.a_entertainReason" v-show-field="['a_entertainReason', includeFields]" label="招待事由" name="a_entertainReason" input-align="left">
    <template #input>
      <TextareaView :value="form.a_entertainAddress" />
    </template>
  </van-field>

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
