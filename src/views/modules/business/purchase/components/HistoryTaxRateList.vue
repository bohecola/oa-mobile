<template>
  <van-popup
    v-model:show="visible"
    class="h-[70vh]"
    position="bottom"
    destroy-on-close
    safe-area-inset-bottom
  >
    <NavBar
      :title="title"
      :is-left-click-back="false"
      @click-left="closePopup"
    />

    <div class="h-[calc(100%-var(--van-nav-bar-height))] overflow-y-auto">
      <van-form
        label-align="top"
        class="reset-label"
        readonly
      >
        <div class="p-4">
          <CoolCardList active-on-register>
            <CoolCard
              v-for="(item, index) in currentItem.editList ?? []"
              :key="index"
              :title="formatCurrency(item.amount) "
            >
              <van-field-number
                v-model="item.amount"
                label="签证收入含税金额（元）"
                :name="`taxRateList.${index}.amount`"
              />

              <DictSelect
                v-model="item.taxRate"
                label="增值税率（%）"
                :name="`taxRateList.${index}.taxRate`"
                :options="oa_contract_tax_rate"
              />

              <van-field
                :model-value="item.notTaxAmount"
                label="签证收入不含税金额（元）"
              />

              <van-field
                :model-value="item.createName"
                label="创建人"
              />

              <van-field
                :model-value="item.createTime"
                label="创建时间"
              />
            </CoolCard>
          </CoolCardList>
        </div>
        <BottomLine />
      </van-form>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import type { TaxRateVO } from '@/api/oa/business/purchase/types'
import { usePopup } from '@/hooks'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { title, visible, openPopup, closePopup } = usePopup({ title: '历史记录' })
const { oa_contract_tax_rate } = toRefs(proxy.useDict('oa_contract_tax_rate'))

const currentItem = ref<TaxRateVO>(undefined)

function open(item: TaxRateVO) {
  openPopup()
  currentItem.value = item
}

defineExpose({
  open,
})
</script>
