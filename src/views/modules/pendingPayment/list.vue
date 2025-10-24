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

    <div class="scroll-container-base">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="px-1 py-2 flex justify-around text-center">
          <AmountCard label="开票总金额" :value="sumAmount.invoiceTotalAmount" />
          <AmountCard label="回款总金额" :value="sumAmount.receiptTotalAmount" />
          <AmountCard label="待回款总金额" :value="sumAmount.pendingPaymentTotalAmount" value-class="text-red-500" />
        </div>

        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getList"
          @refresh="onRefresh"
        >
          <van-cell v-for="item in contractPhaseList" :key="item.id" :title="item.name">
            <template #label>
              <div>
                <span>合同编号：</span>
                <span>{{ item.no }}</span>
              </div>
              <div>
                <span>需求部门：</span>
                <span>{{ item.deptName }}</span>
              </div>
              <div>
                <span>合同金额：</span>
                <span>{{ formatCurrency(item.amount) }}</span>
                <span class="ml-1">元</span>
              </div>
              <div>
                <span>开票金额：</span>
                <span>{{ formatCurrency(item.invoiceTotalAmount) }}</span>
                <span class="ml-1">元</span>
              </div>
              <div>
                <span>回款金额：</span>
                <span>{{ formatCurrency(item.receiptTotalAmount) }}</span>
                <span class="ml-1">元</span>
              </div>
              <div class="text-red-500">
                <span>待回款金额：</span>
                <span>
                  {{ formatCurrency(Big(item.invoiceTotalAmount).minus(item.receiptTotalAmount).toNumber()) }}
                </span>
                <span class="ml-1">元</span>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
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
import Big from 'big.js'
import FormQuery from './components/FormQuery.vue'
import AmountCard from './components/AmountCard.vue'
import { useContractPhaseHelper } from './helper'
import type { ContractPhaseQuery } from '@/api/oa/business/contractPhase/types'

const FormQueryRef = ref<InstanceType<typeof FormQuery>>()

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_contract_category_in, oa_contract_status } = toRefs(proxy.useDict('oa_contract_category_in', 'oa_contract_status'))
const _oa_contract_status = computed(() => {
  return oa_contract_status.value.filter(e => ['3', '4', '9'].includes(e.value))
})

const { deptId } = proxy?.$route.params

const initQueryParams: ContractPhaseQuery = {
  isPhase: undefined,
  deptId: deptId as string,
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

const { loading, refreshing, finished, contractPhaseList, sumAmount, queryParams, getList, handleQuery, resetQuery, onRefresh } = useContractPhaseHelper({
  initQueryParams,
  fetchSumAmountOnGetList: true,
  isQueryList: true,
})
</script>
