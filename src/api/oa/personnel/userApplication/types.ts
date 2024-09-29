export interface UserEmploymentVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 预入职员工id（user_pre_employment）
   */
  preEmploymentId: string | number

  /**
   * 民族
   */
  nation: string

  /**
   * 学历
   */
  education: string

  /**
   * 系统账号
   */
  userAccount: string

  /**
   * 预计到岗日期
   */
  hopeDate: string

  /**
   * 实际到岗日期
   */
  realDate: string

  /**
   * 工资
   */
  wages: number

  /**
   * 基本工资
   */
  baseWages: number

  /**
   * 绩效工资
   */
  performanceWages: number

  /**
   * 试用期薪资发放标准
   */
  probationWagesRate: number

  /**
   * 描述
   */
  description: string

  /**
   * 备注
   */
  remark: string
}

export interface UserEmploymentForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  name?: string

  businessKey?: string

  /**
   * 预入职员工id（user_pre_employment）
   */
  preEmploymentId?: string

  checked?: boolean

  level?: number // 岗位级别

  deptId?: string | number

  deptName?: string // 部门名称

  postId?: string | number

  postName?: string // 岗位名称

  sex?: string // 性别

  phonenumber?: string // 手机号

  isProbation?: string // 是否有试用期

  probationCycle?: number // 试用期时长

  /**
   * 民族
   */
  nation?: string

  /**
   * 学历
   */
  education?: string

  /**
   * 系统账号
   */
  userAccount?: string

  /**
   * 预计到岗日期
   */
  hopeDate?: string

  /**
   * 实际到岗日期
   */
  realDate?: string

  /**
   * 工资
   */
  wages?: number

  /**
   * 基本工资
   */
  baseWages?: number

  /**
   * 岗位工资
   */
  postWages?: number

  /**
   * 绩效工资
   */
  performanceWages?: number

  /**
   * 试用期薪资发放标准
   */
  probationWagesRate?: number

  /**
   * 描述
   */
  description?: string

  /**
   * 备注
   */
  remark?: string

  ossIdList?: string[]
}

export interface UserEmploymentQuery extends PageQuery {
  /**
   * 预入职员工id（user_pre_employment）
   */
  preEmploymentId?: string | number

  /**
   * 民族
   */
  nation?: string

  /**
   * 学历
   */
  education?: string

  /**
   * 系统账号
   */
  userAccount?: string

  /**
   * 预计到岗日期
   */
  hopeDate?: string

  /**
   * 实际到岗日期
   */
  realDate?: string

  /**
   * 工资
   */
  wages?: number

  /**
   * 基本工资
   */
  baseWages?: number

  /**
   * 绩效工资
   */
  performanceWages?: number

  /**
   * 试用期薪资发放标准
   */
  probationWagesRate?: number

  /**
   * 描述
   */
  description?: string

  /**
   * 日期范围参数
   */
  params?: any
}
