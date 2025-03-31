export interface UserRegularizationForm {
  /**
   * 流程id
   */
  id?: string
  /**
   * 用户id
   */
  userId?: string | number
  /**
   * 用户名称
   */
  userName?: string
  /**
   * 部门id
   */
  deptId?: string
  /**
   * 部门名称
   */
  deptName?: string
  /**
   * 岗位id
   */
  postId?: string
  /**
   * 岗位id
   */
  postName?: string
  /**
   * 岗位级别
   */
  level?: number

  /**
   * 入职时间
   */
  entryCompanyDate?: string

  /**
   * 试用期时长
   */
  probationPeriod?: number

  /**
   * 转正日期
   */
  formalDate?: string

  /**
   * 用人单位意见（0正常、1提前，）
   */
  formalType?: string

  /**
   * 部门类型（公司、部门、项目部）
   */
  deptType?: string
  /**
   * 上传文件
   */
  files?: string
  /**
   * 描述
   */
  description?: string
  /**
   * 附件列表
   */
  ossIdList?: string[]

}
