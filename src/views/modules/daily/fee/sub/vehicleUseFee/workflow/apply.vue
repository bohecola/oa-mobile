<template>
  <detail v-if="isView" :include-fields="includeFieldsNo" />
  <template v-else>
    <!-- 车辆使用相关费用 -->
    <div v-if="taskDefinitionKey === 'Activity_0wh1ixm'">
      <!-- 编辑页面申请事由不显示 -->
      <!-- <upsert :include-fields="includeFieldsNo" /> -->
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail :include-fields="includeFieldsNo" />
    </div>
  </template>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

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
      'b_annualReviewMethod',
      'b_lastStrongInsuranceExpirationDate',
      'b_lastCommercialInsuranceExpirationDate',
      'b_strongInsuranceAmount',
      'b_commercialInsuranceAmount',
      'b_totalAmount',
      'reason',
      'receiptInfo',
      'ossIdList',
    ],
  },
)

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')
// 公共字段
const commonFields: KeysOfArray<DailyFeeForm> = [
  'subjectType',
  'deptId',
  'psId',
  'contractNo',
  'itemList',
  'amount',
  'reason',
  'receiptInfo',
  'ossIdList',
]

// 保养维修费用字段
const BYWXFYFields: KeysOfArray<DailyFeeForm> = [
  'b_contractNo',
  'b_vehicleNo',
  'b_vehicleModel',
  'b_vehicleMileageToday',
  'b_lastRepairDate',
  'b_maintenanceIntervalMileage',
  'b_type',
  'b_maintenanceAddress',
  'b_problemDescription',
  'b_maintenanceItemsAndUnitPrice',
  'b_invoiceType',
  'b_paymentMethod',
  'b_isPlugSmartDrivingBox',
]

// 零星加油费用(现金、油卡)字段
const LXJYFYFields = ['b_useTime', 'b_oilContent', 'b_useReason', 'b_useMethod']

// 年审费用字段
const NSFYFields = ['b_vehicleNo', 'b_annualReviewExpirationDate', 'b_verificationDate', 'b_annualReviewMethod', 'b_paymentMethod']

// 公司车辆保险费用
const GSCLBXFFields = [
  'b_vehicleNo',
  'b_lastStrongInsuranceExpirationDate',
  'b_lastCommercialInsuranceExpirationDate',
  'b_strongInsuranceAmount',
  'b_commercialInsuranceAmount',
  'b_totalAmount',
]

const form = inject<Ref<DailyFeeForm>>('form')

const includeFieldsNo = computed(() => {
  if (form.value.no === 'BYWXFY') {
    return [...commonFields, ...BYWXFYFields] as KeysOfArray<DailyFeeForm>
  }
  else if (form.value.no === 'LXJYFY') {
    return [...commonFields, ...LXJYFYFields] as KeysOfArray<DailyFeeForm>
  }
  else if (form.value.no === 'NSFY') {
    return [...commonFields, ...NSFYFields] as KeysOfArray<DailyFeeForm>
  }
  else if (form.value.no === 'GSCLBXF') {
    return [...commonFields, ...GSCLBXFFields] as KeysOfArray<DailyFeeForm>
  }
  return [...commonFields] as KeysOfArray<DailyFeeForm>
})

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()
</script>
