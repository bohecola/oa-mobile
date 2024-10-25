export interface DailyWorkTypeVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 父级id
   */
  parentId: string | number

  /**
   * 祖级列表
   */
  ancestors: string

  /**
   * 事务等级
   */
  level: string

  /**
   * 事务类型
   */
  type?: string

  /**
   * 事务编码
   */
  no?: string

  /**
   * 事务名称
   */
  name: string

  /**
   * 事务状态(启用、停用)
   */
  status: string

  /**
   * 备注
   */
  remark?: string
}

export interface DailyWorkTypeForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 父级id
   */
  parentId?: string | number

  /**
   * 祖级列表
   */
  ancestors?: string

  /**
   * 事务等级
   */
  level?: string

  /**
   * 事务名称
   */
  name?: string

  /**
   * 事务类型
   */
  type?: string

  /**
   * 事务编码
   */
  no?: string

  /**
   * 事务状态(启用、停用)
   */
  status?: string

  /**
   * 备注
   */
  remark?: string
}

export interface DailyWorkTypeQuery extends Partial<PageQuery> {
  /**
   * 父级id
   */
  parentId?: string | number

  /**
   * 祖级列表
   */
  ancestors?: string

  /**
   * 事务等级
   */
  level?: string

  /**
   * 事务名称
   */
  name?: string

  /**
   * 事务类型
   */
  type?: string

  /**
   * 事务编码
   */
  no?: string

  /**
   * 事务状态(启用、停用)
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any

  /**
   * 备注
   */
  remark?: string
}
