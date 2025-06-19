<template>
  <van-field v-loading="loading" label="开票信息">
    <template #input>
      <CoolCardList accordion active-on-register>
        <CoolCard v-for="item in list" :key="item.id" :title="parseTime(item.businessDate, '{y}-{m}-{d}')">
          <van-field
            :model-value="parseTime(item.businessDate, '{y}-{m}-{d}')"
            label="单据日期"
            readonly
          />

          <van-field
            :model-value="formatCurrency(item.originAmount)"
            label="原币金额合计"
            readonly
          />

          <van-field
            :model-value="formatCurrency(item.originAmountWithoutTax)"
            label="原币无税金额合计"
            readonly
          />

          <van-field
            :model-value="formatCurrency(item.originTaxAmount)"
            label="原币税额合计"
            readonly
          />

          <van-field
            :model-value="item.invoiceTypeId"
            label="发票类型"
            readonly
          />

          <van-field
            :model-value="item.remark"
            label="备注"
            type="textarea"
            rows="1"
            autosize
            readonly
          />
        </CoolCard>
      </CoolCardList>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import type { ContractInvoiceVO } from '@/api/oa/business/contractInvoice/types'
import { listContractInvoice } from '@/api/oa/business/contractInvoice'

const props = defineProps<{
  contractNo?: string
}>()

const loading = ref(false)
const list = ref<ContractInvoiceVO[]>([])

watch(
  () => props.contractNo,
  async (val) => {
    if (!val)
      return
    loading.value = true
    const { rows } = await listContractInvoice({ contractNo: val })
    list.value = rows
    loading.value = false
  },
  { immediate: true },
)
</script>
