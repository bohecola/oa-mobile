export interface PurchaseChangeItemVO {
  /**
   * ID
   */
  id: string

  /**
   * 采购变更ID
   */
  purchaseChangeId: string

  /**
   * 采购清单明细ID
   */
  purchaseItemId: string

  /**
   * 项目预算项id
   */
  psiId: string

  /**
   * 预算金额
   */
  budgetAmount: number

  /**
   * 申请中
   */
  applyingAmount: number

  /**
   * 已申请
   */
  finishAmount: number

  /**
   * 剩余金额
   */
  availableAmount?: number

  /**
   * 预算科目责任部门id
   */
  subjectItemDeptId: string | number

  /**
   * 物品名称
   */
  name: string

  /**
   * 不含税合计
   */
  totalAmount: number

  /**
   * 变更后不含税合计
   */
  newTotalAmount: number

  /**
   * 释放总金额
   */
  releaseTotalAmount: number
}

export interface PurchaseChangeItemForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 采购变更ID
   */
  purchaseChangeId?: string

  /**
   * 采购清单明细ID
   */
  purchaseItemId?: string

  /**
   * 项目预算项id
   */
  psiId?: string

  /**
   * 预算科目责任部门id
   */
  subjectItemDeptId?: string | number

  /**
   * 物品名称
   */
  name?: string

  /**
   * 不含税合计
   */
  totalAmount?: number

  /**
   * 变更后不含税合计
   */
  newTotalAmount?: number

  /**
   * 释放总金额
   */
  releaseTotalAmount?: number
}

export interface PurchaseChangeItemQuery extends PageQuery {
  /**
   * 采购变更ID
   */
  purchaseChangeId?: string

  /**
   * 采购清单明细ID
   */
  purchaseItemId?: string

  /**
   * 项目预算项id
   */
  psiId?: string

  /**
   * 日期范围参数
   */
  params?: any
}
