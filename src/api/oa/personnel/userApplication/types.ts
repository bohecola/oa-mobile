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

  /**
   * 岗位级别
   */
  level?: number

  /**
   * 面试评价
   */
  employmentEvaluate?: string

  deptId?: string | number

  postId?: string | number

  sex?: string

  phonenumber?: string

  isProbation?: string

  probationCycle?: number

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
   * 是否推荐
   */
  isRecommend?: string
  /**
   * 推荐人
   */
  reference?: string
  /**
   * 是否实习生
   */
  isIntern?: string

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
