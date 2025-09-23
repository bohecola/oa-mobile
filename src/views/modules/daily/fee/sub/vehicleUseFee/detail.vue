<template>
  <FeeBaseDetail :include-fields="includeFields1" :form-value="form" />

  <!-- 保养维修 -->
  <DictSelect
    v-model.trim="form.b_type"
    v-show-field="['b_type', includeFields]"
    label="申请类型"
    name="b_type"
    dict-type="oa_car_repair_maintenance_type"
  />

  <!-- 公共 -->
  <van-field
    v-model="form.b_vehicleNo"
    v-show-field="['b_vehicleNo', includeFields]"
    label="车牌号"
    name="b_vehicleNo"
    :right-icon="form.no === 'BYWXFY' && showViewBtn ? 'eye-o' : ''"
    @click-right-icon="ListPopupRef?.openListPopup"
  >
    <template #right-icon>
      <span v-if="showViewBtn" class="text-blue-600">查看</span>
    </template>
  </van-field>

  <!-- 保养维修 -->
  <van-field
    v-model="form.b_vehicleModel"
    v-show-field="['b_vehicleModel', includeFields]"
    label="车型"
    name="b_vehicleModel"
  />

  <van-field
    v-show-field="['b_lastRepairDate', includeFields]"
    :model-value="parseTime(form.b_lastRepairDate, '{y}-{m}-{d}')"
    label="上次维修日期"
    name="b_lastRepairDate"
  />

  <van-field-number
    v-model="form.b_vehicleMileageToday"
    v-show-field="['b_vehicleMileageToday', includeFields]"
    label="今行车里程（公里）"
    name="b_vehicleMileageToday"
  />

  <template v-if="['1', '3'].includes(form.b_type)">
    <van-field-number
      v-show-field="['b_upMileage', includeFields]"
      :model-value="form.b_upMileage"
      label="上次里程数（公里）"
      name="b_upMileage"
    />

    <van-field
      v-model="form.b_maintenanceIntervalMileage"
      v-show-field="['b_maintenanceIntervalMileage', includeFields]"
      label="保养间隔里程数（公里）"
      name="b_maintenanceIntervalMileage"
    />
  </template>

  <van-field
    v-model="form.b_maintenanceAddress"
    v-show-field="['b_maintenanceAddress', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="车辆维修/保养地点"
    name="b_maintenanceAddress"
  />

  <van-field
    v-model="form.b_problemDescription"
    v-show-field="['b_problemDescription', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="问题描述"
    placeholder="请输入"
    name="b_problemDescription"
  />

  <van-field
    v-model="form.b_maintenanceItemsAndUnitPrice"
    v-show-field="['b_maintenanceItemsAndUnitPrice', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="维修/保养项目及单价"
    placeholder="请输入"
    name="b_maintenanceItemsAndUnitPrice"
  />

  <van-field
    v-show-field="['b_isPlugSmartDrivingBox', includeFields]"
    label="本次维保是否需拔插智驾盒子"
    name="b_isPlugSmartDrivingBox"
  >
    <template #input>
      <YesNoSwitch v-model="form.b_isPlugSmartDrivingBox" readonly />
    </template>
  </van-field>

  <!-- 零星加油费 -->
  <DateSelect
    v-model="form.b_useTime"
    v-show-field="['b_useTime', includeFields]"
    name="b_useTime"
    label="使用时间"
  />

  <van-field
    v-show-field="['b_oilContent', includeFields]"
    label="用油内容"
    name="b_oilContent"
  >
    <template #input>
      <TextareaView :value="form.b_oilContent" />
    </template>
  </van-field>

  <van-field
    v-model="form.b_useMethod"
    v-show-field="['b_useMethod', includeFields]"
    label="使用方式"
    name="b_useMethod"
  />

  <!-- 年审费用 -->
  <van-field
    v-show-field="['b_lastVerificationDate', includeFields]"
    :model-value="parseTime(form.b_lastVerificationDate, '{y}-{m}-{d}')"
    label="上次审验日期"
    name="b_lastVerificationDate"
  />

  <van-field
    v-show-field="['b_lastAnnualReviewExpirationDate', includeFields]"
    :model-value="parseTime(form.b_lastAnnualReviewExpirationDate, '{y}-{m}-{d}')"
    label="上次到期日期"
    name="b_lastAnnualReviewExpirationDate"
  />

  <DateSelect
    v-model="form.b_verificationDate"
    v-show-field="['b_verificationDate', includeFields]"
    name="b_verificationDate"
    label="审验日期"
  />

  <DateSelect
    v-model="form.b_annualReviewExpirationDate"
    v-show-field="['b_annualReviewExpirationDate', includeFields]"
    name="b_annualReviewExpirationDate"
    label="到期日期"
  />

  <DictSelect
    v-model="form.b_annualReviewMethod"
    v-show-field="['b_annualReviewMethod', includeFields]"
    label="年审方式"
    name="b_annualReviewMethod"
    dict-type="oa_car_annual_inspection_method"
  />

  <!-- 公司车辆保险费 -->
  <van-field
    v-model="form.b_insuranceCompany"
    v-show-field="['b_insuranceCompany', includeFields]"
    label="保险公司"
    name="b_insuranceCompany"
  />

  <van-field-number
    v-model="form.b_strongInsuranceAmount"
    v-show-field="['b_strongInsuranceAmount', includeFields]"
    label="本次交强险金额"
    name="b_strongInsuranceAmount"
  />

  <van-field
    v-show-field="['b_lastStrongInsuranceExpirationDate', includeFields]"
    :model-value="parseTime(form.b_lastStrongInsuranceExpirationDate, '{y}-{m}-{d}')"
    label="上期交强险到期日期"
    name="b_lastStrongInsuranceExpirationDate"
  />

  <van-field
    v-show-field="['b_compulsoryInsuranceDate', includeFields]"
    :model-value="parseTime(form.b_compulsoryInsuranceDate, '{y}-{m}-{d}')"
    name="b_compulsoryInsuranceDate"
    label="本次交强险购买日期"
  />

  <van-field
    v-show-field="['b_compulsoryInsuranceExpirationDate', includeFields]"
    :model-value="parseTime(form.b_compulsoryInsuranceExpirationDate, '{y}-{m}-{d}')"
    name="b_compulsoryInsuranceExpirationDate"
    label="本次交强险到期日期"
  />

  <van-field-number
    v-model="form.b_commercialInsuranceAmount"
    v-show-field="['b_commercialInsuranceAmount', includeFields]"
    label="本次商业险金额"
    name="b_commercialInsuranceAmount"
  />

  <van-field
    v-show-field="['b_lastCommercialInsuranceExpirationDate', includeFields]"
    :model-value="parseTime(form.b_lastCommercialInsuranceExpirationDate, '{y}-{m}-{d}')"
    name="b_lastCommercialInsuranceExpirationDate"
    label="上期商业险到期日期"
  />

  <van-field
    v-show-field="['b_commercialInsuranceDate', includeFields]"
    :model-value="parseTime(form.b_commercialInsuranceDate, '{y}-{m}-{d}')"
    name="b_commercialInsuranceDate"
    label="本次商业险购买日期"
  />

  <van-field
    v-show-field="['b_commercialInsuranceExpirationDate', includeFields]"
    :model-value="parseTime(form.b_commercialInsuranceExpirationDate, '{y}-{m}-{d}')"
    name="b_commercialInsuranceExpirationDate"
    label="本次商业险到期日期"
  />

  <FeeBaseDetail :include-fields="includeFields2" :form-value="form" />

  <ListPopup ref="ListPopupRef" :form-value="form" />
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import ListPopup from './listPopup.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
    showViewBtn?: boolean
    vehicleDetail?: DailyFeeForm
  }>(),
  {
    showViewBtn: true,
    includeFields: () => [
      'subjectType',
      'deptId',
      'psId',
      'contractNo',
      'itemList',
      'amount',
      'b_contractNo',
      'b_vehicleNo',
      'b_vehicleModel',
      'b_vehicleMileageToday',
      'b_lastRepairDate',
      'b_maintenanceIntervalMileage',
      'b_upMileage',
      'b_type',
      'b_maintenanceAddress',
      'b_problemDescription',
      'b_maintenanceItemsAndUnitPrice',
      'b_invoiceType',
      'b_paymentMethod',
      'b_isPlugSmartDrivingBox',
      'b_useTime',
      'b_useReason',
      'b_oilContent',
      'b_useMethod',
      'b_annualReviewExpirationDate',
      'b_verificationDate',
      'b_lastAnnualReviewExpirationDate',
      'b_lastVerificationDate',
      'b_annualReviewMethod',
      'b_lastStrongInsuranceExpirationDate',
      'b_lastCommercialInsuranceExpirationDate',
      'b_strongInsuranceAmount',
      'b_commercialInsuranceAmount',
      'b_insuranceCompany',
      'b_compulsoryInsuranceDate',
      'b_compulsoryInsuranceExpirationDate',
      'b_commercialInsuranceDate',
      'b_commercialInsuranceExpirationDate',
      'b_totalAmount',
      'reason',
      'receiptInfo',
      'ossIdList',
    ],
  },
)

const ListPopupRef = ref<InstanceType<typeof ListPopup>>()

const injectForm = inject<Ref<DailyFeeForm>>('form')

const form = computed(() => {
  if (!isEmpty(props.vehicleDetail)) {
    return props.vehicleDetail as DailyFeeForm
  }

  return injectForm.value
})

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)

const includeFields1 = computed(() => props.includeFields.filter(e => !['reason', 'receiptInfo', 'ossIdList'].includes(e)))
const includeFields2 = computed(() => props.includeFields.filter(e => ['reason', 'receiptInfo', 'ossIdList'].includes(e)))
</script>
