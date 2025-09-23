export interface TaskRecordVO {
  /**
   * ID
   */
  id: string

  /**
   * 工作任务ID
   */
  taskId: string

  /**
   * 内容
   */
  content: string

  /**
   * 父ID
   */
  parentId: string

  /**
   * 父级名称
   */
  parentByName: string

  /**
   * 回复的ID
   */
  replyToId: string

  /**
   * 创建人
   */
  createBy: string

  /**
   * 创建人名称
   */
  createByName: string

  /**
   * 创建时间
   */
  createTime: string

  /**
   * 附件列表
   */
  ossIdList: string[]

  /**
   * 子级列表
   */
  children: TaskRecordVO[]
}

export interface TaskRecordForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 工作任务ID
   */
  taskId?: string

  /**
   * 父ID
   */
  parentId?: string

  /**
   * 内容
   */
  content?: string

  /**
   * 创建人名称
   */
  createByName?: string

  /**
   * 附件列表
   */
  ossIdList?: string[]
}

export interface TaskRecordQuery extends PageQuery {
  /**
   * 工作任务ID
   */
  taskId?: string

  /**
   * 父ID
   */
  parentId?: string

  /**
   * 日期范围参数
   */
  params?: any
}
