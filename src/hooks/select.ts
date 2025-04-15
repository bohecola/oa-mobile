import type { ProjectVO } from '@/api/oa/business/project/types'
import type { SupplierCustomerVO } from '@/api/oa/business/supplierCustomer/types'

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
