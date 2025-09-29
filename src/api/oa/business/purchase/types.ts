import type { PurchaseChangeVO } from '../purchaseChange/types'

export interface PurchaseVO extends BaseEntity {
  /**
   * ID
   */
  id: string

  /**
   * 编号
   */
  no: string

  /**
   * 采购性质：合同采购、签证采购
   */
  nature: string

  /**
   * 签证收入金额/增值税率
   */
  taxRateList: TaxRateVO[]

  /**
   * 预算类型
   */
  subjectType?: string

  /**
   * 预算id
   */
  psId?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 项目id
   */
  projectId: string

  /**
   * 采购类型
   */
  type: string

  /**
   * 采购方式
   */
  purchaseMethod: string

  /**
   * 业务类别
   */
  businessCategory: string

  /**
   * 物品类别
   */
  objectCategory: string

  /**
   * 服务类别
   */
  serviceCategory: string

  /**
   * 租赁类型
   */
  leaseType: string

  /**
   * 是否有押金
   */
  isDeposit: string

  /**
   * 关联销售合同
   */
  contractId: string

  /**
   * 合同编号
   */
  contractNo?: string

  /**
   * 合同执行情况
   */
  contractExecute: string

  /**
   * 是否业主单独结算
   */
  isOwnerSettlement: string

  /**
   * 含税总金额
   */
  amount: number

  /**
   * 不含税总金额
   */
  notTaxAmount: number

  /**
   * 含税实际采购总金额
   */
  realAmount?: number

  /**
   * 不含税实际采购总金额
   */
  notTaxRealAmount?: number

  /**
   * 采购说明
   */
  description: string

  /**
   * 申购附件
   */
  file: number

  /**
   * 验收附件
   */
  checkFiles?: string

  /**
   * 备注
   */
  remark: string

  /**
   * 采购清单
   */
  itemList?: PurchaseItemVO[]

  /**
   * 采购合同
   */
  purchaseContractIds?: string

  /**
   * 附件列表
   */
  ossIdList?: string[]

  /**
   * 采购变更
   */
  purchaseChange?: PurchaseChangeVO

  /**
   * 签证收入情况说明
   */
  qzIncomeDescription?: string
}

export interface PurchaseForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 编号
   */
  no?: string

  /**
   * 流程名称
   */
  processName?: string

  /**
   * 采购性质：合同采购、签证采购
   */
  nature?: string

  /**
   * 签证收入金额/增值税率
   */
  taxRateList?: TaxRateVO[]

  /**
   * 预算类型
   */
  subjectType?: string

  /**
   * 预算id
   */
  psId?: string

  /**
   * 部门id
   */
  deptId?: string | number

  /**
   * 采购类型
   */
  type?: string

  /**
   * 采购方式
   */
  purchaseMethod?: string

  /**
   * 业务类别;
   */
  businessCategory?: string

  /**
   * 物品类别
   */
  objectCategory?: string

  /**
   * 服务类别
   */
  serviceCategory?: string

  /**
   * 租赁类型
   */
  leaseType?: string

  /**
   * 是否有押金
   */
  isDeposit?: string

  /**
   * 合同
   */
  contractId?: string

  /**
   * 合同编号
   */
  contractNo?: string

  /**
   * 合同名称
   */
  contractName?: string

  /**
   * 合同执行情况
   */
  contractExecute?: string

  /**
   * 是否业主单独结算
   */
  isOwnerSettlement?: string

  /**
   * 含税总金额
   */
  amount?: number

  /**
   * 不含税总金额
   */
  notTaxAmount?: number

  /**
   * 含税实际采购总金额
   */
  realAmount?: number

  /**
   * 不含税实际采购总金额
   */
  notTaxRealAmount?: number

  /**
   * 采购说明
   */
  description?: string

  /**
   * 申购附件
   */
  file?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 采购清单
   */
  itemList?: PurchaseItemVO[]

  /**
   * 采购合同
   */
  purchaseContractIds?: string

  /**
   * 是否存在采购合同
   */
  hasPurchaseContract?: string

  /**
   * 采购附件
   */
  purchaseFiles?: string

  /**
   * 验收附件
   */
  checkFiles?: string

  /**
   * 附件列表
   */
  ossIdList?: string[]

  /**
   * 采购变更
   */
  purchaseChange?: PurchaseChangeVO

  /**
   * 签证收入情况说明
   */
  qzIncomeDescription?: string
}

export interface PurchaseQuery extends PageQuery {
  /**
   * 编号
   */
  no?: string

  /**
   * 项目id
   */
  projectId?: string

  /**
   * 采购类型
   */
  type?: string

  /**
   * 业务类别
   */
  businessCategory?: string

  /**
   * 物品类别
   */
  objectCategory?: string

  /**
   * 服务类别
   */
  serviceCategory?: string

  /**
   * 租赁类型
   */
  leaseType?: string

  /**
   * 是否有押金
   */
  isDeposit?: string

  /**
   * 关联销售合同
   */
  contractId?: string

  /**
   * 合同执行情况
   */
  contractExecute?: string

  /**
   * 查询类型
   */
  queryType?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 状态列表
   */
  statusList?: (string | number)[]

  /**
   * 申请部门
   */
  createDept?: string | number

  /**
   * 申请人
   */
  createUserName?: string

  /**
   * 主键列表
   */
  ids?: string[]

  /**
   * 日期范围参数
   */
  params?: any

  /**
   * 关键字
   */
  keyword?: string

  /**
   * 是否采购变更
   */
  isPurchaseChange?: string
}

export interface PurchaseItemVO {
  /**
   * ID
   */
  id?: string

  /**
   * 采购id
   */
  purchaseId?: string

  /**
   * 项目预算项id（oa_project_subject_item）
   */
  psiId?: string

  /**
   * 预算责任部门id
   */
  subjectItemDeptId?: string | number

  /**
   * 剩余金额
   */
  availableAmount?: number

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
   * 物品名称
   */
  name?: string

  /**
   * 品牌
   */
  brand?: string

  /**
   * 规格型号
   */
  specsModel?: string

  /**
   * 数量
   */
  num?: number

  /**
   * 单位
   */
  unit?: string

  /**
   * 发票类型
   */
  invoiceType?: string
  /**
   * 税率
   */
  taxRate?: string

  /**
   * 含税单价
   */
  taxAmount?: number
  /**
   * 不含税单价 - 原单价
   */
  amount?: number

  /**
   * 含税合计
   */
  taxTotalAmount?: number
  /**
   * 不含税合计 - 原含税合计
   */
  totalAmount?: number

  /**
   * 含税实际单价
   */
  taxRealAmount?: number
  /**
   * 不含税实际单价 - 原实际单价
   */
  realAmount?: number

  /**
   * 含税实际合计
   */
  taxRealTotalAmount?: number
  /**
   * 不含税实际合计 - 原实际含税合计
   */
  realTotalAmount?: number

  /**
   * 询价途径
   */
  inquiryWay?: string

  /**
   * 指定供应商
   */
  supplier?: string

  /**
   * 备注
   */
  remark?: string

  [key: string]: any
}

/**
 * 签证收入金额/增值税率
 */
export interface TaxRateVO {
  index?: string
  amount: number
  taxRate: string
  notTaxAmount: number
  createName?: string
  createTime?: string
  editList?: TaxRateVO[]
}
