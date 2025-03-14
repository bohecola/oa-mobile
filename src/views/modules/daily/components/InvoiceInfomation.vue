<template>
  <van-cell-group :border="false" inset>
    <template #title>
      <div>发票信息</div>
    </template>

    <van-field
      v-model.trim="form.receiptInfo.entityName"
      name="receiptInfo.entityName"
      label="单位或个人名称"
    />

    <van-field
      name="receiptInfo.invoiceType"
      label="发票类型"
    >
      <template #input>
        <DictSelect v-model="form.receiptInfo.invoiceType" dict-type="oa_contract_invoice_type" clearable :readonly="readonly" />
      </template>
    </van-field>

    <van-field
      name="receiptInfo.taxRate"
      label="税率（%）"
    >
      <template #input>
        <DictSelect v-model="form.receiptInfo.taxRate" dict-type="oa_contract_tax_rate" clearable :readonly="readonly" />
      </template>
    </van-field>

    <van-field
      name="receiptInfo.paymentWay"
      label="付款方式"
    >
      <template #input>
        <DictSelect v-model="form.receiptInfo.paymentWay" dict-type="oa_daily_fee_payment_way" clearable :readonly="readonly" />
      </template>
    </van-field>

    <template v-if="form.receiptInfo.paymentWay === '0'">
      <van-field
        v-model.trim="form.receiptInfo.accountName "
        name="receiptInfo.accountName"
        label="账户名称"
      />

      <van-field
        v-model.trim="form.receiptInfo.corporateAccount"
        name="receiptInfo.corporateAccount"
        label="对公账号"
      />

      <van-field
        v-model.trim="form.receiptInfo.openingBank"
        name="receiptInfo.openingBank"
        label="开户行名称"
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
</script>
