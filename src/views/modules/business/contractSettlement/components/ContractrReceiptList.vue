<template>
  <van-field v-loading="loading" label="回款记录">
    <template #input>
      <CoolCardList accordion active-on-register>
        <CoolCard v-for="item in list" :key="item.id" :title="parseTime(item.businessDate, '{y}-{m}-{d}')">
          <van-field
            :model-value="parseTime(item.businessDate, '{y}-{m}-{d}')"
            label="业务日期"
            readonly
          />

          <van-field
            :model-value="formatCurrency(item.amount)"
            label="金额合计"
            readonly
          />

          <van-field
            :model-value="item.settlementMethodId"
            label="结算方式"
            readonly
          />
        </CoolCard>
      </CoolCardList>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import type { ContractReceiptVO } from '@/api/oa/business/contractrReceipt/types'
import { listContractReceipt } from '@/api/oa/business/contractrReceipt'

const props = defineProps<{
  contractNo?: string
}>()

const loading = ref(false)
const list = ref<ContractReceiptVO[]>([])

watch(
  () => props.contractNo,
  async (val) => {
    if (!val)
      return
    loading.value = true
    const { rows } = await listContractReceipt({ contractNo: val })
    list.value = rows
    loading.value = false
  },
  { immediate: true },
)
</script>
