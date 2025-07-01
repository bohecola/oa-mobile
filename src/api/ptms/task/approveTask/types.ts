export interface ApproveRecordForm {
  /**
   * 审批对象id
   */
  ids: string[]
  /**
   * 审批对象名(数据库表名) 后端处理
   */
  objectName?: string
  /**
   * 审批意见
   */
  opinions?: string
  /**
   * 审批结果（0 不通过 1 通过）
   */
  result?: string
  /**
   * 类型
   */
  type?: string
  [property: string]: any
}
