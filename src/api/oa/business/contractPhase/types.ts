import type { ContractVO } from '../contract/types'
import type { ContractPhaseItemVO } from '../contractPhaseItem/types'
import type { ContractInvoiceVO } from '../contractInvoice/types'
import type { ContractReceiptVO } from '../contractrReceipt/types'

export interface ContractPhaseListVO extends ContractVO {
  phaseId: string
  phaseStatus: string
  invoiceTotalAmount: number
  receiptTotalAmount: number
  receivableTotalAmount: number
  rewardTotalAmount: number
  assessmentaTotalAmount: number
  rewardAssessmentTotalAmount: number
  phaseItemList: ContractPhaseItemVO[]
  invoiceList: ContractInvoiceVO[]
  receiptList: ContractReceiptVO[]
}

export interface ContractPhaseVO {
  /**
   * ID
   */
  id: string

  /**
   * 合同ID
   */
  contractId: string

  /**
   * 状态0 草稿 1 审批中 2 审批通过 9作废
   */
  status: string

  /**
   * 备注
   */
  remark: string

  /**
   * 子表数据
   */
  itemList: ContractPhaseItemVO[]
}

export interface ContractPhaseForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 合同ID
   */
  contractId?: string

  /**
   * 状态0 草稿 1 审批中 2 审批通过 9作废
   */
  status?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 子表数据
   */
  itemList?: ContractPhaseItemVO[]
}

export interface ContractPhaseQuery extends Partial<PageQuery> {
  /**
   * 状态0 草稿 1 审批中 2 审批通过 9作废
   */
  status?: string
  queryType?: string
  isPhase?: string
  contractId?: string
  contractNo?: string
  contractName?: string
  contractCategory?: string
  contractStatus?: string
  deptId?: string
  phaseItemPlanDate?: string
  createUserName?: string
  receiptStatus?: string
  // 开票未回款
  isKpwhk?: string
  // 年度
  years?: string
  // 天数
  days?: string
  // 权限
  isCheckPermission?: string

  /**
   * 日期范围参数
   */
  params?: any
}

export interface ContractSumAmountVO {
  /**
   * 合同总金额
   */
  contractTotalAmount?: number
  /**
   * 开票总金额
   */
  invoiceTotalAmount?: number
  /**
   * 回款总金额
   */
  receiptTotalAmount?: number
  /**
   * 计划回款总金额
   */
  receivableTotalAmount?: number
  /**
   * 奖励总金额
   */
  rewardTotalAmount?: number
  /**
   * 考核总金额
   */
  assessmentaTotalAmount?: number
  /**
   * 考核奖励总金额
   */
  rewardAssessmentTotalAmount?: number
  /**
   * 变更总金额
   */
  changeTotalAmount?: number
  /**
   * 待回款总金额（开票总金额 - 回款总金额）
   */
  pendingPaymentTotalAmount?: number
}

export interface AmountItem {
  label: string
  name: string
  value: string
  typeName?: string
}

export interface GroupAmountVO {
  contractTotalAmount: AmountItem[]
  invoiceTotalAmount: AmountItem[]
  receiptTotalAmount: AmountItem[]
  invoiceNotReceiptTotalAmount: AmountItem[]
}

export interface ContractPhaseGroupAmountVO {
  total: ContractSumAmountVO
  category: GroupAmountVO
  dept: GroupAmountVO
}
