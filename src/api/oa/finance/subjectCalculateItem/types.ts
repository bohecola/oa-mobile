export interface SubjectCalculateItemVO {
  /**
   * 科目id
   */
  id: string | number

  /**
   * 科目id
   */
  subjectId: string | number

  /**
   * 编码
   */
  code: string

  /**
   * 名称
   */
  name: string

  /**
   * 项目业务类型
   */
  businessType: string

  /**
   * 显示顺序
   */
  orderNo: number

  /**
   * 状态 0 正常 1 停用
   */
  status: string

  /**
   * 备注
   */
  remark: string
}

export interface SubjectCalculateItemForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 科目id
   */
  subjectId?: string | number

  subjectIdList?: string[]

  /**
   * 编码
   */
  code?: string

  /**
   * 名称
   */
  name?: string

  /**
   * 项目业务类型
   */
  businessType?: string

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

export interface SubjectCalculateItemQuery extends PageQuery {
  /**
   * 日期范围参数
   */
  params?: any
}

export interface SubjectCalculateItemAddForm {
  id?: string
  businessType?: string
  subjectFeeType?: string
  subjectIdList?: string[]
}

export interface GetItemTreeListBySubjectIdsParams {
  businessType: string
  feeType: string
  feeTypeList?: string[]
  subjectIds?: string[]
}
