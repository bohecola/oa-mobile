export interface ContractInvoiceVO {
  /**
   * ID
   */
  id: string

  /**
   * 合同id
   */
  contractId: string

  /**
   * 合同编号
   */
  contractNo: string

  /**
   * 单据编码(企企平台)
   */
  code: string

  /**
   * 金额合计
   */
  amount: number

  /**
   * 原币金额合计
   */
  originAmount: number

  /**
   * 原币无税金额合计
   */
  originAmountWithoutTax: number

  /**
   * 原币税额合计
   */
  originTaxAmount: number

  /**
   * 发票类型
   */
  invoiceTypeId: string

  /**
   * 单据日期
   */
  businessDate: string

  /**
   * 审批时间
   */
  approvedTime: string

  /**
   * 单据完全状态
   */
  billFullStatus: string

  /**
   * 备注
   */
  remark: string
}

export interface ContractInvoiceForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 合同id
   */
  contractId?: string

  /**
   * 合同编号
   */
  contractNo?: string

  /**
   * 单据编码(企企平台)
   */
  code?: string

  /**
   * 金额合计
   */
  amount?: number

  /**
   * 原币金额合计
   */
  originAmount?: number

  /**
   * 原币无税金额合计
   */
  originAmountWithoutTax?: number

  /**
   * 原币税额合计
   */
  originTaxAmount?: number

  /**
   * 发票类型
   */
  invoiceTypeId?: string

  /**
   * 单据日期
   */
  businessDate?: string

  /**
   * 审批时间
   */
  approvedTime?: string

  /**
   * 单据完全状态
   */
  billFullStatus?: string

  /**
   * 备注
   */
  remark?: string
}

export interface ContractInvoiceQuery extends PageQuery {
  /**
   * 合同id
   */
  contractId?: string

  /**
   * 合同编号
   */
  contractNo?: string

  /**
   * 单据编码(企企平台)
   */
  code?: string

  /**
   * 金额合计
   */
  amount?: number

  /**
   * 原币金额合计
   */
  originAmount?: number

  /**
   * 原币无税金额合计
   */
  originAmountWithoutTax?: number

  /**
   * 原币税额合计
   */
  originTaxAmount?: number

  /**
   * 发票类型
   */
  invoiceTypeId?: string

  /**
   * 单据日期
   */
  businessDate?: string

  /**
   * 审批时间
   */
  approvedTime?: string

  /**
   * 单据完全状态
   */
  billFullStatus?: string

  /**
   * 日期范围参数
   */
  params?: any
}
