<template>
  <van-popup
    v-model:show="visible"
    class="h-full"
    position="bottom"
    destroy-on-close
    safe-area-inset-bottom
  >
    <NavBar
      :title="title"
      :is-left-click-back="false"
      @click-left="closePopup"
    />

    <div v-loading="loading" class="scroll-container-base bg-[--bg-color]">
      <van-cell
        v-for="item in tableData"
        :key="item.id"
        :title="item.id"
        is-link

        @click="handleView(item.id)"
      >
        <template #label>
          <div>流程ID：{{ item.id }}</div>
          <div>总应回款：{{ formatCurrency(item.totalReceivableAmount) }}</div>
          <div>创建时间：{{ item.createTime }}</div>
        </template>
      </van-cell>

      <BottomLine />
    </div>

    <ContractPhaseDetailDialog ref="ContractPhaseDetailDialogRef" />
  </van-popup>
</template>

<script setup lang="ts">
import ContractPhaseDetailDialog from './ContractPhaseDetailDialog.vue'
import { getVoListByContractId } from '@/api/oa/business/contractPhase'
import { usePopup } from '@/hooks'

const ContractPhaseDetailDialogRef = ref<InstanceType<typeof ContractPhaseDetailDialog>>()

const { title, visible, openPopup, closePopup } = usePopup({ title: '已申请应回款' })

const loading = ref(false)
const tableData = ref<any[]>([])

async function open(id: string) {
  openPopup()

  loading.value = true
  const { data } = await getVoListByContractId(id).finally(() => (loading.value = false))
  tableData.value = data
}

async function handleView(id: string) {
  ContractPhaseDetailDialogRef.value?.open(id)
}

defineExpose({
  open,
})
</script>
