export interface ContractReceiptVO {
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
   * 业务日期(到款日期)
   */
  businessDate: string

  /**
   * 金额合计
   */
  amount: number

  /**
   * 结算方式
   */
  settlementMethodId: string

  /**
   * 单据完全状态
   */
  billFullStatus: string

  /**
   * 审批时间
   */
  approvedTime: string
}

export interface ContractReceiptForm extends BaseEntity {
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
   * 业务日期(到款日期)
   */
  businessDate?: string

  /**
   * 金额合计
   */
  amount?: number

  /**
   * 结算方式
   */
  settlementMethodId?: string

  /**
   * 单据完全状态
   */
  billFullStatus?: string

  /**
   * 审批时间
   */
  approvedTime?: string
}

export interface ContractReceiptQuery extends PageQuery {
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
   * 业务日期(到款日期)
   */
  businessDate?: string

  /**
   * 金额合计
   */
  amount?: number

  /**
   * 结算方式
   */
  settlementMethodId?: string

  /**
   * 单据完全状态
   */
  billFullStatus?: string

  /**
   * 审批时间
   */
  approvedTime?: string

  /**
   * 日期范围参数
   */
  params?: any
}
