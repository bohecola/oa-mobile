export interface CarFuelCardVO {
  /**
   * ID
   */
  id: string

  /**
   * 油卡卡号
   */
  cardNumber: string

  /**
   * 所属公司
   */
  companyId: string | number

  /**
   * 所属部门/项目
   */
  deptId: string | number

  /**
   * 充值总金额
   */
  rechargeAmount: number

  /**
   * 支出总金额
   */
  expendAmount: number

  /**
   * 剩余可用加油费
   */
  availableAmount: number

  /**
   * 备注
   */
  remark: string

  /**
   * 状态;正常、停用
   */
  status: string
}

export interface CarFuelCardForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 油卡卡号
   */
  cardNumber?: string

  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 充值总金额
   */
  rechargeAmount?: number

  /**
   * 支出总金额
   */
  expendAmount?: number

  /**
   * 剩余可用加油费
   */
  availableAmount?: number

  /**
   * 备注
   */
  remark?: string

  /**
   * 状态;正常、停用
   */
  status?: string
}

export interface CarFuelCardQuery extends Partial<PageQuery> {
  /**
   * 油卡卡号
   */
  cardNumber?: string

  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 状态;正常、停用
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
