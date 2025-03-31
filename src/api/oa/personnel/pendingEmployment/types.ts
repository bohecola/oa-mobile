/**
 * UserPreEmploymentAndEmploymentBo
 */
export interface UserPendingEmploymentForm {
  id?: string
  /**
   * 入职申请表ID
   */
  employmentId?: string

  /**
   * 状态
   */
  status?: string
  /**
   * 年龄
   */
  age?: number
  /**
   * 基本工资
   */
  baseWages?: number
  /**
   * 持证情况
   */
  certificates?: string

  level?: number
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
  createTime?: string
  /**
   * 部门id
   */
  deptId?: number
  /**
   * 描述
   */
  description?: string
  /**
   * 学历
   */
  education?: string
  /**
   * 面试评价
   */
  employmentEvaluate?: string

  /**
   * 预计到岗日期
   */
  hopeDate?: string
  /**
   * 面试日期
   */
  interviewDate?: string
  /**
   * 面试形式(现场面试、视频面试)
   */
  interviewWay?: string
  /**
   * 是否实习生
   */
  isIntern?: string
  /**
   * 是否需要业主面试(Y 是 N否)
   */
  isOwnerInterview?: string
  /**
   * 是否有试用期(Y 是 N否)
   */
  isProbation?: string
  /**
   * 是否推荐
   */
  isRecommend?: string
  /**
   * 姓名
   */
  name?: string
  /**
   * 民族
   */
  nation?: string
  /**
   * 附件列表
   */
  ossIdList?: string[]
  /**
   * 持证情况 其他证件  other_certificates
   */
  otherCertificates?: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 绩效工资
   */
  performanceWages?: number
  /**
   * 手机号码
   */
  phonenumber?: string
  /**
   * 岗位id
   */
  postId?: number
  /**
   * 岗位工资
   */
  postWages?: number
  /**
   * ID
   */
  preEmploymentId?: number | string

  /**
   * 试用期时长(月)
   */
  probationCycle?: string

  /**
   * 是否为外包人员
   */
  isOutsource?: string

  /**
   * 实习期时长说明
   */
  internshipExplain?: string

  /**
   * 岗位编码
   */
  postCode?: string
  /**
   * 试用期薪资发放标准
   */
  probationWagesRate?: number
  /**
   * 实际到岗日期
   */
  realDate?: string
  /**
   * 招聘岗位id(user_recruit_post)
   */
  recruitPostId?: number
  /**
   * 推荐人
   */
  reference?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 用户性别（0男 1女）
   */
  sex: string

  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: string
  /**
   * 系统账号
   */
  userAccount?: string
  /**
   * 工资
   */
  wages?: number
}
