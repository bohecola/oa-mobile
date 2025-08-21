export interface CarRefuelingRecordVO {
  /**
   * ID
   */
  id: string

  /**
   * 类型
   */
  type: string

  /**
   * 流程业务ID(日常贵用申请>零星加油费)
   */
  wfBusinessKey: string

  /**
   * 是否部门用车
   */
  isDeptCar: string

  /**
   * 支付方式(油卡、现金)
   */
  payWay: string

  /**
   * 车牌号
   */
  carNumber: string

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
   * 燃油类型
   */
  fuelType: string

  /**
   * 加油日期
   */
  refuelingDate: string

  /**
   * 加油金额
   */
  amount: number

  /**
   * 油号
   */
  fuelLabel: string

  /**
   * 单价
   */
  unitPrice: number

  /**
   * 加油量
   */
  refuelingQuantity: number

  /**
   * 里程数
   */
  mileage: number

  /**
   * 公司名称
   */
  companyName: string

  /**
   * 部门名称
   */
  deptName: string

  /**
   * 地址
   */
  address: string

  /**
   * 坐标
   */
  coordinate: string

  /**
   * 备注
   */
  remark: string
}

export interface CarRefuelingRecordForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 类型
   */
  type?: string

  /**
   * 流程业务ID(日常贵用申请>零星加油费)
   */
  wfBusinessKey?: string

  /**
   * 是否部门用车
   */
  isDeptCar?: string

  /**
   * 支付方式(油卡、现金)
   */
  payWay?: string

  /**
   * 车牌号
   */
  carNumber?: string

  /**
   * 油卡卡号
   */
  cardNumber?: string

  /**
   * 油卡剩余金额
   */
  cardAvailableAmount?: number

  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属公司名称
   */
  companyName?: string

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 所属部门/项目名称
   */
  deptName?: string

  /**
   * 加油日期
   */
  refuelingDate?: string

  /**
   * 里程数
   */
  mileage?: number

  /**
   * 里程数图片
   */
  mileageFile?: string

  /**
   * 燃油类型
   */
  fuelType?: string

  /**
   * 油号
   */
  fuelLabel?: string

  /**
   * 单价
   */
  unitPrice?: number

  /**
   * 加油量
   */
  refuelingQuantity?: number

  /**
   * 加油金额
   */
  amount?: number

  /**
   * 发票图片
   */
  invoiceFile?: string

  /**
   * 地址
   */
  address?: string

  /**
   * 坐标
   */
  coordinate?: string

  /**
   * 备注
   */
  remark?: string
}

export interface CarRefuelingRecordQuery extends PageQuery {
  /**
   * 加油类型
   */
  type?: string

  /**
   * 车牌号
   */
  carNumber?: string

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
   * 加油日期
   */
  refuelingDate?: string

  /**
   * 查询类型
   */
  queryType?: string

  /**
   * 支付方式
   */
  payWay?: string

  /**
   * 日期范围参数
   */
  params?: any
}
