export interface UserTransferVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 用户id
   */
  userId: string | number

  /**
   * 用户名称
   */
  userName: string

  /**
   * 类型;调动、借调
   */
  type: string

  /**
   * 原工作公司
   */
  oldCompanyId: string | number

  /**
   * 原工作部门
   */
  oldDeptId: string | number

  /**
   * 原工作岗位
   */
  oldPostId: string | number

  /**
   * 原工作岗位名称
   */
  oldPostName: string

  /**
   * 新工作公司
   */
  newCompanyId: string | number

  /**
   * 新原工作部门
   */
  newDeptId: string | number

  /**
   * 新原工作岗位
   */
  newPostId: string | number

  /**
   * 新工作岗位名称
   */
  newPostName: string

  /**
   * 生效日期
   */
  startDate: string

  /**
   * 截止日期
   */
  endDate: string

  /**
   * 薪资情况
   */
  newSalary: number

  /**
   * 调用原因
   */
  reason: string

  /**
   * 备注
   */
  remark: string
}

export interface UserTransferForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 用户id
   */
  userId?: string | number

  /**
   * 用户名称
   */
  userName?: string

  /**
   * 原工作公司
   */
  oldCompanyId: string

  /**
   * 类型;调动、借调
   */
  type?: string

  /**
   * 原工作部门
   */
  oldDeptId?: string | number

  /**
   * 原工作岗位
   */
  oldPostId?: string | number

  /**
   * 原工作岗位名称
   */
  oldPostName?: string

  /**
   * 新工作公司
   */
  newCompanyId?: string

  /**
   * 新原工作部门
   */
  newDeptId?: string | number

  /**
   * 新原工作岗位
   */
  newPostId?: string | number

  /**
   * 原岗位名称
   */
  newPostName?: string

  /**
   * 生效日期
   */
  startDate?: string

  /**
   * 截止日期
   */
  endDate?: string

  /**
   * 是否具有主管权限
   */
  iscommander?: string

  /**
   * 主管权限交接人
   */
  commanderPowerHandover?: string

  /**
   * 原部门购买特殊商业保险
   */
  oldSpecialCommercialInsurance: string

  /**
   * 新部门购买特殊商业保险
   */
  newSpecialCommercialInsurance: string

  /**
   * 新部门类型
   */
  newDeptType?: string
  /**
   * 旧部门类型
   */
  oldDeptType?: string

  /**
   * 调用原因
   */
  reason?: string

  /**
   * 备注
   */
  remark?: string

  ossIdList?: string[]

  status?: string
}

export interface UserTransferQuery extends PageQuery {
  /**
   * 用户id
   */
  userId?: string

  /**
   * 类型;调动、借调
   */
  type?: string

  keyword?: string

  /**
   * 原工作公司
   */
  oldCompanyId?: string | number

  /**
   * 原工作部门
   */
  oldDeptId?: string | number

  /**
   * 原工作岗位
   */
  oldPostId?: string | number

  /**
   * 新工作公司
   */
  newCompanyId?: string | number

  /**
   * 新原工作部门
   */
  newDeptId?: string | number

  /**
   * 新原工作岗位
   */
  newPostId?: string | number

  /**
   * 生效日期
   */
  startDate?: string

  /**
   * 截止日期
   */
  endDate?: string

  /**
   * 薪资情况
   */
  newSalary?: number

  /**
   * 调用原因
   */
  reason?: string

  /**
   * 日期范围参数
   */
  params?: any
}
