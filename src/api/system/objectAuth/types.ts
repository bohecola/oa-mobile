export interface ObjectAuthVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 业务表名称
   */
  objectType: string

  /**
   * 业务表ID
   */
  objectId: string | number

  /**
   * 授权类型;dept、role、user
   */
  relType: string

  /**
   * 授权ID;对应授权类型id值
   */
  relId: string | number
}

export interface ObjectAuthForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 业务表名称
   */
  objectType?: string

  /**
   * 业务表ID
   */
  objectId?: string | number

  /**
   * 授权类型;dept、role、user
   */
  relType?: string

  /**
   * 授权ID;对应授权类型id值
   */
  relId?: string | number
}

export interface ObjectAuthQuery extends PageQuery {
  /**
   * 业务表名称
   */
  objectType?: string

  /**
   * 业务表ID
   */
  objectId?: string | number

  /**
   * 授权类型;dept、role、user
   */
  relType?: string

  /**
   * 授权ID;对应授权类型id值
   */
  relId?: string | number

  /**
   * 日期范围参数
   */
  params?: any
}

export interface AuthVO {
  /**
   * 授权类型;dept、role、user
   */
  relType: string

  /**
   * 授权ID;对应授权类型id值
   */
  relIds: string
}
