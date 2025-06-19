export interface ContractVO {
  /**
   * ID
   */
  id: string

  /**
   * 编号
   */
  no: string

  /**
   * 名称
   */
  name: string

  /**
   * 甲方
   */
  partyA: string

  /**
   * 乙方
   */
  partyB: string

  /**
   * 丙方
   */
  partyC: string

  /**
   * 丁方
   */
  partyD: string

  /**
   * 合同类型（销售、支出、协议）
   */
  type: string

  /**
   * 合同类别
   */
  category: string

  /**
   * 合同开始日期
   */
  startDate: string

  /**
   * 合同结束日期
   */
  endDate: string

  /**
   * 签订日期
   */
  signDate: string

  /**
   * 合同描述
   */
  description: string

  /**
   * 合同金额
   */
  amount: number

  /**
   * 发票类型
   */
  invoiceType: string

  /**
   * 金额/增值税率
   */
  taxRate: string

  /**
   * 付款方式
   */
  paymentWay: string

  /**
   * 合同评审方式
   */
  reviewWay: string

  /**
   * 合同原件
   */
  originalFile: number

  /**
   * 无价合同
   */
  noAmountFile: number

  /**
   * 需求部门
   */
  deptId: string | number

  /**
   * 需求部门名称
   */
  deptName: string

  /**
   * 状态
   */
  status: string

  /**
   * 备注
   */
  remark: string

  /**
   * 合同中项目的业务类型
   */
  businessType: string

  /**
   * 申请人
   */
  createByName: string

  /**
   * 业务专员
   */
  personInChargeName: string
}

export interface ContractForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 编号
   */
  no?: string

  /**
   * 名称
   */
  name?: string

  /**
   * 项目ID
   */
  projectId?: string

  /**
   * 项目名称
   */
  projectName?: string

  /**
   * 甲方
   */
  partyA?: string

  /**
   * 乙方
   */
  partyB?: string

  /**
   * 丙方
   */
  partyC?: string

  /**
   * 丁方
   */
  partyD?: string

  /**
   * 合同类型（销售、支出、协议）
   */
  type?: 'in' | 'out' | 'agreement'

  /**
   * 合同类别
   */
  category?: string

  /**
   * 合同开始日期
   */
  startDate?: string

  /**
   * 合同结束日期
   */
  endDate?: string

  /**
   * 签订日期
   */
  signDate?: string

  /**
   * 合同描述
   */
  description?: string

  /**
   * 合同金额
   */
  amount?: number

  /**
   * 发票类型
   */
  invoiceType?: string

  /**
   * 金额/增值税率
   */
  taxRate?: string

  /**
   * 付款方式
   */
  paymentWay?: string

  /**
   * 合同评审方式
   */
  reviewWay?: string

  /**
   * 合同原件
   */
  originalFile?: string

  /**
   * 无价合同
   */
  noAmountFile?: string

  /**
   * 需求部门
   */
  deptId?: string | number

  /**
   * 部门名称
   */

  deptName?: string

  /**
   * 状态;0 草稿 1 评审中 2 执行中 3 已完成 9作废
   */
  status?: string

  // 是否用印
  isUseSeal?: string

  // 用印方式
  fileUseType?: string

  // 用印类型
  sealUseType?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 合同类别为采购合同时，关联的采购业务 id
   */
  purchaseIds?: string[]

  /**
   * 自定义审批人
   */
  customizeApprover?: string

  /**
   * 附件列表
   */
  ossIdList?: string[]
}

export interface ContractQuery extends PageQuery {
  /**
   * 编号
   */
  no?: string

  /**
   * 名称
   */
  name?: string

  /**
   * 合同类型（销售、支出、协议）
   */
  type?: string

  /**
   * 合同类别
   */
  category?: string

  queryType?: string

  projectId?: string

  ids?: (string | number)[]

  status?: string

  statusList?: string[]

  phaseType?: string

  createUserName?: string

  keyword?: string
  /**
   * 预算id
   */
  psId?: string
  /**
   * 日期范围参数
   */
  params?: any
}
