export interface InterviewOrganizeUserVO {
  /**
   * ID
   */
  id?: string
  /**
   * 试卷ID
   */
  paperId?: string
  /**
   * 考试记录ID
   */
  examId?: string
  /**
   * 面试组织ID
   */
  interviewOrganizeId?: string
  /**
   * 试卷名称
   */
  paperName?: string
  /**
   * 合格分数
   */
  passScore?: number
  /**
   * 正确题目数
   */
  correctCount?: number
  /**
   * 考试用时（秒）
   */
  duration?: number
  /**
   * 状态（0 考试中 1已结束）
   */
  status?: string
  /**
   * 考试总分
   */
  totalScore?: number
  /**
   * 姓名
   */
  userName?: string
  /**
   * 手机号码
   */
  phonenumber?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 日期范围参数
   */
  params?: any

  [key: string]: any
}

export interface InterviewOrganizeUserForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 面试组织ID
   */
  interviewOrganizeId?: string

  /**
   * 姓名
   */
  userName?: string

  /**
   * 手机号码
   */
  phonenumber?: string

  /**
   * 考试记录ID
   */
  examId?: string

  /**
   * 备注
   */
  remark?: string
}

export interface InterviewOrganizeUserQuery extends PageQuery {
  /**
   * 面试组织ID
   */
  interviewOrganizeId?: string

  /**
   * 姓名
   */
  userName?: string

  /**
   * 手机号码
   */
  phonenumber?: string

  /**
   * 考试记录ID
   */
  examId?: string | number

  /**
   * 日期范围参数
   */
  params?: any
}

export interface GetPaperIdParams {
  phonenumber: string
  userName: string
}
