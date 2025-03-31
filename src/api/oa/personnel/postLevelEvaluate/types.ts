export interface PostLevelEvaluateItemVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 岗位ID
   */
  name: string | number

  /**
   * 岗位级别;主值班员及以下岗位、值班长岗位、副站长及以上岗位、风机维护副班长岗位、风机维护班长及以上岗位
   */
  level: string

  /**
   * 描述
   */
  description: string

  /**
   * 备注
   */
  remark: string
}

export interface PostLevelEvaluateItemForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 岗位ID
   */
  name?: string | number

  /**
   * 岗位级别;主值班员及以下岗位、值班长岗位、副站长及以上岗位、风机维护副班长岗位、风机维护班长及以上岗位
   */
  level?: string

  /**
   * 描述
   */
  description?: string

  /**
   * 备注
   */
  remark?: string
}

export interface PostLevelEvaluateItemQuery extends Partial<PageQuery> {
  /**
   * 岗位ID
   */
  name?: string | number

  /**
   * 岗位级别;主值班员及以下岗位、值班长岗位、副站长及以上岗位、风机维护副班长岗位、风机维护班长及以上岗位
   */
  level?: string

  /**
   * 描述
   */
  description?: string

  /**
   * 日期范围参数
   */
  params?: any
}
