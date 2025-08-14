export interface DeptDepartureVO {
  /**
   * ID
   */
  id: string

  /**
   * 申请类型
   */
  type: string

  /**
   * 部门/项目部ID
   */
  deptId: string | number

  /**
   * 撤场日期
   */
  departureDate: string

  /**
   * 撤场说明
   */
  reason: string

  /**
   * 状态
   */
  status: string

  /**
   * 附件列表
   */
  ossIdList: string[]
}

export interface DeptDepartureForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 申请类型
   */
  type: string

  /**
   * 部门/项目部ID
   */
  deptId?: string | number

  /**
   * 撤场日期
   */
  departureDate?: string

  /**
   * 撤场说明
   */
  reason?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 附件列表
   */
  ossIdList?: string[]

  /**
   * 是否指派其他人提交
   */
  isAssign?: string

  /**
   * 指派人
   */
  assignUser?: string
}

export interface DeptDepartureQuery extends PageQuery {
  /**
   * 部门/项目部ID
   */
  deptId?: string | number

  /**
   * 撤场日期
   */
  departureDate?: string

  /**
   * 撤场说明
   */
  reason?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
