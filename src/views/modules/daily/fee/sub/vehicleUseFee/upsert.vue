<template>
  <FeeBaseUpsert :include-fields="includeFields1" />

  <!-- 保养维修 -->
  <DictSelect
    v-model.trim="form.b_type"
    v-show-field="['b_type', includeFields]"
    label="申请类型"
    name="b_type"
    dict-type="oa_car_repair_maintenance_type"
    :rules="computedRules.b_type"
    clearable
  />

  <!-- 公共 -->
  <DictSelect
    v-if="form.no !== 'BYWXFY' || (form.no === 'BYWXFY' && !isNil(form.b_type))"
    v-model.trim="form.b_vehicleNo"
    v-show-field="['b_vehicleNo', includeFields]"
    label="车牌号"
    name="b_vehicleNo"
    clearable
    :rules="computedRules.b_vehicleNo"
    :options="carNumberOptions"
    @change="onCarNumberChange"
    @update:items="onCarNumberItemsChange"
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
    v-show-field="['b_lastRepairDate', includeFields]"
    :model-value="parseTime(form.b_lastRepairDate, '{y}-{m}-{d}')"
    label="上次保养/维修日期"
    placeholder="选择车牌号后自动填充（没有填充则无相关数据）"
    name="b_lastRepairDate"
    readonly
  />

  <van-field-number
    v-model.number="form.b_vehicleMileageToday"
    v-show-field="['b_vehicleMileageToday', includeFields]"
    label="今行车里程（公里）"
    placeholder="请输入"
    name="b_vehicleMileageToday"
    :rules="computedRules.b_vehicleMileageToday"
    @change="onVehicleMileageTodayChange"
  />

  <template v-if="['1', '3'].includes(form.b_type)">
    <van-field-number
      v-show-field="['b_upMileage', includeFields]"
      :model-value="form.b_upMileage"
      label="上次里程数（公里）"
      name="b_upMileage"
      placeholder="选择车牌号后自动填充（没有填充则无相关数据）"
      readonly
    />

    <van-field-number
      v-show-field="['b_maintenanceIntervalMileage', includeFields]"
      :model-value="form.b_maintenanceIntervalMileage"
      label="保养间隔里程数（公里）"
      name="b_maintenanceIntervalMileage"
      placeholder="自动计算"
      disabled
    />
  </template>

  <van-field
    v-model="form.b_maintenanceAddress"
    v-show-field="['b_maintenanceAddress', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="车辆维修/保养地点"
    placeholder="请输入"
    name="b_maintenanceAddress"
    :rules="computedRules.b_maintenanceAddress"
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
    :rules="computedRules.b_problemDescription"
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
    :rules="computedRules.b_maintenanceItemsAndUnitPrice"
  />

  <van-field
    v-show-field="['b_isPlugSmartDrivingBox', includeFields]"
    label="本次维保是否需拔插智驾盒子"
    name="b_isPlugSmartDrivingBox"
    :rules="computedRules.b_isPlugSmartDrivingBox"
  >
    <template #input>
      <YesNoSwitch v-model="form.b_isPlugSmartDrivingBox" />
    </template>
  </van-field>

  <!-- 零星加油费 -->
  <DateSelect
    v-model="form.b_useTime"
    v-show-field="['b_useTime', includeFields]"
    name="b_useTime"
    label="使用时间"
    :rules="computedRules.b_useTime"
  />

  <van-field
    v-model="form.b_oilContent"
    v-show-field="['b_oilContent', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="用油内容"
    placeholder="请输入车辆使用（预计行驶里程）、其他使用（除草机、发电机等）"
    name="b_oilContent"
    :rules="computedRules.b_oilContent"
  />

  <van-field
    v-model.trim="form.b_useMethod"
    v-show-field="['b_useMethod', includeFields]"
    label="使用方式"
    placeholder="请输入油卡充值（油卡卡号）、借款报销"
    name="b_useMethod"
    :rules="computedRules.b_useMethod"
  />

  <!-- 年审费用 -->
  <van-field
    v-show-field="['b_lastVerificationDate', includeFields]"
    :model-value="parseTime(form.b_lastVerificationDate, '{y}-{m}-{d}')"
    label="上次审验日期"
    name="b_lastVerificationDate"
    placeholder="选择车牌号后自动填充（没有填充则无相关数据）"
    readonly
  />

  <van-field
    v-show-field="['b_lastAnnualReviewExpirationDate', includeFields]"
    :model-value="parseTime(form.b_lastAnnualReviewExpirationDate, '{y}-{m}-{d}')"
    label="上次到期日期"
    name="b_lastAnnualReviewExpirationDate"
    placeholder="选择车牌号后自动填充（没有填充则无相关数据）"
    readonly
  />

  <DateSelect
    v-model="form.b_verificationDate"
    v-show-field="['b_verificationDate', includeFields]"
    name="b_verificationDate"
    label="审验日期"
    :rules="computedRules.b_verificationDate"
  />

  <DateSelect
    v-model="form.b_annualReviewExpirationDate"
    v-show-field="['b_annualReviewExpirationDate', includeFields]"
    name="b_annualReviewExpirationDate"
    label="到期日期"
    :rules="computedRules.b_annualReviewExpirationDate"
  />

  <DictSelect
    v-model.trim="form.b_annualReviewMethod"
    v-show-field="['b_annualReviewMethod', includeFields]"
    label="年审方式"
    name="b_annualReviewMethod"
    dict-type="oa_car_annual_inspection_method"
    :rules="computedRules.b_annualReviewMethod"
  />

  <!-- 公司车辆保险费 -->
  <van-field
    v-model.trim="form.b_insuranceCompany"
    v-show-field="['b_insuranceCompany', includeFields]"
    label="保险公司"
    placeholder="请输入"
    name="b_insuranceCompany"
    :rules="computedRules.b_insuranceCompany"
  />

  <van-field-number
    v-model.number="form.b_strongInsuranceAmount"
    v-show-field="['b_strongInsuranceAmount', includeFields]"
    label="本次交强险金额"
    name="b_strongInsuranceAmount"
    :rules="computedRules.b_strongInsuranceAmount"
  />

  <van-field
    v-show-field="['b_lastStrongInsuranceExpirationDate', includeFields]"
    :model-value="parseTime(form.b_lastStrongInsuranceExpirationDate, '{y}-{m}-{d}')"
    name="b_lastStrongInsuranceExpirationDate"
    label="上期交强险到期日期"
    placeholder="选择车牌号后自动填充（没有填充则无相关数据）"
    readonly
  />

  <DateSelect
    v-model="form.b_compulsoryInsuranceDate"
    v-show-field="['b_compulsoryInsuranceDate', includeFields]"
    name="b_compulsoryInsuranceDate"
    label="本次交强险购买日期"
    :rules="computedRules.b_compulsoryInsuranceDate"
  />

  <DateSelect
    v-model="form.b_compulsoryInsuranceExpirationDate"
    v-show-field="['b_compulsoryInsuranceExpirationDate', includeFields]"
    name="b_compulsoryInsuranceExpirationDate"
    label="本次交强险到期日期"
    :rules="computedRules.b_compulsoryInsuranceExpirationDate"
  />

  <van-field-number
    v-model.number="form.b_commercialInsuranceAmount"
    v-show-field="['b_commercialInsuranceAmount', includeFields]"
    label="本次商业险金额"
    name="b_commercialInsuranceAmount"
    :rules="computedRules.b_commercialInsuranceAmount"
  />

  <van-field
    v-show-field="['b_lastCommercialInsuranceExpirationDate', includeFields]"
    :model-value="parseTime(form.b_lastCommercialInsuranceExpirationDate, '{y}-{m}-{d}')"
    name="b_lastCommercialInsuranceExpirationDate"
    label="上期商业险到期日期"
    placeholder="选择车牌号后自动填充（没有填充则无相关数据）"
    :rules="computedRules.b_lastCommercialInsuranceExpirationDate"
    readonly
  />

  <DateSelect
    v-model="form.b_commercialInsuranceDate"
    v-show-field="['b_commercialInsuranceDate', includeFields]"
    name="b_commercialInsuranceDate"
    label="本次商业险购买日期"
    :rules="computedRules.b_commercialInsuranceDate"
  />

  <DateSelect
    v-model="form.b_commercialInsuranceExpirationDate"
    v-show-field="['b_commercialInsuranceExpirationDate', includeFields]"
    name="b_commercialInsuranceExpirationDate"
    label="本次商业险到期日期"
    :rules="computedRules.b_commercialInsuranceExpirationDate"
  />

  <FeeBaseUpsert :include-fields="includeFields2" />
