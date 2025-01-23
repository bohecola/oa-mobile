export interface DailyFeeVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 项目
   */
  projectId: number

  /**
   * 预算类型
   */
  subjectType: string

  /**
   * 部门id
   */
  deptId: string

  /**
   * 费用类型
   */
  feeType: number

  /**
   * 预算科目
   */
  subjectItemId: string | number

  /**
   * 金额
   */
  amount: number

  /**
   * 申请事由
   */
  reason: string

  /**
   * 是否行政协助
   */
  isAdministration: string

  /**
   * 证件类型(安全类培训费用、项目日常费用)
   */
  certificateType: string

  /**
   * 开票信息
   */
  receiptInfo?: ReceiptInfo | string

  /**
   * 备注
   */
  remark: string
}

export interface DailyFeeItemVO {
  /**
   * 费用明细
   */
  id?: string | number

  /**
   * 日常费用申请表id
   */
  dailyFeeId?: string | number

  /**
   * 项目预算项id（oa_project_subject_item）
   */
  subjectItemId?: string | number

  /**
   * 预算责任部门
   */
  subjectItemDeptId?: string | number

  /**
   * 预算金额
   */
  budgetAmount?: number

  /**
   * 申请中
   */
  applyingAmount?: number

  /**
   * 已申请
   */
  finishAmount?: number

  /**
   * 剩余金额
   */
  availableAmount?: number

  /**
   * 本次申请金额
   */
  amount?: number

  /**
   * 备注
   */
  remark?: string
}

export interface DailyFeeForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 预算id
   */
  psId?: string

  /**
   * 合同id
   */
  contractId?: string

  /**
   * 合同编号
   */
  contractNo?: string

  /**
   * 预算类型
   */
  subjectType?: string

  /**
   * 部门id
   */
  deptId?: string | number

  /**
   * 费用类型
   */
  feeType?: number

  /**
   * 预算科目
   */
  subjectItemId?: string | number

  /**
   * 预算明细表
   */
  itemList?: DailyFeeItemVO[]

  /**
   * 剩余金额
   */
  availableAmount?: number

  /**
   * 申请总金额
   */
  amount?: number

  /**
   * 申请事由
   */
  reason?: string

  /**
   * 是否行政协助
   */
  isAdministration?: string

  /**
   * 证件类型(安全类培训费用、项目日常费用)
   */
  certificateType?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 流程中表单的字段
   * 流程中申请事由备注
   */
  wfRemark?: string

  /**
   * 事务编码
   */
  no?: string

  /**
   * 根事务编码
   */
  rootNo?: string

  /**
   * 开票信息
   */
  receiptInfo?: ReceiptInfo | string

  /**
   * 附件列表
   */
  ossIdList?: string[]
}

export interface ReceiptInfo {
  entityName?: string
  invoiceType?: string
  taxRate?: string
  paymentWay?: string
  accountName?: string
  corporateAccount?: string
  openingBank?: string
}

export interface DailyFeeQuery extends PageQuery {
  /**
   * 项目
   */
  projectId?: number

  /**
   * 预算类型
   */
  subjectType?: string

  /**
   * 部门id
   */
  deptId?: string

  /**
   * 费用类型
   */
  feeType?: number

  /**
   * 预算科目
   */
  subjectItemId?: string | number

  /**
   * 金额
   */
  amount?: number

  /**
   * 申请事由
   */
  reason?: string

  /**
   * 是否行政协助
   */
  isAdministration?: string

  /**
   * 证件类型(安全类培训费用、项目日常费用)
   */
  certificateType?: string

  /**
   * 日期范围参数
   */
  params?: any
}
