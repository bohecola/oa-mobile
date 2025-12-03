export interface ProcessReviewVO {
  /**
   * 流程评论表ID
   */
  id: string | number

  /**
   * 流程业务key
   */
  businessKey: string | number

  /**
   * 流程实例ID
   */
  procInstId: string | number

  /**
   * 任务ID
   */
  taskId: string | number

  /**
   * 评论内容
   */
  message: string

  /**
   * 附件
   */
  files: string
}

export interface ProcessReviewForm extends BaseEntity {
  /**
   * 流程评论表ID
   */
  id?: string | number

  /**
   * 流程业务key
   */
  businessKey?: string

  /**
   * 流程实例ID
   */
  procInstId?: string | number

  /**
   * 任务ID
   */
  taskId?: string | number

  /**
   * 评论内容
   */
  message?: string

  /**
   * 附件
   */
  files?: string

  /**
   * 附件ID数组
   */
  ossIdList?: string[]
}

export interface ProcessReviewQuery extends PageQuery {
  /**
   * 流程业务key
   */
  businessKey?: string

  /**
   * 流程实例ID
   */
  procInstId?: string | number

  /**
   * 任务ID
   */
  taskId?: string | number

  /**
   * 评论内容
   */
  message?: string

  /**
   * 附件
   */
  files?: string

  /**
   * 日期范围参数
   */
  params?: any
}
