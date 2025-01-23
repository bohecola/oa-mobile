/**
 * 见习员工转正办理业务对象
 */
export interface InternshipEmploymentForm {
  /**
   * 创建者
   */
  createBy?: number
  /**
   * 创建部门
   */
  createDept?: number
  /**
   * 创建时间
   */
  createTime?: Date
  /**
   * ID(见习员工转正办理表)
   */
  id: number | string

  /**
   * 用户id
   */
  userId?: string

  userName?: string
  /**
   * 新部门ID
   */
  newDeptId?: number

  deptType?: string
  /**
   * 新岗位ID
   */
  newPostId?: number
  /**
   * 原部门ID
   */
  oldDeptId?: number
  /**
   * 原岗位ID
   */
  oldPostId?: number
  /**
   * 附件列表
   */
  ossIdList?: string[]
  /**
   * 备注
   */
  remark?: string
  /**
   * 状态; 5实习期 0 试用期 1转正中 2 在职
   */
  status?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 员工信息表ID
   */
  userInfoId: number

  /**
   * 性别
   */
  sex?: string

  /**
   * 年龄
   */
  age?: number

  /**
   * 民族
   */
  nation?: string

  /**
   * 学历
   */
  education?: string
  /**
   * 是否有试用期
   */
  isProbation?: string

  /**
   * 开始时间
   */
  startDate?: string

  /**
   * 结束时间
   */
  endDate?: string
  /**
   * 试用期时长
   */
  probationPeriod?: number

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
   * 持证情况
   */
  certificates?: string

  /**
   * 其他证书
   */
  otherCertificates?: string

  /**
   * 是否购买商业保险
   */
  specialCommercialInsurance?: string

  /**
   * 录用正式员工生效日期
   */
  formalDate?: string

  /**
   * 人力资源部经理
   */
  humanResourcesOpinion?: string
}

/**
 * InternshipEmploymentVO
 */
export interface InternshipEmploymentVO {
  /**
   * ID(见习员工转正办理表)
   */
  id?: number
  /**
   * 新部门ID
   */
  newDeptId?: number
  /**
   * 新部门ID
   */
  newDeptName?: string
  /**
   * 新岗位ID
   */
  newPostId?: string
  /**
   * 新岗位ID
   */
  newPostName?: string
  /**
   * 原部门ID
   */
  oldDeptId?: number
  /**
   * 原部门
   */
  oldDeptName?: string
  /**
   * 原岗位ID
   */
  oldPostId?: string
  /**
   * 原岗位ID
   */
  oldPostName?: string
  /**
   * 附件列表
   */
  ossIdList?: number[]
  /**
   * 备注
   */
  remark?: string
  /**
   * 状态; 5实习期 0 试用期 1转正中 2 在职
   */
  status?: string
  /**
   * 员工信息表ID
   */
  userInfoId?: number
  /**
   * 性别
   */
  sex?: string

  /**
   * 年龄
   */
  age?: number

  /**
   * 民族
   */
  nation?: string

  /**
   * 学历
   */
  education?: string
  /**
   * 是否有试用期
   */
  isProbation?: string
  /**
   * 试用期时长
   */
  probationCycle?: number

  /**
   * 试用期薪资发放标准
   */
  probationWagesRate?: number

  /**
   * 持证情况
   */
  certificates?: string

  /**
   * 其他证书
   */
  otherCertificates?: string

  /**
   * 是否购买商业保险
   */
  specialCommercialInsurance?: string

  /**
   * 录用正式员工生效日期
   */
  formalDate?: string

  /**
   * 人力资源部经理
   */
  humanResourcesOpinion?: string
}
