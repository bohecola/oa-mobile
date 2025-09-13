import Big from 'big.js'
import { cloneDeep, groupBy, isNil } from 'lodash-es'
import { getSumAmount, listContractPhase, queryGroupAmount } from '@/api/oa/business/contractPhase'
import type { AmountItem, ContractPhaseListVO, ContractPhaseQuery, ContractSumAmountVO, GroupAmountVO } from '@/api/oa/business/contractPhase/types'

export interface PhaseHelperOptions {
  initQueryParams: ContractPhaseQuery
  fetchSumAmountOnGetList: boolean
  isQueryList?: boolean
}

export interface GetGroupAmountOptions {
  success?: () => void
}

export function useContractPhaseHelper(options: PhaseHelperOptions) {
  const { initQueryParams, fetchSumAmountOnGetList, isQueryList = false } = options

  const contractPhaseList = ref<ContractPhaseListVO[]>([])
  const total = ref(0)

  const loading = ref(false)
  const finished = ref(false)
  const showSearch = ref(true)
  const refreshing = ref(false)

  const groupMap = {
    invoiceTotalAmount: '开票总金额',
    receiptTotalAmount: '回款总金额',
    invoiceNotReceiptTotalAmount: '待回款总金额',
  }

  // 查询参数
  const queryParams = ref<ContractPhaseQuery>(cloneDeep(initQueryParams))

  // 统计金额
  const sumAmount = ref<ContractSumAmountVO>({})

  // 按需求部门分组统计
  const deptGroupAmount = ref<GroupAmountVO>({
    contractTotalAmount: [],
    invoiceTotalAmount: [],
    receiptTotalAmount: [],
    invoiceNotReceiptTotalAmount: [],
  })

  // 按需求部门分组统计
  const deptGroupAmountByDept = computed(() => {
    const result: AmountItem[] = []

    for (const [key, value] of Object.entries(groupMap)) {
      deptGroupAmount.value[key].forEach((item: AmountItem) => {
        result.push({ ...item, typeName: value })
      })
    }

    return groupBy(result, 'name') as Record<string, AmountItem[]>
  })

  // 按合同类型分组统计
  const categoryGroupAmount = ref<GroupAmountVO>({
    contractTotalAmount: [],
    invoiceTotalAmount: [],
    receiptTotalAmount: [],
    invoiceNotReceiptTotalAmount: [],
  })

  // 获取不带分页查询的参数
  function getQueryParamsWithoutPage() {
    const params = cloneDeep(queryParams.value)
    delete params.pageNum
    delete params.pageSize
    return params
  }

  function calcPendingPaymentTotalAmount(data: ContractSumAmountVO) {
    if (isNil(data.invoiceTotalAmount) || isNil(data.receiptTotalAmount)) {
      return undefined
    }

    return Big(data.invoiceTotalAmount)
      .minus(data.receiptTotalAmount)
      .toNumber()
  }

  // 查询列表
  async function getList() {
    if (refreshing.value) {
      contractPhaseList.value = []
      refreshing.value = false
    }

    loading.value = true
    const res = await listContractPhase(queryParams.value)
    contractPhaseList.value = res.rows
    total.value = res.total

    if (fetchSumAmountOnGetList) {
      const query = getQueryParamsWithoutPage()

      const { data } = await getSumAmount(query)
      sumAmount.value = data
      sumAmount.value.pendingPaymentTotalAmount = calcPendingPaymentTotalAmount(data)
    }

    loading.value = false
    finished.value = true
  }

  // 分组查询
  async function getGroupAmount(options: GetGroupAmountOptions = {}) {
    const { success } = options

    loading.value = true
    const query = getQueryParamsWithoutPage()

    const { data } = await queryGroupAmount(query)

    loading.value = false

    const { dept, category, total = {} } = data

    sumAmount.value = total
    sumAmount.value.pendingPaymentTotalAmount = calcPendingPaymentTotalAmount(total)

    deptGroupAmount.value = dept
    categoryGroupAmount.value = category

    success?.()
  }

  // 搜索
  function handleQuery() {
    if (!isQueryList) {
      return getGroupAmount()
    }

    finished.value = false
    contractPhaseList.value = []
    queryParams.value.pageNum = 1
    getList()
  }

  // 重置搜索
  function resetQuery() {
    queryParams.value = cloneDeep(initQueryParams)
    handleQuery()
  }

  // 刷新
  function onRefresh() {
    queryParams.value.pageNum = 1
    finished.value = false
    loading.value = true
    getList()
  }

  return {
    groupMap,
    contractPhaseList,
    loading,
    finished,
    refreshing,
    showSearch,
    total,

    queryParams,
    sumAmount,
    deptGroupAmount,
    deptGroupAmountByDept,
    categoryGroupAmount,

    getList,
    getGroupAmount,
    handleQuery,
    resetQuery,
    onRefresh,
  }
}
