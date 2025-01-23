export interface UserEmploymentVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 预入职员工id（user_pre_employment）
   */
  preEmploymentId: string | number

  preEmploymentName?: string

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

  employmentId?: string

  /**
   * 面试评价表的复选框
   */
  checked?: boolean

  /**
   * 岗位级别
   */
  level?: number

  /**
   * 面试评价
   */
  employmentEvaluate?: string

  /**
   * 部门id
   */
  deptId?: string | number

  /**
   * 岗位id
   */
  postId?: string | number

  /**
   * 性别
   */
  sex?: string

  /**
   * 年龄
   */
  age?: number

  /**
   * 持证情况
   */
  certificates?: string

  /**
   * 其他证书
   */
  otherCertificates?: string

  /**
   * 面试日期
   */
  interviewDate?: string

  /**
   * 是否需要业主面试
   */
  isOwnerInterview?: string

  /**
   * 面试形式
   */
  interviewWay?: string

  /**
   * 手机号
   */
  phonenumber?: string

  /**
   * 是否有试用期
   */
  isProbation?: string

  /**
   * 试用期时长
   */
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
   * 推荐来源
   */
  reference?: string

  status?: string
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
