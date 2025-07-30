export interface CarAnnualInspectionVO {
  /**
   * ID
   */
  id: string

  /**
   * 车牌号
   */
  carNumber: string

  /**
   * 所属公司
   */
  companyId: string | number

  /**
   * 所属部门/项目
   */
  deptId: string | number

  /**
   * 年审方式;自行审验、第三方审验
   */
  method: string

  /**
   * 审验日期
   */
  inspectionDate: string

  /**
   * 到期日期
   */
  expirationDate: string

  /**
   * 申请事由
   */
  reason: string

  /**
   * 金额
   */
  amount: number

  /**
   * 流程业务ID
   */
  wfBusinessKey: number

  /**
   * 流程模型KEY
   */
  wfModelKey: string

  /**
   * 状态
   */
  status: string
}

export interface CarAnnualInspectionForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 车牌号
   */
  carNumber?: string

  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 年审方式;自行审验、第三方审验
   */
  method?: string

  /**
   * 审验日期
   */
  inspectionDate?: string

  /**
   * 到期日期
   */
  expirationDate?: string

  /**
   * 申请事由
   */
  reason?: string

  /**
   * 金额
   */
  amount?: number

  /**
   * 流程业务ID
   */
  wfBusinessKey?: number

  /**
   * 流程模型KEY
   */
  wfModelKey?: string

  /**
   * 状态
   */
  status?: string
}

export interface CarAnnualInspectionQuery extends PageQuery {
  /**
   * 车牌号
   */
  carNumber?: string

  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 年审方式;自行审验、第三方审验
   */
  method?: string

  /**
   * 审验日期
   */
  inspectionDate?: string

  /**
   * 到期日期
   */
  expirationDate?: string

  /**
   * 申请事由
   */
  reason?: string

  /**
   * 金额
   */
  amount?: number

  /**
   * 流程业务ID
   */
  wfBusinessKey?: number

  /**
   * 流程模型KEY
   */
  wfModelKey?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 提醒天数
   */
  remindDay?: string

  /**
   * 日期范围参数
   */
  params?: any
}
