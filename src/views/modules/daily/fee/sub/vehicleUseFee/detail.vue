<template>
  <FeeBaseDetail :include-fields="includeFields1" />
  <!-- <van-field v-model="form.b_contractNo" v-show-field="['b_contractNo', includeFields]" label="合同编号" name="b_contractNo" input-align="left" /> -->

  <!-- 公共 -->
  <van-field v-model="form.b_vehicleNo" v-show-field="['b_vehicleNo', includeFields]" label="车牌号" name="b_vehicleNo" input-align="left" />

  <!-- 保养维修 -->
  <van-field v-model="form.b_vehicleModel" v-show-field="['b_vehicleModel', includeFields]" label="车型" name="b_vehicleModel" input-align="left" />

  <van-field v-model="form.b_vehicleMileageToday" v-show-field="['b_vehicleMileageToday', includeFields]" label="今行车里程（公里）" name="c_invoiceType" input-align="left" />

  <van-field v-model="form.b_lastRepairDate" v-show-field="['b_lastRepairDate', includeFields]" label="上次维修日期" name="b_lastRepairDate" input-align="left">
    <template #input>
      {{ parseTime(form.b_lastRepairDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.b_maintenanceIntervalMileage" v-show-field="['b_maintenanceIntervalMileage', includeFields]" label="保养间隔里程数（公里）" name="b_maintenanceIntervalMileage" input-align="left" />

  <van-field v-model="form.b_type" v-show-field="['b_type', includeFields]" label="申请类型" name="b_type" input-align="left" />

  <van-field v-show-field="['b_maintenanceAddress', includeFields]" label="车辆维修/保养地点" name="b_maintenanceAddress" input-align="left">
    <template #input>
      <TextareaView :value="form.b_maintenanceAddress" />
    </template>
  </van-field>

  <van-field v-show-field="['b_problemDescription', includeFields]" label="问题描述" name="b_problemDescription" input-align="left">
    <template #input>
      <TextareaView :value="form.b_problemDescription" />
    </template>
  </van-field>

  <van-field v-show-field="['b_maintenanceItemsAndUnitPrice', includeFields]" label="维修/保养项目及单价" name="b_maintenanceItemsAndUnitPrice" input-align="left">
    <template #input>
      <TextareaView :value="form.b_maintenanceItemsAndUnitPrice" />
    </template>
  </van-field>

  <!-- <van-field v-model="form.b_invoiceType" v-show-field="['b_invoiceType', includeFields]" label="发票类型" name="b_invoiceType" input-align="left" />

  <van-field v-model="form.b_paymentMethod" v-show-field="['b_paymentMethod', includeFields]" label="付款方式" name="b_paymentMethod" input-align="left" /> -->

  <van-field v-show-field="['b_isPlugSmartDrivingBox', includeFields]" label="本次维保是否需拔插智驾盒子" name="b_isPlugSmartDrivingBox" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.b_isPlugSmartDrivingBox" readonly />
    </template>
  </van-field>

  <!-- 零星加油费 -->
  <van-field v-model="form.b_useTime" v-show-field="['b_useTime', includeFields]" label="使用时间" name="b_useTime" input-align="left">
    <template #input>
      {{ parseTime(form.b_useTime, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['b_oilContent', includeFields]" label="用油内容" name="b_oilContent" input-align="left">
    <template #input>
      <TextareaView :value="form.b_oilContent" />
    </template>
  </van-field>

  <van-field v-model="form.b_useMethod" v-show-field="['b_useMethod', includeFields]" label="使用方式" name="b_useMethod" input-align="left" />

  <van-field v-show-field="['b_useReason', includeFields]" label="使用事由" name="b_useReason" input-align="left">
    <template #input>
      <TextareaView :value="form.b_useReason" />
    </template>
  </van-field>

  <!-- 年审费用 -->
  <van-field v-show-field="['b_annualReviewExpirationDate', includeFields]" label="年审到期时间" name="b_annualReviewExpirationDate" input-align="left">
    <template #input>
      {{ parseTime(form.b_annualReviewExpirationDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['b_verificationDate', includeFields]" label="审验日期" name="b_verificationDate" input-align="left">
    <template #input>
      {{ parseTime(form.b_verificationDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.b_annualReviewMethod" v-show-field="['b_annualReviewMethod', includeFields]" label="年审方式" name="b_annualReviewMethod" input-align="left" />

  <!-- 公司车辆保险费 -->
  <van-field v-show-field="['b_lastStrongInsuranceExpirationDate', includeFields]" label="年审到期时间" name="b_lastStrongInsuranceExpirationDate" input-align="left">
    <template #input>
      {{ parseTime(form.b_lastStrongInsuranceExpirationDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['b_lastCommercialInsuranceExpirationDate', includeFields]" label="审验日期" name="b_lastCommercialInsuranceExpirationDate" input-align="left">
    <template #input>
      {{ parseTime(form.b_lastCommercialInsuranceExpirationDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-model="form.b_strongInsuranceAmount" v-show-field="['b_strongInsuranceAmount', includeFields]" label="本次交强险金额" name="b_strongInsuranceAmount" input-align="left" />

  <van-field v-model="form.b_commercialInsuranceAmount" v-show-field="['b_commercialInsuranceAmount', includeFields]" label="本次商业险金额" name="b_commercialInsuranceAmount" input-align="left" />

  <van-field v-model="form.b_totalAmount" v-show-field="['b_totalAmount', includeFields]" label="总计金额" name="b_totalAmount" input-align="left" />

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
    includeFields: () => ['subjectType', 'deptId', 'psId', 'contractNo', 'itemList', 'amount', 'b_contractNo', 'b_vehicleNo', 'b_vehicleModel', 'b_vehicleMileageToday', 'b_lastRepairDate', 'b_maintenanceIntervalMileage', 'b_type', 'b_maintenanceAddress', 'b_problemDescription', 'b_maintenanceItemsAndUnitPrice', 'b_invoiceType', 'b_paymentMethod', 'b_isPlugSmartDrivingBox', 'b_useTime', 'b_useReason', 'b_oilContent', 'b_useMethod', 'b_annualReviewExpirationDate', 'b_verificationDate', 'b_annualReviewMethod', 'b_lastStrongInsuranceExpirationDate', 'b_lastCommercialInsuranceExpirationDate', 'b_strongInsuranceAmount', 'b_commercialInsuranceAmount', 'b_totalAmount', 'reason', 'receiptInfo', 'ossIdList'],
  },
)

const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
