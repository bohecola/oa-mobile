export interface PaperQuery extends PageQuery {
  /**
   * 考试时长（分钟）
   */
  duration?: number
  /**
   * 截至时间（有效期）
   */
  endTime?: string
  /**
   * ID
   */
  id?: number
  /**
   * 试卷名称
   */
  paperName?: string
  /**
   * 试卷类型(模拟考试、面试考试、内部考试、培训考试)
   */
  paperType?: string
  /**
   * 请求参数
   */
  params?: string
  /**
   * 合格分数
   */
  passScore?: number
  /**
   * 开始时间（有效期）
   */
  startTime?: string
  /**
   * 状态;(（0正常 1停用）)
   */
  status?: string
  /**
   * 题目数
   */
  totalCount?: number
  /**
   * 总分数
   */
  totalScore?: number
  /**
   * 是否有效
   */
  isValid?: string
}

/**
 * PaperForm
 */
export interface PaperForm extends BaseEntity {
  /**
   * 考试时长（分钟）
   */
  duration: number
  /**
   * 截至时间（有效期）
   */
  endTime?: string
  /**
   * ID
   */
  id: number
  /**
   * 试卷名称
   */
  paperName: string
  /**
   * 试卷类型(模拟考试、面试考试、内部考试)
   */
  paperType: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 合格分数
   */
  passScore: number
  /**
   * 开始时间（有效期）
   */
  startTime: string
  /**
   * 状态;(（0正常 1停用）)
   */
  status?: string
  /**
   * 题目数
   */
  totalCount: number
  /**
   * 总分数
   */
  totalScore: number
  /**
   * 试卷配置信息
   */
  configList?: ExamPaperConfig[]
}

/**
 * PaperVO
 */
export interface PaperVO {
  /**
   * 试卷配置信息
   */
  paperConfigList?: ExamPaperConfig[]

  /**
   * 考试时长（分钟）
   */
  duration: number
  /**
   * 截至时间（有效期）
   */
  endTime?: string
  /**
   * ID
   */
  id: string
  /**
   * 试卷名称
   */
  paperName: string
  /**
   * 试卷类型(模拟考试、面试考试、内部考试)
   */
  paperType: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 合格分数
   */
  passScore: number
  /**
   * 开始时间（有效期）
   */
  startTime: string
  /**
   * 状态;(（0正常 1停用）)
   */
  status?: string
  /**
   * 题目数
   */
  totalCount: number
  /**
   * 总分数
   */
  totalScore: number
  /**
   * 是否存在简答题
   */
  isExistsJdt: string
}

/**
 * ExamPaperConfig，试卷配置对象 eq_exam_paper_config
 */
export interface ExamPaperConfig {
  /**
   * 类别;安全、消防、电工
   */
  category?: string
  /**
   * 题目个数
   */
  count?: number
  /**
   * 难度等级
   */
  difficulty?: string
  /**
   * ID
   */
  id?: number
  /**
   * 试卷表（eq_exam_paper表id）
   */
  paperId?: number
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 题目分数
   */
  score?: number
  /**
   * 租户编号
   */
  tenantId?: string
  /**
   * 类型;单选、多选、判断
   */
  type?: string
}
