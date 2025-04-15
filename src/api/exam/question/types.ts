export interface QuestionQuery extends PageQuery {
  /**
   * 题号
   */
  no?: number
  /**
   * 题干
   */
  content: string
  /**
   * 类别;(安全、消防、电工) 可多个
   */
  category: string
  /**
   * 难度等级
   */
  difficulty: string

  /**
   * 题目分数
   */
  score: number
  /**
   * 状态;(（0正常 1停用）)
   */
  status: string
  /**
   * 类型;(单选、多选、判断)
   */
  type: string
}

/**
 * QuestionForm
 */
export interface QuestionForm extends BaseEntity {
  /**
   * 题目解析
   */
  analysis?: string
  /**
   * 类别;(安全、消防、电工) 可多个
   */
  category: string
  /**
   * 题干
   */
  content: string
  /**
   * 正确答案;(如"A"或"AB")
   */
  correctAnswer: string

  /**
   * 难度等级
   */
  difficulty: string
  /**
   * ID
   */
  id: number
  /**
   * 选项;（如：{"A":"选项1", "B":"选项2"}）
   */
  options: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 题目分数
   */
  score: number
  /**
   * 状态;(（0正常 1停用）)
   */
  status: string
  /**
   * 类型;(单选、多选、判断)
   */
  type: string
  [property: string]: any
}

/**
 * QuestiVO
 */
export interface QuestionVO {
  /**
   * 题目解析
   */
  analysis?: string
  /**
   * 类别;(安全、消防、电工) 可多个
   */
  category?: string
  /**
   * 题干
   */
  content?: string
  /**
   * 正确答案;(如"A"或"AB")
   */
  correctAnswer?: string
  /**
   * 难度等级
   */
  difficulty?: string
  /**
   * ID
   */
  id?: number
  /**
   * 管理业务ID (练习明细id 、考试明细id)
   */
  objectId?: number
  /**
   * 选项;（如：{"A":"选项1", "B":"选项2"}）
   */
  options?: string
  /**
   * 题目分数
   */
  score?: number
  /**
   * 状态;(（0正常 1停用）)
   */
  status?: string
  /**
   * 类型;(单选、多选、判断)
   */
  type?: string
}
