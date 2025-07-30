export interface CarInfoVO {
  /**
   * ID
   */
  id: string

  /**
   * 名称
   */
  name: string

  /**
   * 资产编号
   */
  goodsNo: string

  /**
   * 车牌号
   */
  number: string

  /**
   * 车架号
   */
  vinNo: string

  /**
   * 发动机号
   */
  engineNo: string

  /**
   * 品牌型号
   */
  brandModel: string

  /**
   * 车辆类型
   */
  vehicleType: string

  /**
   * 颜色
   */
  color: string

  /**
   * 驱动情况;两驱、四驱
   */
  driving: string

  /**
   * 燃油类型;汽油、柴油
   */
  fuelType: string

  /**
   * 购入价值（含税）
   */
  purchasePrice: number

  /**
   * 购入日期
   */
  purchaseDate: string

  /**
   * 出库日期
   */
  outboundDate: string

  /**
   * 所属公司
   */
  companyId: string

  /**
   * 所属部门/项目
   */
  deptId: string

  /**
   * 状态;在用、停用、报废
   */
  status: string

  /**
   * 备注
   */
  remark: string
}

export interface CarInfoForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 名称
   */
  name?: string

  /**
   * 资产编号
   */
  goodsNo?: string

  /**
   * 车牌号
   */
  number?: string

  /**
   * 车架号
   */
  vinNo?: string

  /**
   * 发动机号
   */
  engineNo?: string

  /**
   * 品牌型号
   */
  brandModel?: string

  /**
   * 车辆类型
   */
  vehicleType?: string

  /**
   * 颜色
   */
  color?: string

  /**
   * 驱动情况;两驱、四驱
   */
  driving?: string

  /**
   * 燃油类型;汽油、柴油
   */
  fuelType?: string

  /**
   * 购入价值（含税）
   */
  purchasePrice?: number

  /**
   * 购入日期
   */
  purchaseDate?: string

  /**
   * 出库日期
   */
  outboundDate?: string

  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 状态;在用、停用、报废
   */
  status?: string

  /**
   * 备注
   */
  remark?: string
}

export interface CarInfoQuery extends Partial<PageQuery> {
  /**
   * 资产编号
   */
  goodsNo?: string

  /**
   * 车牌号
   */
  number?: string

  /**
   * 品牌型号
   */
  brandModel?: string

  /**
   * 车辆类型
   */
  vehicleType?: string

  /**
   * 所属公司
   */
  companyId?: string | number

  /**
   * 所属部门/项目
   */
  deptId?: string | number

  /**
   * 状态;在用、停用、报废
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
