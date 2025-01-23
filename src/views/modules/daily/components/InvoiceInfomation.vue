<template>
  <van-cell-group title="发票信息" inset>
    <van-field
      name="receiptInfo.entityName"
      label="单位或个人名称"
      input-align="right"
    >
      <template #input>
        <span v-if="readonly">{{ (form.receiptInfo as ReceiptInfo).entityName }}</span>
      </template>
    </van-field>
    <van-field
      name="receiptInfo.invoiceType"
      label="发票类型"
      input-align="right"
    >
      <template #input>
        <DictSelect v-model="(form.receiptInfo as ReceiptInfo).invoiceType" dict-type="oa_contract_invoice_type" clearable :readonly="readonly" />
      </template>
    </van-field>

    <van-field
      name="receiptInfo.taxRate"
      label="税率（%）"
      input-align="right"
    >
      <template #input>
        <DictSelect v-model="(form.receiptInfo as ReceiptInfo).taxRate" dict-type="oa_contract_tax_rate" clearable :readonly="readonly" />
      </template>
    </van-field>

    <van-field
      name="receiptInfo.paymentWay"
      label="付款方式"
      input-align="right"
    >
      <template #input>
        <DictSelect v-model="(form.receiptInfo as ReceiptInfo).paymentWay" dict-type="oa_daily_fee_payment_way" clearable :readonly="readonly" />
      </template>
    </van-field>

    <template v-if="(form.receiptInfo as ReceiptInfo).paymentWay === '0'">
      <van-field
        name="receiptInfo.accountName"
        label="账户名称"
        input-align="right"
      >
        <template #input>
          <span v-if="readonly">{{ (form.receiptInfo as ReceiptInfo).accountName }}</span>
        </template>
      </van-field>

      <van-field
        name="receiptInfo.corporateAccount"
        label="对公账号"
        input-align="right"
      >
        <template #input>
          <span v-if="readonly">{{ (form.receiptInfo as ReceiptInfo).corporateAccount }}</span>
        </template>
      </van-field>

      <van-field
        name="receiptInfo.openingBank"
        label="开户行名称"
        input-align="right"
      >
        <template #input>
          <span v-if="readonly">{{ (form.receiptInfo as ReceiptInfo).openingBank }}</span>
        </template>
      </van-field>
    </template>
  </van-cell-group>
</template>

<script setup lang="ts">
import type { DailyFeeForm, ReceiptInfo } from '@/api/oa/daily/fee/types'

defineProps<{
  readonly?: boolean
}>()

// 表单
const form = inject<Ref<DailyFeeForm>>('form')
</script>
