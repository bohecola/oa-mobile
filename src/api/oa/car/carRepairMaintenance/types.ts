export interface CarRepairMaintenanceVO {
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
   * 类型;常规保养、车辆维修
   */
  type: string

  /**
   * 里程数
   */
  mileage: number

  /**
   * 上次里程数
   */
  upMileage: number

  /**
   * 间隔里程数
   */
  intervalMileage: number

  /**
   * 保养/维修地点
   */
  address: string

  /**
   * 项目及单价
   */
  itemsPrice: string

  /**
   * 问题描述
   */
  description: string

  /**
   * 支付类型;对公付款、自行报销
   */
  paymentType: string

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

  createTime: string
}

export interface CarRepairMaintenanceForm extends BaseEntity {
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
   * 类型;常规保养、车辆维修
   */
  type?: string

  /**
   * 里程数
   */
  mileage?: number

  /**
   * 间隔里程数
   */
  intervalMileage?: number

  /**
   * 保养/维修地点
   */
  address?: string

  /**
   * 项目及单价
   */
  itemsPrice?: string

  /**
   * 问题描述
   */
  description?: string

  /**
   * 支付类型;对公付款、自行报销
   */
  paymentType?: string

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

export interface CarRepairMaintenanceQuery extends PageQuery {
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
   * 类型;常规保养、车辆维修
   */
  type?: string

  /**
   * 里程数
   */
  mileage?: number

  /**
   * 间隔里程数
   */
  intervalMileage?: number

  /**
   * 保养/维修地点
   */
  address?: string

  /**
   * 项目及单价
   */
  itemsPrice?: string

  /**
   * 问题描述
   */
  description?: string

  /**
   * 支付类型;对公付款、自行报销
   */
  paymentType?: string

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
   * 日期范围参数
   */
  params?: any
}
