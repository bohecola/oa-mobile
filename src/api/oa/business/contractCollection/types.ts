export interface ContractCollectionVO {
  /**
   * ID
   */
  id: string

  /**
   * 合同ID
   */
  contractId: string

  /**
   * 开票ID
   */
  invoiceId: string

  /**
   * 执行阶段ID
   */
  phaseId: string

  /**
   * 回款日期
   */
  collectionDate: string

  /**
   * 回款金额
   */
  collectionAmount: number

  /**
   * 奖励金额
   */
  rewardAmount: number

  /**
   * 考核金额
   */
  assessmentaAmount: number
}

export interface ContractCollectionForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 合同ID
   */
  contractId?: string

  /**
   * 开票ID
   */
  invoiceId?: string

  /**
   * 执行阶段ID
   */
  phaseId?: string

  /**
   * 回款日期
   */
  collectionDate?: string

  /**
   * 回款金额
   */
  collectionAmount?: number
}

export interface ContractCollectionQuery extends PageQuery {
  /**
   * 合同ID
   */
  contractId?: string

  /**
   * 开票ID
   */
  invoiceId?: string

  /**
   * 执行阶段ID
   */
  phaseId?: string

  /**
   * 回款日期
   */
  collectionDate?: string

  /**
   * 日期范围参数
   */
  params?: any
}
