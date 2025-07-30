export interface CarInsuranceVO {
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
   * 保险公司
   */
  insuranceCompany: string

  /**
   * 交强险购买日期
   */
  compulsoryInsuranceDate: string

  /**
   * 交强险到期日期
   */
  compulsoryInsuranceExpirationDate: string

  /**
   * 交强险金额
   */
  compulsoryInsuranceAmount: number

  /**
   * 商业险购买日期
   */
  commercialInsuranceDate: string

  /**
   * 商业险到期日期
   */
  commercialInsuranceExpirationDate: string

  /**
   * 商业险金额
   */
  commercialInsuranceAmount: number

  /**
   * 申请事由
   */
  reason: string

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

export interface CarInsuranceForm extends BaseEntity {
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
   * 保险公司
   */
  insuranceCompany?: string

  /**
   * 交强险购买日期
   */
  compulsoryInsuranceDate?: string

  /**
   * 交强险到期日期
   */
  compulsoryInsuranceExpirationDate?: string

  /**
   * 交强险金额
   */
  compulsoryInsuranceAmount?: number

  /**
   * 商业险购买日期
   */
  commercialInsuranceDate?: string

  /**
   * 商业险到期日期
   */
  commercialInsuranceExpirationDate?: string

  /**
   * 商业险金额
   */
  commercialInsuranceAmount?: number

  /**
   * 申请事由
   */
  reason?: string

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

export interface CarInsuranceQuery extends PageQuery {
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
   * 保险公司
   */
  insuranceCompany?: string

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
