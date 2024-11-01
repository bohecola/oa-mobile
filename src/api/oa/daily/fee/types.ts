export interface DailyFeeVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 项目
   */
  projectId: number

  /**
   *预算类型(项目预算、部门预算)
   */
  subjectType: string

  /**
   * 部门id
   */
  deptId: string

  /**
   * 费用类型
   */
  feeType: number

  /**
   * 预算类别
   */
  subjectItemId: string | number

  /**
   * 金额
   */
  amount: number

  /**
   * 申请事由
   */
  reason: string

  /**
   * 是否行政协助
   */
  isAdministration: string

  /**
   * 证件类型(安全类培训费用、项目日常费用)
   */
  certificateType: string

  /**
   * 备注
   */
  remark: string
}

export interface DailyFeeForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 项目
   */
  projectId?: number

  /**
   *预算类型(项目预算、部门预算)
   */
  subjectType?: string

  /**
   * 部门id
   */
  deptId?: string

  /**
   * 费用类型
   */
  feeType?: number

  /**
   * 预算类别
   */
  subjectItemId?: string | number

  /**
   * 金额
   */
  amount?: number

  /**
   * 申请事由
   */
  reason?: string

  /**
   * 是否行政协助
   */
  isAdministration?: string

  /**
   * 证件类型(安全类培训费用、项目日常费用)
   */
  certificateType?: string

  /**
   * 备注
   */
  remark?: string

  no?: string

  componentNo?: string

  ossIdList?: string[]
}

export interface DailyFeeQuery extends PageQuery {
  /**
   * 项目
   */
  projectId?: number

  /**
   *预算类型(项目预算、部门预算)
   */
  subjectType?: string

  /**
   * 部门id
   */
  deptId?: string

  /**
   * 费用类型
   */
  feeType?: number

  /**
   * 预算类别
   */
  subjectItemId?: string | number

  /**
   * 金额
   */
  amount?: number

  /**
   * 申请事由
   */
  reason?: string

  /**
   * 是否行政协助
   */
  isAdministration?: string

  /**
   * 证件类型(安全类培训费用、项目日常费用)
   */
  certificateType?: string

  /**
   * 日期范围参数
   */
  params?: any
}
