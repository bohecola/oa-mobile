export interface ContractPhaseItemVO {
  /**
   * ID
   */
  id: string

  /**
   * 合同ID
   */
  contractId: string

  /**
   * 合同执行阶段ID
   */
  phaseId: string

  /**
   * 阶段名称
   */
  phaseName: string

  /**
   * 应收款
   */
  receivableAmount: number

  /**
   * 开始时间
   */
  startDate: string

  /**
   * 截至时间
   */
  endDate: string

  /**
   * 计划回款时间
   */
  planDate: string

  /**
   * 逾期天数
   */
  overdueDay?: number

  /**
   * 备注
   */
  remark: string

  // 已回款总金额
  collectionTotalAmount?: number
  // 奖励总金额
  rewardTotalAmount?: number
  // 考核总金额
  assessmentaTotalAmount?: number

  // 结算单 id 列表
  settlementIdList?: string[]
}

export interface ContractPhaseItemForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 合同ID
   */
  contractId?: string

  /**
   * 合同执行阶段ID
   */
  phaseId?: string

  /**
   * 阶段名称
   */
  phaseName?: string

  /**
   * 应收款
   */
  receivableAmount?: number

  /**
   * 开始时间
   */
  startDate?: string

  /**
   * 计划回款时间
   */
  planDate?: string

  /**
   * 截至时间
   */
  endDate?: string

  /**
   * 备注
   */
  remark?: string

  editable?: boolean
  saveLoading?: boolean
  deleteLoading?: boolean
}

export interface ContractPhaseItemQuery extends PageQuery {
  /**
   * 合同ID
   */
  contractId?: string

  /**
   * 合同执行阶段ID
   */
  phaseId?: string

  /**
   * 阶段名称
   */
  phaseName?: string

  /**
   * 应收款
   */
  receivableAmount?: number

  /**
   * 开始时间
   */
  startDate?: string

  /**
   * 截至时间
   */
  endDate?: string

  /**
   * 日期范围参数
   */
  params?: any
}
