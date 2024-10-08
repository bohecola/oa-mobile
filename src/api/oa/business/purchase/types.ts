export interface PurchaseVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 编号
   */
  no: string

  /**
   * 项目id
   */
  projectId: string | number

  /**
   * 采购类型; 物资采购 外委采购 框架采购
   */
  type: string

  /**
   * 业务类别; 运维（新能源电站运维）电力工程类项目 电站工程类项目 信息化类项目检修试验类项目其他 管理 销售 研发
   */
  businessCategory: string

  /**
   * 物品类别; 生产物资 工程物资 员工福利 办公用品 生活用品 劳保用品 安全物资 其他
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
   * 关联收入合同
   */
  contractId: string | number

  /**
   * 合同执行情况; 合同内  合同外
   */
  contractExecute: string

  /**
   * 是否业主单独结算
   */
  isOwnerSettlement: string

  /**
   * 金额
   */
  amount: number

  /**
   * 实际采购金额
   */
  realAmount: number

  /**
   * 采购说明
   */
  description: string

  /**
   * 申购附件
   */
  file: number

  /**
   * 备注
   */
  remark: string

  /**
   * 采购清单
   */
  itemList?: PurchaseItemVO[]
}

export interface PurchaseForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 编号
   */
  no?: string

  /**
   * 项目id
   */
  projectId?: string | number

  /**
   * 项目名称
   */
  projectName?: string

  /**
   * 采购类型; 物资采购 外委采购 框架采购
   */
  type?: string

  /**
   * 业务类别; 运维（新能源电站运维）电力工程类项目 电站工程类项目 信息化类项目检修试验类项目其他 管理 销售 研发
   */
  businessCategory?: string

  /**
   * 物品类别; 生产物资 工程物资 员工福利 办公用品 生活用品 劳保用品 安全物资 其他
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
   * 关联收入合同
   */
  contractId?: string | number

  /**
   * 合同名称
   */
  contractName?: string

  /**
   * 合同执行情况; 合同内  合同外
   */
  contractExecute?: string

  /**
   * 是否业主单独结算
   */
  isOwnerSettlement?: string

  /**
   * 金额
   */
  amount?: number

  /**
   * 实际采购金额
   */
  realAmount?: number

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
  itemList: PurchaseItemVO[]
  /**
   * 附件列表
   */
  ossIdList?: string[]
}

export interface PurchaseQuery extends PageQuery {
  /**
   * 编号
   */
  no?: string

  /**
   * 项目id
   */

  projectId?: string | number

  /**
   * 项目名称
   */

  projectName?: string
  /**
   * 采购类型; 物资采购 外委采购 框架采购
   */
  type?: string

  /**
   * 业务类别; 运维（新能源电站运维）电力工程类项目 电站工程类项目 信息化类项目检修试验类项目其他 管理 销售 研发
   */
  businessCategory?: string

  /**
   * 物品类别; 生产物资 工程物资 员工福利 办公用品 生活用品 劳保用品 安全物资 其他
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
   * 关联收入合同
   */
  contractId?: string | number

  /**
   * 合同执行情况; 合同内  合同外
   */
  contractExecute?: string

  /**
   * 日期范围参数
   */
  params?: any
}

export interface PurchaseItemVO {
  /**
   * ID
   */
  id?: string | number

  /**
   * 采购id
   */
  purchaseId?: string | number

  /**
   * 项目预算项id（oa_project_subject_item）
   */
  psiId?: string | number

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
   * 单价(元)
   */
  amount?: number

  /**
   * 含税合计(元)
   */
  totalAmount?: number

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
}
