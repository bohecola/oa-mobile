export interface ExamVO {
  /**
   * ID
   */
  id: string

  /**
   * 试卷表（eq_exam_paper）
   */
  paperId: string

  /**
   * 试卷类型(模拟考试、面试考试、内部考试)
   */
  paperType: string

  /**
   * 用户id
   */
  userId: string | number

  /**
   * 用户名称
   */
  userName: string

  /**
   * 手机号码
   */
  phonenumber: string

  /**
   * 开始时间
   */
  startTime: string

  /**
   * 结束时间
   */
  endTime: string

  /**
   * 考试总分
   */
  totalScore: number

  /**
   * 正确题目数
   */
  correctCount: number

  /**
   * 考试用时（秒）
   */
  duration: number

  /**
   * 当前题目索引
   */
  currentIndex: number

  /**
   * 状态（0 考试中 1已结束）
   */
  status: string

  /**
   * 题目列表
   */
  historyRecordList: ExamHistoryRecordVO[]
}

export interface ExamForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 试卷表（eq_exam_paper）
   */
  paperId?: string

  /**
   * 试卷类型(模拟考试、面试考试、内部考试)
   */
  paperType?: string

  /**
   * 用户id
   */
  userId?: string | number

  /**
   * 用户名称
   */
  userName?: string

  /**
   * 手机号码
   */
  phonenumber?: string

  /**
   * 开始时间
   */
  startTime?: string

  /**
   * 结束时间
   */
  endTime?: string

  /**
   * 考试总分
   */
  totalScore?: number

  /**
   * 正确题目数
   */
  correctCount?: number

  /**
   * 考试用时（秒）
   */
  duration?: number

  /**
   * 当前题目索引
   */
  currentIndex?: number

  /**
   * 状态（0 考试中 1已结束）
   */
  status?: string
}

export interface ExamQuery extends PageQuery {
  /**
   * 试卷表（eq_exam_paper）
   */
  paperId?: string

  /**
   * 试卷类型(模拟考试、面试考试、内部考试)
   */
  paperType?: string

  /**
   * 用户id
   */
  userId?: string | number

  /**
   * 用户名称
   */
  userName?: string

  /**
   * 手机号码
   */
  phonenumber?: string

  /**
   * 开始时间
   */
  startTime?: string

  /**
   * 结束时间
   */
  endTime?: string

  /**
   * 考试总分
   */
  totalScore?: number

  /**
   * 正确题目数
   */
  correctCount?: number

  /**
   * 考试用时（秒）
   */
  duration?: number

  /**
   * 当前题目索引
   */
  currentIndex?: number

  /**
   * 状态（0 考试中 1已结束）
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}

export interface UpdateExamRecordData {
  id: string
  examId: string
  questionId: string
  userAnswer: string
  isCorrect: string
  score: number
  currentIndex?: number
}

export interface DoExamQrCodeParams {
  paperId: string
  userName: string
  phonenumber: string
  iouId?: string
}

/**
 * ExamHistoryRecordVo，历史考试详情视图对象 eq_exam_record
 */
export interface ExamHistoryRecordVO {
  /**
   * 当前题目索引
   */
  currentIndex?: number
  /**
   * 考试记录表（eq_exam表id）
   */
  examId?: string
  /**
   * ID
   */
  id?: string
  /**
   * 是否正确
   */
  isCorrect?: string
  /**
   * 题目表（eq_question表id）
   */
  questionId?: string
  /**
   * 用户答案
   */
  userAnswer?: string
  /**
   * 题目分数
   */
  score?: number
}
