export interface SubjectVO {
  /**
   * UUID
   */
  uuid: string | number

  /**
   * ID
   */
  id: string | number

  /**
   * 科目代码
   */
  code: string

  /**
   * 名称
   */
  name: string

  /**
   * 状态 0 正常 1 停用
   */
  status: string

  /**
   * 备注
   */
  remark: string
}

export interface SubjectForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 父id
   */
  parentId?: string | number

  /**
   * 祖级列表
   */
  ancestors?: string

  /**
   * 科目代码
   */
  code?: string

  /**
   * 名称
   */
  name?: string

  /**
   * 显示顺序
   */
  orderNo?: number

  /**
   * 状态 0 正常 1 停用
   */
  status?: string

  /**
   * 备注
   */
  remark?: string
}

export interface SubjectQuery extends PageQuery {
  /**
   * 名称
   */
  name?: string

  /**
   * 状态 0 正常 1 停用
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
