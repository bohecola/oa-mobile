export interface ContractVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 编号
   */
  no: string

  /**
   * 名称
   */
  name: string

  /**
   * 甲方;supplier_customer表id
   */
  partyA: string

  /**
   * 乙方;supplier_customer表id
   */
  partyB: string

  /**
   * 丙方;supplier_customer表id
   */
  partyC: string

  /**
   * 丁方;supplier_customer表id
   */
  partyD: string

  /**
   * 合同类型（收入、支出、协议）;采购合同 销售合同 法务合同 其他合同
   */
  type: string

  /**
   * 合同类别;运维类销售合同 运维类技术协议 运维类安全协议 电力工程类销售合同 电力工程类技术及安全协议 电站工程类技术及安全协议 检修试验类销售合同 检修试验类安全协议 信息化销售合同 运维类框架合作协议 电站工程类销售合同 其他类销售合同
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
   * 发票类型;增值税专用发票 增值税普通发票 收据 其他
   */
  invoiceType: string

  /**
   * 金额/增值税率;[{"amount":xxx,'taxRate":xxx}]  税率：0 1% 3% 5% 6% 9% 13%
   */
  taxRate: string

  /**
   * 付款方式
   */
  paymentWay: string

  /**
   * 合同评审方式;部门评审 部门会审 框架协议 自选评审
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
   * 状态;0 草稿 1 评审中 2 执行中 3 已完成 9作废
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
}

export interface ContractForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

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
  projectId?: string | number

  /**
   * 项目名称
   */
  projectName?: string

  /**
   * 甲方;supplier_customer表id
   */
  partyA?: string

  /**
   * 乙方;supplier_customer表id
   */
  partyB?: string

  /**
   * 丙方;supplier_customer表id
   */
  partyC?: string

  /**
   * 丁方;supplier_customer表id
   */
  partyD?: string

  /**
   * 合同类型（收入、支出、协议）;采购合同 销售合同 法务合同 其他合同
   */
  type?: 'in' | 'out' | 'agreement'

  /**
   * 合同类别;运维类销售合同 运维类技术协议 运维类安全协议 电力工程类销售合同 电力工程类技术及安全协议 电站工程类技术及安全协议 检修试验类销售合同 检修试验类安全协议 信息化销售合同 运维类框架合作协议 电站工程类销售合同 其他类销售合同
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
   * 发票类型;增值税专用发票 增值税普通发票 收据 其他
   */
  invoiceType?: string

  /**
   * 金额/增值税率;[{"amount":xxx,'taxRate":xxx}]  税率：0 1% 3% 5% 6% 9% 13%
   */
  taxRate?: string

  /**
   * 付款方式
   */
  paymentWay?: string

  /**
   * 合同评审方式;部门评审 部门会审 框架协议 自选评审
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

  /**
   * 备注
   */
  remark?: string

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
   * 合同类型（收入、支出、协议）;采购合同 销售合同 法务合同 其他合同
   */
  type?: string

  /**
   * 合同类别;运维类销售合同 运维类技术协议 运维类安全协议 电力工程类销售合同 电力工程类技术及安全协议 电站工程类技术及安全协议 检修试验类销售合同 检修试验类安全协议 信息化销售合同 运维类框架合作协议 电站工程类销售合同 其他类销售合同
   */
  category?: string

  queryType?: string

  projectId?: string

  ids?: (string | number)[]

  status?: string

  statusList?: (string | number)[]
  /**
   * 预算id
   */
  psId?: string
  /**
   * 日期范围参数
   */
  params?: any
}
