<template>
  <van-cell-group :border="false" inset>
    <template #title>
      <div>发票信息</div>
    </template>

    <van-field
      v-model.trim="form.receiptInfo.entityName"
      name="receiptInfo.entityName"
      label="单位或个人名称"
      placeholder="请输入"
    />

    <DictSelect
      v-model="form.receiptInfo.invoiceType"
      dict-type="oa_contract_invoice_type"
      name="receiptInfo.invoiceType"
      label="发票类型"
      :readonly="readonly"
      clearable
    />

    <DictSelect
      v-model="form.receiptInfo.taxRate"
      dict-type="oa_contract_tax_rate"
      name="receiptInfo.taxRate"
      label="税率（%）"
      :readonly="readonly"
      clearable
    />

    <DictSelect
      v-model="form.receiptInfo.paymentWay"
      dict-type="oa_daily_fee_payment_way"
      name="receiptInfo.paymentWay"
      label="付款方式"
      :readonly="readonly"
      :rules="(computedRules.receiptInfo as any)?.paymentWay"
      clearable
      @change="onPaymentWayChange"
    />

    <template v-if="form.receiptInfo.paymentWay === '0'">
      <van-field
        v-model.trim="form.receiptInfo.accountName"
        name="receiptInfo.accountName"
        label="账户名称"
        placeholder="请输入"
      />

      <van-field
        v-model.trim="form.receiptInfo.corporateAccount"
        name="receiptInfo.corporateAccount"
        label="对公账号"
        placeholder="请输入"
      />

      <van-field
        v-model.trim="form.receiptInfo.openingBank"
        name="receiptInfo.openingBank"
        label="开户行名称"
        placeholder="请输入"
      />
    </template>
  </van-cell-group>
</template>

<script setup lang="ts">
import type { DailyFeeForm, ReceiptInfo } from '@/api/oa/daily/fee/types'

defineProps<{
  readonly?: boolean
}>()

// 表单
const form = inject<Ref<DailyFeeForm & { receiptInfo: ReceiptInfo }>>('form')
// 校验规则
const computedRules = inject<Ref<FormRules<DailyFeeForm>>>('computedRules')

// 付款方式选择
function onPaymentWayChange() {
  form.value.receiptInfo.accountName = undefined
  form.value.receiptInfo.corporateAccount = undefined
  form.value.receiptInfo.openingBank = undefined
}
</script>
