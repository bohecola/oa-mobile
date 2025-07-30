export interface CarFuelCardRecordVO {
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
   * 类型;充值、消费
   */
  type: string

  /**
   * 金额
   */
  amount: number

  /**
   * 剩余可用加油费
   */
  availableAmount: number

  /**
   * 操作日期
   */
  operateDate: string

  /**
   * 关联类型
   */
  objectType: string

  /**
   * 关联ID
   */
  objectId: string

  /**
   * 备注
   */
  remark: string
}

export interface CarFuelCardRecordForm extends BaseEntity {
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
   * 类型;充值、消费
   */
  type?: string

  /**
   * 金额
   */
  amount?: number

  /**
   * 剩余可用加油费
   */
  availableAmount?: number

  /**
   * 操作日期
   */
  operateDate?: string

  /**
   * 关联类型
   */
  objectType?: string

  /**
   * 关联ID
   */
  objectId?: string

  /**
   * 备注
   */
  remark?: string
}

export interface CarFuelCardRecordQuery extends PageQuery {
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
   * 类型;充值、消费
   */
  type?: string

  /**
   * 日期范围参数
   */
  params?: any
}
