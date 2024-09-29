export interface UserDepartVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 员工id
   */
  userId: string | number

  /**
   * 实际离职日期
   */
  departDate: string

  /**
   * 离职原因
   */
  reason: string

  /**
   * 交接人
   */
  handoverPerson: number

  /**
   * 交接内容
   */
  handoverContent: string
}

export interface UserDepartForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 员工id
   */
  userId?: string | number

  userName?: string

  deptId?: string | number

  deptType?: string

  deptName?: string

  /**
   * 岗位级别
   */
  level?: number

  postName?: string

  /**
   * 实际离职日期
   */
  departDate?: string

  /**
   * 离职原因
   */
  reason?: string

  /**
   * 交接人
   */
  handoverPerson?: string

  /**
   * 交接内容
   */
  handoverContent?: string

  /**
   * 归档内容
   */
  documentContent?: string

  ossIdList?: string[]
}

export interface UserDepartQuery extends PageQuery {
  /**
   * 员工id
   */
  userId?: string | number

  /**
   * 实际离职日期
   */
  departDate?: string

  /**
   * 离职原因
   */
  reason?: string

  /**
   * 交接人
   */
  handoverPerson?: number

  /**
   * 交接内容
   */
  handoverContent?: string

  /**
   * 日期范围参数
   */
  params?: any
}
