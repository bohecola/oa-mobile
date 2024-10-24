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
   * 原工作公司名称
   */
  oldCompanyName: string

  /**
   * 原工作部门
   */
  oldDeptId: string | number

  /**
   * 原工作部门名称
   */
  oldDeptName: string

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
   * 新工作公司名称
   */
  newCompanyName: string

  /**
   * 新原工作部门
   */
  newDeptId: string | number

  /**
   * 新工作部门名称
   */
  newDeptName: string

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
  userId?: string

  /**
   * 用户名称
   */
  userName?: string

  /**
   * 原工作公司
   */
  oldCompanyId: string | number

  /**
   * 原工作公司名称
   */
  oldCompanyName?: string

  /**
   * 类型;调动、借调
   */
  type?: string

  /**
   * 原工作部门
   */
  oldDeptId?: string | number

  /**
   * 原工作部门名称
   */
  oldDeptName?: string

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
  newCompanyId?: string | number

  /**
   * 原工作名称
   */
  newCompanyName?: string

  /**
   * 新原工作部门
   */
  newDeptId?: string | number

  /**
   * 原部门名称
   */
  newDeptName?: string
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
   * 薪资情况
   */
  newSalary?: number

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
