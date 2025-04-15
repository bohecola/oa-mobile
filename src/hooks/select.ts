import type { ContractVO } from '@/api/oa/business/contract/types'
import type { ProjectVO } from '@/api/oa/business/project/types'
import type { SupplierCustomerVO } from '@/api/oa/business/supplierCustomer/types'
import type { ProjectSubjectVO } from '@/api/oa/finance/projectSubject/types'

export function useSelect<T>() {
  // 搜索词
  const searchText = ref<string>(undefined)

  // 状态
  const loading = ref(false)
  const error = ref(false)
  const finished = ref(false)
  const list = ref<T[]>([])
  const total = ref(0)

  // 回显加载
  const viewLoading = ref(false)

  // 选择列表
  const selectedList = ref<T[]>([])

  return {
    searchText,
    loading,
    error,
    finished,
    list,
    total,
    viewLoading,
    selectedList,
  }
}

// 供应商客户选择
export function useSCSelect() {
  const selectState = useSelect<SupplierCustomerVO>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const { oa_supplier_customer_type } = toRefs(proxy.useDict('oa_supplier_customer_type'))

  const labelDescriptors: LabelDescriptor<SupplierCustomerVO>[] = [
    {
      text: '类型',
      key: 'type',
      type: 'dict',
      options: oa_supplier_customer_type,
    },
    {
      text: '联系人',
      key: 'contacts',
      type: 'plain',
    },
    {
      text: '电话',
      key: 'contactPhone',
      type: 'plain',
    },
  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}

// 项目选择
export function useProjectSelect() {
  const selectState = useSelect<ProjectVO>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const {
    oa_project_business_type,
    oa_project_status,
  } = toRefs(proxy.useDict(
    'oa_project_business_type',
    'oa_project_status',
  ))

  const labelDescriptors: LabelDescriptor<ProjectVO>[] = [
    {
      text: '业务类型',
      key: 'businessType',
      type: 'dict',
      options: oa_project_business_type,
    },
    {
      text: '部门',
      key: 'deptName',
      type: 'plain',
    },
    {
      text: '负责人',
      key: 'projectLeaderName',
      type: 'plain',
    },
    {
      text: '计划开始日期',
      key: 'planStartDate',
      type: 'time',

    },
    {
      text: '计划结束日期',
      key: 'planEndDate',
      type: 'time',
    },
    {
      text: '项目完成日期',
      key: 'finishDate',
      type: 'time',
    },
    {
      text: '状态',
      key: 'status',
      type: 'dict',
      options: oa_project_status,
    },
  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}

// 合同选择
export function useContractSelect() {
  const selectState = useSelect<ContractVO>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const {
    oa_contract_type,
    oa_contract_category_in,
    oa_contract_category_out,
    oa_contract_category_agreement,
    oa_contract_status,
    oa_project_business_type,
  } = toRefs(proxy.useDict(
    'oa_contract_type',
    'oa_contract_category_in',
    'oa_contract_category_out',
    'oa_contract_category_agreement',
    'oa_contract_status',
    'oa_project_business_type',
  ))

  const labelDescriptors: LabelDescriptor<ContractVO>[] = [
    {
      text: '流程ID',
      key: 'id',
      type: 'plain',
    },
    {
      text: '合同编号',
      key: 'no',
      type: 'plain',
    },
    {
      text: '申请人',
      key: 'createByName',
      type: 'plain',
    },
    {
      text: '合同类型',
      key: 'type',
      type: 'dict',
      options: oa_contract_type,
    },
    {
      text: '合同类别',
      key: 'category',
      type: 'dict',
      options: (item) => {
        switch (item.type) {
          case 'in':
            return oa_contract_category_in.value
          case 'out':
            return oa_contract_category_out.value
          case 'agreement':
            return oa_contract_category_agreement.value
          default:
            return []
        }
      },
    },
    {
      text: '合同金额',
      key: 'amount',
      type: 'amount',
    },
    {
      text: '项目类别',
      key: 'businessType',
      type: 'dict',
      options: oa_project_business_type,
    },
    {
      text: '需求部门',
      key: 'deptName',
      type: 'plain',
    },
    {
      text: '开始日期',
      key: 'startDate',
      type: 'time',
    },
    {
      text: '结束日期',
      key: 'endDate',
      type: 'time',
    },
    {
      text: '状态',
      key: 'status',
      type: 'dict',
      options: oa_contract_status,
    },
  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}

// 预算选择
export function useProjectSubjectSelect() {
  const selectState = useSelect<ProjectSubjectVO>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 字典
  const {
    oa_project_business_type,
    oa_project_subject_status,
  } = toRefs(proxy.useDict(
    'oa_project_business_type',
    'oa_project_subject_status',
  ))

  // 业务类型
  const _oa_project_business_type = computed(() => {
    return [
      ...oa_project_business_type.value,
      {
        label: '部门类',
        value: 'dept',
      },
    ]
  })

  const labelDescriptors: LabelDescriptor<ProjectVO>[] = [
    {
      text: '业务类型',
      key: 'businessType',
      type: 'dict',
      options: _oa_project_business_type,
    },
    {
      text: '合同编号',
      key: 'contractNo',
      type: 'plain',
    },
    {
      text: '状态',
      key: 'status',
      type: 'dict',
      options: oa_project_subject_status,
    },

  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}