</template>

<script setup lang="ts">
import Big from 'big.js'
import { isNil } from 'lodash-es'
import FeeBaseUpsert from '../../../components/FeeBaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { isNumeric } from '@/utils'
import { useCarNumberOptions } from '@/hooks'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { getLastInsuranceByCarNumber } from '@/api/oa/car/carInsurance'
import { getLastRepairMaintenanceByCarNumber } from '@/api/oa/car/carRepairMaintenance'
import { getLastAnnualInspectionByCarNumber } from '@/api/oa/car/carAnnualInspection'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
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
      'b_compulsoryInsuranceDate',
      'b_compulsoryInsuranceExpirationDate',
      'b_commercialInsuranceDate',
      'b_commercialInsuranceExpirationDate',
      'b_totalAmount',
      'b_insuranceCompany',
      'reason',
      'receiptInfo',
      'ossIdList',
    ],
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

const { options: carNumberOptions, fetch: fetchCarNumberOptions } = useCarNumberOptions({ initFetch: false })

function resetState() {
  form.value.b_lastStrongInsuranceExpirationDate = undefined
  form.value.b_lastCommercialInsuranceExpirationDate = undefined
  form.value.b_vehicleModel = undefined
  form.value.b_lastRepairDate = undefined
  form.value.b_upMileage = undefined
  form.value.b_upMileage = undefined
  form.value.b_lastAnnualReviewExpirationDate = undefined
  form.value.b_lastVerificationDate = undefined
}

