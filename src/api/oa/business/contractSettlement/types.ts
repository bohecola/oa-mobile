import type { ContractVO } from '../contract/types'
import type { ContractCollectionVO } from '../contractCollection/types'

export interface ContractSettlementVO {
  /**
   * ID
   */
  id: string

  /**
   * 合同id
   */
  contractId: string

  /**
   * 合同对象
   */
  contract: ContractVO
  /**
   * 开票日期
   */
  invoiceDate: string

  /**
   * 开票金额
   */
  invoiceAmount: number

  /**
   * 回款金额
   */
  collectionAmount: number

  /**
   * 合同回款明细
   */
  collectionList: ContractCollectionVO[]
}

export interface ContractSettlementForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 合同id
   */
  contractId?: string
  contractNo: string
  contractType: string
  contractCategory: string
  contractDeptId: string | number
  contractStartDate: string
  contractEndDate: string
  contractAmount: number

  /**
   * 开票日期
   */
  invoiceDate?: string

  /**
   * 开票金额
   */
  invoiceAmount?: number

  /**
   * 回款金额
   */
  collectionAmount?: number

  /**
   * 回款明细
   */
  collectionList?: ContractSettlementItem[]

  /**
   * 附件
   */
  fileMap?: Record<string, string[]>

  // 流程数据

  // 是否盖章
  isSeal?: string
  // 是否指派其他人提交结算资料
  isAssign?: string
  // 指派人
  assignUser?: string
  // 结算资料
  settlements?: string
  // 备注
  remark?: string
}

/**
 * 实际回款明细
 */
export interface ContractSettlementItem {
  id?: string
  invoiceId?: string
  phaseItemId: string
  phaseName?: string
  phaseReceivableAmount: number
  phaseCollectedAmount: number
  phaseAssessedAmount: number
  phaseRewardedAmount: number
  phaseStartDate: string
  phaseEndDate: string
  phasePlanDate: string

  collectionAmount?: number
  // 考核金额（奖励：+, 考核：-）
  rewardAssessmentAmount: number
  // 变更金额
  changeAmount: number

  // 结算单 id 列表
  settlementIdList?: string[]
}

export interface ContractSettlementQuery extends PageQuery {
  /**
   * 合同id
   */
  contractId?: string

  /**
   * 开票日期
   */
  invoiceDate?: string

  /**
   * 开票金额
   */
  invoiceAmount?: number

  /**
   * 回款金额
   */
  collectionAmount?: number

  /**
   * 奖励金额
   */
  rewardAmount?: number

  /**
   * 考核金额
   */
  assessmentaAmount?: number

  /**
   * 日期范围参数
   */
  params?: any
}

export interface ContractSettlementWaitingVO {
  /**
   * 合同id
   */
  contractId?: number
  /**
   * 合同名称
   */
  contractName?: string
  /**
   * 合同编号
   */
  contractNo?: string
  /**
   * 合同执行阶段计划截至时间
   */
  endDate?: string
  /**
   * 合同执行阶段id
   */
  phaseItemId?: number
  /**
   * 合同执行阶段名称
   */
  phaseItemName?: string
  /**
   * 合同执行阶段计划回款月
   */
  planDate?: string
  /**
   * 合同执行阶段应收金额
   */
  receivableAmount?: number
  /**
   * 合同执行阶段备注
   */
  remark?: string
  /**
   * 合同执行阶段计划开始时间
   */
  startDate?: string
}

export interface ContractSettlementDoneVO {
  /**
   * 结算变更金额
   */
  changeAmount?: number
  /**
   * 合同id
   */
  contractId?: number
  /**
   * 合同名称
   */
  contractName?: string
  /**
   * 合同编号
   */
  contractNo?: string
  /**
   * 结算创建时间
   */
  createTime?: string
  /**
   * 合同执行阶段名称
   */
  phaseItemName?: string
  /**
   * 结算考核金额
   */
  rewardAssessmentAmount?: number
  /**
   * 结算单 id
   */
  settlementId?: string
  /**
   * 结算状态
   */
  settlementStatus?: string
}
