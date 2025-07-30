export interface CarDeptFuelRecordVO {
  /**
   * ID
   */
  id: string

  /**
   * 所属公司
   */
  companyId: string | number

  /**
   * 所属部门/项目
   */
  deptId: string | number

  /**
   * 申请加油费
   */
  amount: number

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

export interface CarDeptFuelRecordForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 申请加油费
   */
  amount?: number

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

export interface CarDeptFuelRecordQuery extends Partial<PageQuery> {
  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 日期范围参数
   */
  params?: any
}