// 车牌号修改
async function onCarNumberChange(carNumber: string) {
  resetState()

  if (!isNil(carNumber)) {
    // 公司车辆保险费
    if (form.value.no === 'GSCLBXF') {
      const { data } = await getLastInsuranceByCarNumber(carNumber)
      form.value.b_lastCommercialInsuranceExpirationDate = data?.commercialInsuranceExpirationDate
      form.value.b_lastStrongInsuranceExpirationDate = data?.compulsoryInsuranceExpirationDate
    }

    // 保养维修费用
    if (form.value.no === 'BYWXFY') {
      const { data } = await getLastRepairMaintenanceByCarNumber(carNumber, form.value.b_type)
      form.value.b_lastRepairDate = data?.createTime
      form.value.b_upMileage = data?.mileage

      // 计算间隔里程数
      computeIntervalMileage()
    }

    // 年审费用
    if (form.value.no === 'NSFY') {
      const { data } = await getLastAnnualInspectionByCarNumber(carNumber)

      form.value.b_lastAnnualReviewExpirationDate = data?.expirationDate
      form.value.b_lastVerificationDate = data?.inspectionDate
    }
  }
}

// 车牌号 items 修改
function onCarNumberItemsChange(items: DictDataOption[]) {
  const [car] = items

  // 保养维修费用
  if (form.value.no === 'BYWXFY') {
    form.value.b_vehicleModel = car?.brandModel
  }
}

// 今行车里程数修改
function onVehicleMileageTodayChange(_: number) {
  computeIntervalMileage()
}

// 计算间隔里程数
function computeIntervalMileage() {
  if (isNil(form.value.b_vehicleMileageToday)) {
    form.value.b_maintenanceIntervalMileage = undefined
    return
  }

  form.value.b_maintenanceIntervalMileage = Big(form.value.b_vehicleMileageToday)
    .minus(form.value.b_upMileage ?? 0)
    .toNumber()
}

// 监听强险金额和商业险金额的变化 => 计算总金额
watch([() => form.value.b_strongInsuranceAmount, () => form.value.b_commercialInsuranceAmount], (val) => {
  const totalAmount = val
    ?.reduce<Big>((acc, curr) => {
      if (isNumeric(curr)) {
        return acc.add(curr)
      }

      return acc.add(0)
    }, Big(0))
    .toNumber()

  form.value.b_totalAmount = totalAmount
})

onMounted(() => {
  if (!isNil(form.value.deptId)) {
    fetchCarNumberOptions({ deptId: form.value.deptId })
  }
})
</script>
