export interface UserPreEmploymentVO {
  /**
   * ID
   */
  id: string

  /**
   * 招聘岗位id(user_recruit_post)
   */
  recruitPostId: string | number

  /**
   * 部门id
   */
  deptId: string | number

  /**
   * 部门名称
   */
  deptName: string

  /**
   * 编号
   */
  recruitNo: string

  /**
   * 岗位id
   */
  postId: string | number

  /**
   * 岗位名称
   */
  postName: string

  /**
   * 姓名
   */
  name: string

  /**
   * 用户性别（0男 1女）
   */
  sex: string

  /**
   * 手机号码
   */
  phonenumber: string

  /**
   * 持证情况
   */
  certificates: string[]

  /**
   * 面试形式(现场面试、视频面试)
   */
  interviewWay: string

  /**
   * 面试日期
   */
  interviewDate: string

  /**
   * 是否需要业主面试(Y 是 N否)
   */
  isOwnerInterview: string

  /**
   * 是否有试用期(Y 是 N否)
   */
  isProbation: string

  /**
   * 试用期时长(月)
   */
  probationCycle: string

  /**
   * 状态（0录用 1不录用）
   */
  status: string

  userPreEmploymentEvaluateBoList: UserPreEmploymentEvaluateBo[]

  userPreEmploymentEvaluateVoList: UserPreEmploymentEvaluateBo[]
}

export interface UserPreEmploymentForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 招聘岗位id(user_recruit_post)
   */
  recruitPostId?: string | number

  /**
   * 部门id
   */
  deptId?: string | number

  deptName?: string

  /**
   * 部门类型
   */
  deptType?: string

  /**
   * 招聘编号
   */
  recruitNo?: string

  /**
   * 岗位id
   */
  postId?: string | number

  postName?: string

  /**
   * 岗位级别
   */
  level?: number

  /**
   * 姓名
   */
  name?: string

  /**
   * 用户性别（0男 1女）
   */
  sex?: string

  /**
   * 手机号码
   */
  phonenumber?: string

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
   * 持证情况
   */
  certificates?: string

  /**
   * 面试形式(现场面试、视频面试)
   */
  interviewWay?: string

  /**
   * 面试日期
   */
  interviewDate?: string

  /**
   * 是否需要业主面试(Y 是 N否)
   */
  isOwnerInterview?: string

  /**
   * 是否有试用期(Y 是 N否)
   */
  isProbation?: string

  /**
   * 试用期时长(月)
   */
  probationCycle?: number

  /**
   * 状态（0录用 1不录用）
   */
  status?: string
  /**
   * 岗位评价
   */
  userPreEmploymentEvaluateBoList: UserPreEmploymentEvaluateBo[]

  userPreEmploymentEvaluateVoList: UserPreEmploymentEvaluateBo[]

  ossIdList?: string[]
}
export interface UserPreEmploymentEvaluateBo {
  id?: string
  preEmploymentId?: string
  evaluateItemName: string
  result: string
}
export interface UserPreEmploymentQuery extends PageQuery {
  /**
   * 招聘岗位id(user_recruit_post)
   */
  recruitPostId?: string | number

  /**
   * 部门id
   */
  deptId?: string | number

  /**
   * 岗位id
   */
  postId?: string | number

  /**
   * 姓名
   */
  name?: string

  /**
   * 用户性别（0男 1女）
   */
  sex?: string

  /**
   * 手机号码
   */
  phonenumber?: string

  /**
   * 持证情况
   */
  certificates?: string

  /**
   * 面试形式(现场面试、视频面试)
   */
  interviewWay?: string

  /**
   * 面试日期
   */
  interviewDate?: string

  /**
   * 是否需要业主面试(Y 是 N否)
   */
  isOwnerInterview?: string

  /**
   * 是否有试用期(Y 是 N否)
   */
  isProbation?: string

  /**
   * 试用期时长(月)
   */
  probationCycle?: string

  /**
   * 状态（0录用 1不录用）
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
