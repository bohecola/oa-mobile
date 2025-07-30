export interface CarDeptConfigVO {
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
   * 所属部门/项目名称
   */
  deptName: string

  /**
   * 用油标准金额(月)
   */
  fuelStandardAmount: number

  /**
   * 申请总加油费
   */
  fuelTotalAmount: number

  /**
   * 充值加油费
   */
  fuelRechargeAmount: string

  /**
   * 已用加油费
   */
  fuelUsedAmount: number

  /**
   * 可用加油费
   */
  fuelAvailableAmount: number

  /**
   * 备注
   */
  remark: string
}

export interface CarDeptConfigForm extends BaseEntity {
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
   * 所属部门/项目名称
   */
  deptName?: string

  /**
   * 用油标准金额(月)
   */
  fuelStandardAmount?: number

  /**
   * 申请总加油费
   */
  fuelTotalAmount?: number

  /**
   * 充值加油费
   */
  fuelRechargeAmount?: string

  /**
   * 已用加油费
   */
  fuelUsedAmount?: number

  /**
   * 可用加油费
   */
  fuelAvailableAmount?: number

  /**
   * 备注
   */
  remark?: string
}

export interface CarDeptConfigQuery extends Partial<PageQuery> {
  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 用油标准金额(月)
   */
  fuelStandardAmount?: number

  /**
   * 申请总加油费
   */
  fuelTotalAmount?: number

  /**
   * 充值加油费
   */
  fuelRechargeAmount?: string

  /**
   * 已用加油费
   */
  fuelUsedAmount?: number

  /**
   * 可用加油费
   */
  fuelAvailableAmount?: number

  /**
   * 日期范围参数
   */
  params?: any
}
