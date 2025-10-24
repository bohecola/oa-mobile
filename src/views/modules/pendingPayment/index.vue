<template>
  <div>
    <NavBar>
      <template #right>
        <van-icon
          name="filter-o"
          size="18"
          @click="FormQueryRef?.open"
        />
      </template>
    </NavBar>

    <div v-loading="loading" class="scroll-container-base overflow-y-auto">
      <div class="px-1 py-2 flex justify-around text-center">
        <AmountCard label="开票总金额" :value="sumAmount.invoiceTotalAmount" />
        <AmountCard label="回款总金额" :value="sumAmount.receiptTotalAmount" />
        <AmountCard label="待回款总金额" :value="sumAmount.pendingPaymentTotalAmount" value-class="text-red-500" />
      </div>

      <van-cell-group
        v-for="(list, title) in deptGroupAmountByDept"
        :key="title"
        :title="title" inset
      >
        <van-cell
          v-for="item in list"
          :key="item.value"
          :title="item.typeName"
          title-class="!flex-[2]"
          is-link
          @click="onItemClick(item)"
        >
          <template #value>
            <span class="mr-1">{{ formatCurrency(Number(item.value)) }}</span>
            <span class="text-xs">万</span>
          </template>
        </van-cell>
      </van-cell-group>

      <BottomLine />
    </div>

    <FormQuery ref="FormQueryRef" @on-search="handleQuery" @on-reset="resetQuery">
      <DateSelect
        v-model="queryParams.years"
        label="年度"
        component="date-picker"
        :columns-type="['year']"
        clearable
      />

      <DeptSelect
        v-model="queryParams.deptId"
        label="需求部门"
        :role-config="{
          check: true,
          key: 'ContractReport',
        }"
        clearable
      />

      <DictSelect
        v-model="queryParams.contractCategory"
        label="合同类别"
        clearable
        :options="oa_contract_category_in"
      />

      <DictSelect
        v-model="queryParams.contractStatus"
        label="合同状态"
        :options="_oa_contract_status"
      />

      <van-field
        v-model.trim="queryParams.contractNo"
        label="合同编号"
        placeholder="请输入"
        clearable
      />

      <van-field
        v-model.trim="queryParams.contractName"
        label="合同名称"
        placeholder="请输入"
        clearable
      />
    </FormQuery>
  </div>
</template>

<script setup lang='ts'>
import { useContractPhaseHelper } from './helper'
import AmountCard from './components/AmountCard.vue'
import FormQuery from './components/FormQuery.vue'
import type { AmountItem, ContractPhaseQuery } from '@/api/oa/business/contractPhase/types'

const FormQueryRef = ref<InstanceType<typeof FormQuery>>()

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_contract_category_in, oa_contract_status } = toRefs(proxy.useDict('oa_contract_category_in', 'oa_contract_status'))
const _oa_contract_status = computed(() => {
  return oa_contract_status.value.filter(e => ['3', '4', '9'].includes(e.value))
})

const initQueryParams: ContractPhaseQuery = {
  isPhase: undefined,
  deptId: undefined,
  contractNo: undefined,
  contractName: undefined,
  contractCategory: undefined,
  contractStatus: '3',
  phaseItemPlanDate: undefined,
  businessKey: undefined,
  createUserName: undefined,
  status: undefined,
  isKpwhk: 'Y',
  isCheckPermission: 'Y',
  years: undefined,
  params: {},
}

const { loading, sumAmount, deptGroupAmountByDept, queryParams, getGroupAmount, handleQuery, resetQuery } = useContractPhaseHelper({
  initQueryParams,
  fetchSumAmountOnGetList: true,
})

function onItemClick(item: AmountItem) {
  proxy.$router.push(`/pendingPaymentList/${item.label}`)
}

onMounted(() => {
  getGroupAmount()
})
</script>
