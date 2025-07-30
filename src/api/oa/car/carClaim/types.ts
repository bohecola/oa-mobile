export interface CarClaimVO {
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
   * 事故责任人
   */
  accidentPerson: string | number

  /**
   * 车辆负责人
   */
  carPerson: string

  /**
   * 出险时间
   */
  claimDate: string

  /**
   * 报险事由
   */
  reason: string

  /**
   * 事故责任认定
   */
  confirmationResponsibility: string

  /**
   * 我方赔付金额
   */
  amount: number

  /**
   * 状态;理赔中、已处理
   */
  status: string
}

export interface CarClaimForm extends BaseEntity {
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
   * 事故责任人
   */
  accidentPerson?: string | number

  /**
   * 车辆负责人
   */
  carPerson?: string

  /**
   * 出险时间
   */
  claimDate?: string

  /**
   * 报险事由
   */
  reason?: string

  /**
   * 事故责任认定
   */
  confirmationResponsibility?: string

  /**
   * 我方赔付金额
   */
  amount?: number

  /**
   * 状态;理赔中、已处理
   */
  status?: string
}

export interface CarClaimQuery extends PageQuery {
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
   * 出险时间
   */
  claimDate?: string

  /**
   * 状态;理赔中、已处理
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
