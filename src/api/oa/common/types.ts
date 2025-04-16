export interface EditOaWfFileVO {
  /**
   * 业务表id
   */
  businessKey: string
  /**
   * 表单数据
   */
  entity: { [key: string]: { [key: string]: any } }
  /**
   * 附件列表
   */
  ossIdList?: number[]
  /**
   * 流程实例id
   */
  processInstanceId: string
  /**
   * 业务表名
   */
  tableName: string
}
