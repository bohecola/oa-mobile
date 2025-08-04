import type { PurchaseVO } from '../purchase/types'
import type { PurchaseChangeItemVO } from '../purchaseChangeItem/types'

export interface PurchaseChangeVO {
  /**
   * ID
   */
  id: string

  /**
   * 部门ID
   */
  deptId: string

  /**
   * 采购ID
   */
  purchaseId: string

  /**
   * 金额(预算)
   */
  amount: number

  /**
   * 变更后金额
   */
  newAmount: number

  /**
   * 释放金额
   */
  releaseAmount: number

  /**
   * 备注
   */
  remark: string

  /**
   * 状态;0 草稿 1 审批中 2 执行中 4 已完成 9作废
   */
  status: string

  purchaseVo: PurchaseVO

  changeItemList: PurchaseChangeItemVO[]

  ossIdList: string[]
}

export interface PurchaseChangeForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 部门ID
   */
  deptId?: string

  /**
   * 采购ID
   */
  purchaseId?: string

  /**
   * 金额(预算)
   */
  amount?: number

  /**
   * 变更后金额
   */
  newAmount?: number

  /**
   * 释放金额
   */
  releaseAmount?: number

  /**
   * 备注
   */
  remark?: string

  /**
   * 状态;0 草稿 1 审批中 2 执行中 4 已完成 9作废
   */
  status?: string

  purchaseVo?: PurchaseVO

  changeItemList?: PurchaseChangeItemVO[]

  ossIdList?: string[]
}

export interface PurchaseChangeQuery extends PageQuery {
  /**
   * 采购ID
   */
  purchaseId?: string

  /**
   * 状态;0 草稿 1 审批中 2 执行中 4 已完成 9作废
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
