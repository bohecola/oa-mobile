import type { ContractVO } from '@/api/oa/business/contract/types'
import type { ProjectVO } from '@/api/oa/business/project/types'
import type { PurchaseVO } from '@/api/oa/business/purchase/types'
import type { SupplierCustomerVO } from '@/api/oa/business/supplierCustomer/types'
import type { DailyWorkVo } from '@/api/oa/daily/fee/types'
import type { ProjectSubjectVO } from '@/api/oa/finance/projectSubject/types'
import type { UserEmploymentVO } from '@/api/oa/personnel/userEmployment/types'
import type { UserPreEmploymentVO } from '@/api/oa/personnel/userPreEmployment/types'
import type { UserInfoVo } from '@/api/system/user/types'

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

  // 重置选择器状态
  function resetSelectState() {
    searchText.value = undefined

    loading.value = false
    error.value = false
    finished.value = false
    list.value = []
    total.value = 0

    viewLoading.value = false
  }

  return {
    searchText,
    loading,
    error,
    finished,
    list,
    total,
    viewLoading,
    selectedList,
    resetSelectState,
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

// 关联采购流程选择
export function usePurchaseProcessSelect() {
  const selectState = useSelect<PurchaseVO>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const {
    oa_purchase_type,
    oa_project_business_type,
    oa_purchase_business_type,
    oa_purchase_object_category,
    oa_purchase_status,
  } = toRefs(proxy.useDict(
    'oa_purchase_type',
    'oa_project_business_type',
    'oa_purchase_business_type',
    'oa_purchase_object_category',
    'oa_purchase_status',
  ))

  const labelDescriptors: LabelDescriptor<PurchaseVO>[] = [
    {
      text: '流程ID',
      key: 'id',
      type: 'plain',
    },
    {
      text: '申请部门',
      key: 'createDeptName',
      type: 'plain',
    },
    {
      text: '申请人',
      key: 'createByName',
      type: 'plain',
    },
    {
      text: '采购类型',
      key: 'type',
      type: 'dict',
      options: oa_purchase_type,
    },
    {
      text: '业务类别',
      key: 'businessCategory',
      type: 'dict',
      options: (item) => {
        if (item.subjectType === 'project') {
          return oa_project_business_type.value
        }
        return oa_purchase_business_type.value
      },
    },
    {
      text: '物品类别',
      key: 'objectCategory',
      type: 'dict',
      options: oa_purchase_object_category,
    },
    {
      text: '含税总金额',
      key: 'amount',
      type: 'amount',
    },
    {
      text: '实际金额',
      key: 'realAmount',
      type: 'amount',
    },
    {
      text: '申请时间',
      key: 'createTime',
      type: 'time',
    },
    {
      text: '状态',
      key: 'status',
      type: 'dict',
      options: oa_purchase_status,
    },
  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}

// 预入职流程选择员工
export function usePendingUserEmploymentSelect() {
  const selectState = useSelect<UserEmploymentVO>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const {
    oa_education_type,
    sys_yes_no,
    oa_employment_status,
  } = toRefs(proxy.useDict(
    'oa_education_type',
    'sys_yes_no',
    'oa_employment_status',
  ))

  const labelDescriptors: LabelDescriptor<UserEmploymentVO>[] = [
    {
      text: '姓名',
      key: 'preEmploymentName',
      type: 'plain',
    },
    {
      text: '学历',
      key: 'education',
      type: 'dict',
      options: oa_education_type,
    },
    {
      text: '是否实习',
      key: 'isIntern',
      type: 'dict',
      options: sys_yes_no,
    },
    {
      text: '是否推荐',
      key: 'isRecommend',
      type: 'dict',
      options: sys_yes_no,

    },
    {
      text: '推荐来源',
      key: 'reference',
      type: 'plain',
    },
    {
      text: '状态',
      key: 'status',
      type: 'dict',
      options: oa_employment_status,
    },
  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}

// 入职流程选择员工
export function useUserEmploymentSelect() {
  const selectState = useSelect<UserPreEmploymentVO>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const {
    sys_user_sex,
    sys_yes_no,
    oa_employment_status,
    oa_interview,
  } = toRefs(proxy.useDict(
    'sys_user_sex',
    'sys_yes_no',
    'oa_employment_status',
    'oa_interview',
  ))

  const labelDescriptors: LabelDescriptor<UserPreEmploymentVO>[] = [
    {
      text: '部门',
      key: 'deptName',
      type: 'plain',
    },
    {
      text: '岗位',
      key: 'postName',
      type: 'plain',
    },
    {
      text: '姓名',
      key: 'name',
      type: 'plain',
    },
    {
      text: '用户性别',
      key: 'sex',
      type: 'dict',
      options: sys_user_sex,
    },
    {
      text: '手机号',
      key: 'phonenumber',
      type: 'plain',
    },
    {
      text: '面试形式',
      key: 'interviewWay',
      type: 'dict',
      options: oa_interview,
    },
    {
      text: '面试日期',
      key: 'interviewDate',
      type: 'time',
    },
    {
      text: '是否有试用期',
      key: 'isProbation',
      type: 'dict',
      options: sys_yes_no,
    },
    {
      text: '状态',
      key: 'status',
      type: 'dict',
      options: oa_employment_status,
    },
  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}

// 转正流程选择员工
export function useUserRegularizationSelect() {
  const selectState = useSelect<UserInfoVo>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const {
    oa_education_type,
    oa_nation,
    oa_employment_status,
    oa_user_state,
  } = toRefs(proxy.useDict(
    'oa_education_type',
    'oa_nation',
    'oa_employment_status',
    'oa_user_state',
  ))

  const labelDescriptors: LabelDescriptor<UserInfoVo>[] = [
    {
      text: '用户',
      key: 'userName',
      type: 'plain',
    },
    {
      text: '部门',
      key: 'deptName',
      type: 'plain',
    },
    {
      text: '岗位',
      key: 'postName',
      type: 'plain',
    },
    {
      text: '民族',
      key: 'nation',
      type: 'dict',
      options: oa_nation,
    },
    {
      text: '学历',
      key: 'education',
      type: 'dict',
      options: oa_education_type,
    },
    {
      text: '试用期时长',
      key: 'probationPeriod',
      type: 'plain',
    },

    {
      text: '状态',
      key: 'status',
      type: 'dict',
      options: (item) => {
        if (item.status !== '-1') {
          return oa_user_state.value
        }
        else {
          return oa_employment_status.value
        }
      },
    },
  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}

// 日常费用--项目部购买特殊商业保险申请--购买申请选择
export function usePurchaseSelect() {
  const selectState = useSelect<DailyWorkVo>()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const {
    oa_daily_work_personnel_category,
    oa_daily_work_purchase_insurance_category,
  } = toRefs(proxy.useDict(
    'oa_daily_work_personnel_category',
    'oa_daily_work_purchase_insurance_category',
  ))

  const labelDescriptors: LabelDescriptor<DailyWorkVo>[] = [
    {
      text: '用户',
      key: 'createByName',
      type: 'plain',
    },
    {
      text: '部门',
      key: 'deptName',
      type: 'plain',
    },
    {
      text: '民族',
      key: 'personnelCategory',
      type: 'dict',
      options: oa_daily_work_personnel_category,
    },
    {
      text: '学历',
      key: 'education',
      type: 'dict',
      options: oa_daily_work_purchase_insurance_category,
    },
    {
      text: '时间',
      key: 'createTime',
      type: 'plain',
    },
  ]

  return {
    ...selectState,
    labelDescriptors,
  }
}
