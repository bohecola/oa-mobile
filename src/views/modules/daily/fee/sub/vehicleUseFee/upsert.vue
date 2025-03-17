<template>
  <FeeBaseUpsert :include-fields="includeFields1" />
  <!-- <van-field v-model="form.b_contractNo" v-show-field="['b_contractNo', includeFields]" label="合同编号" name="b_contractNo" :rules="computedRules.d_articleName" /> -->

  <!-- 公共 -->
  <van-field
    v-model.trim="form.b_vehicleNo"
    v-show-field="['b_vehicleNo', includeFields]"
    label="车牌号"
    placeholder="请输入"
    name="b_vehicleNo"
    :rules="computedRules.b_vehicleNo"
  />

  <!-- 保养维修 -->
  <van-field
    v-model.trim="form.b_vehicleModel"
    v-show-field="['b_vehicleModel', includeFields]"
    label="车型"
    placeholder="请输入"
    name="b_vehicleModel"
    :rules="computedRules.b_vehicleModel"
  />

  <van-field
    v-model.trim="form.b_vehicleMileageToday"
    v-show-field="['b_vehicleMileageToday', includeFields]"
    label="今行车里程（公里）"
    placeholder="请输入"
    name="c_invoiceType"
    :rules="computedRules.c_invoiceType"
  />

  <DatePicker
    v-model="form.b_lastRepairDate"
    v-show-field="['b_lastRepairDate', includeFields]"
    name="b_lastRepairDate"
    label="上次维修日期"
    :rules="computedRules.b_lastRepairDate"
  />

  <van-field
    v-model.trim="form.b_maintenanceIntervalMileage"
    v-show-field="['b_maintenanceIntervalMileage', includeFields]"
    label="保养间隔里程数（公里）"
    placeholder="请输入"
    name="b_maintenanceIntervalMileage"
    :rules="computedRules.d_articleName"
  />

  <van-field
    v-model.trim="form.b_type"
    v-show-field="['b_type', includeFields]"
    label="申请类型"
    placeholder="请输入"
    name="b_type"
    :rules="computedRules.d_articleName"
  />

  <van-field
    v-show-field="['b_maintenanceAddress', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="车辆维修/保养地点"
    name="b_maintenanceAddress"
    :rules="computedRules.d_articleName"
  />

  <van-field
    v-show-field="['b_problemDescription', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="问题描述"
    name="b_problemDescription"
    :rules="computedRules.d_articleName"
  />

  <van-field
    v-show-field="['b_maintenanceItemsAndUnitPrice', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="维修/保养项目及单价"
    name="b_maintenanceItemsAndUnitPrice"
    :rules="computedRules.d_articleName"
  />

  <!-- <van-field v-model="form.b_invoiceType" v-show-field="['b_invoiceType', includeFields]" label="发票类型" name="b_invoiceType" :rules="computedRules.d_articleName" />

    <van-field v-model="form.b_paymentMethod" v-show-field="['b_paymentMethod', includeFields]" label="付款方式" name="b_paymentMethod" :rules="computedRules.d_articleName" /> -->

  <van-field
    v-show-field="['b_isPlugSmartDrivingBox', includeFields]"
    label="本次维保是否需拔插智驾盒子"
    name="b_isPlugSmartDrivingBox"
    :rules="computedRules.d_articleName"
  >
    <template #input>
      <YesNoSwitch v-model="form.b_isPlugSmartDrivingBox" />
    </template>
  </van-field>

  <!-- 零星加油费 -->
  <DatePicker
    v-model="form.b_useTime"
    v-show-field="['b_useTime', includeFields]"
    name="b_useTime"
    label="使用时间"
    :rules="computedRules.b_useTime"
  />

  <van-field
    v-show-field="['b_oilContent', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="用油内容"
    placeholder="请输入"
    name="b_oilContent"
    :rules="computedRules.d_articleName"
  />

  <van-field
    v-model.trim="form.b_useMethod"
    v-show-field="['b_useMethod', includeFields]"
    label="使用方式"
    placeholder="请输入"
    name="b_useMethod"
    :rules="computedRules.d_articleName"
  />

  <van-field
    v-show-field="['b_useReason', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="使用事由"
    name="b_useReason"
    :rules="computedRules.d_articleName"
  />

  <!-- 年审费用 -->
  <DatePicker
    v-model="form.b_annualReviewExpirationDate"
    v-show-field="['b_annualReviewExpirationDate', includeFields]"
    name="b_annualReviewExpirationDate"
    label="使用时间"
    :rules="computedRules.b_annualReviewExpirationDate"
  />

  <DatePicker
    v-model="form.b_verificationDate"
    v-show-field="['b_verificationDate', includeFields]"
    name="b_verificationDate"
    label="审验日期"
    :rules="computedRules.b_verificationDate"
  />

  <van-field
    v-model.trim="form.b_annualReviewMethod"
    v-show-field="['b_annualReviewMethod', includeFields]"
    label="年审方式"
    placeholder="请输入"
    name="b_annualReviewMethod"
    :rules="computedRules.b_annualReviewMethod"
  />

  <!-- 公司车辆保险费 -->
  <DatePicker
    v-model="form.b_lastStrongInsuranceExpirationDate"
    v-show-field="['b_lastStrongInsuranceExpirationDate', includeFields]"
    name="b_lastStrongInsuranceExpirationDate"
    label="年审到期时间"
    :rules="computedRules.b_lastStrongInsuranceExpirationDate"
  />

  <DatePicker
    v-model="form.b_lastCommercialInsuranceExpirationDate"
    v-show-field="['b_lastCommercialInsuranceExpirationDate', includeFields]"
    name="b_lastCommercialInsuranceExpirationDate"
    label="审验日期"
    :rules="computedRules.b_lastCommercialInsuranceExpirationDate"
  />

  <van-field-number
    v-model.number="form.b_strongInsuranceAmount"
    v-show-field="['b_strongInsuranceAmount', includeFields]"
    label="本次交强险金额"
    placeholder="请输入"
    name="b_strongInsuranceAmount"
    :rules="computedRules.b_strongInsuranceAmount"
  />

  <van-field-number
    v-model.number="form.b_commercialInsuranceAmount"
    v-show-field="['b_commercialInsuranceAmount', includeFields]"
    label="本次商业险金额"
    placeholder="请输入"
    name="b_commercialInsuranceAmount"
    :rules="computedRules.b_commercialInsuranceAmount"
  />

  <van-field-number
    v-model.number="form.b_totalAmount"
    v-show-field="['b_totalAmount', includeFields]"
    label="总计金额"
    placeholder="请输入"
    name="b_totalAmount"
    :rules="computedRules.b_totalAmount"
  />

  <FeeBaseUpsert :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import FeeBaseUpsert from '../../../components/FeeBaseUpsert.vue'
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
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

const computedRules = inject<Ref<FormRules<DailyFeeForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyFeeForm>>('trackFields')
trackFields(props.includeFields)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))

// 计算总金额
function computeTotalAmount() {
  const strongAmount = form.value.b_strongInsuranceAmount
  const commercialAmount = form.value.b_commercialInsuranceAmount

  if (!isNil(strongAmount) && !isNil(commercialAmount)) {
    form.value.b_totalAmount = Number((strongAmount + commercialAmount).toFixed(2))
  }
  else {
    form.value.b_totalAmount = null
  }
}

// 监听强险金额和商业险金额的变化
watch([() => form.value.b_strongInsuranceAmount, () => form.value.b_commercialInsuranceAmount], () => {
  computeTotalAmount()
})
</script>
