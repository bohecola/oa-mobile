export interface getNoBindSubjectFeeTypesParams {
  /**
   * 项目业务类型
   */
  businessType: string
  /**
   * 费用类型(已有)
   */
  feeTypeList?: string[]
}

export interface getNoBindItemsParams {
  /**
   * 项目业务类型
   */
  businessType: string
  /**
   * 核算项目idID（已有核算项目id）
   */
  itemList?: (string | number)[]
  /**
   * 预算费用类型
   */
  subjectFeeType: string
  /**
   * 科目ID
   */
  subjectId: number
}

export interface ProjectSubjectNoBindFeeTypeVO {
  /**
   * 费用类型-指
   */
  feeType?: string
  /**
   * 费用类型-名称
   */
  feeTypeName?: string
  /**
   * 项目预算项
   */
  itemList?: ProjectSubjectItemTreeVO[]
  [property: string]: any
}

export interface ProjectSubjectItemTreeVO {
  /**
   * 金额
   */
  amount?: number
  /**
   * 部门id
   */
  deptId?: string | number
  /**
   * 项目部名称
   */
  deptName?: string
  /**
   * ID
   */
  id?: string | number
  /**
   * 显示顺序
   */
  orderNo?: number
  /**
   * 父ID
   */
  parentId?: string
  /**
   * 项目预算id
   */
  psId?: number
  /**
   * 备注
   */
  remark?: string
  /**
   * 科目核算项目id
   */
  sciId?: string | number
  /**
   * 核算项目
   */
  sciName?: string
  /**
   * 预算费用类型
   */
  subjectFeeType?: string
  /**
   * 科目id
   */
  subjectId?: number
  /**
   * 科目名称
   */
  subjectName?: string
  /**
   * 树类型 subject  subjectLast  item
   */
  treeType?: string
  /**
   * UUID
   */
  uuid?: string
  /**
   * 子级
   */
  children?: ProjectSubjectItemTreeVO[]
  [property: string]: any
}

export interface ProjectSubjectVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 项目id
   */
  projectId: string | number

  /**
   * 开始日期
   */
  startDate: string

  /**
   * 截至日期
   */
  endDate: string

  /**
   * 状态
   */
  status: string

  /**
   * 项目预算项
   */
  itemList?: ProjectSubjectItemTreeVO[]
}

export interface ProjectSubjectForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 项目id
   */
  projectId?: string | number

  /**
   * 项目名称
   */
  projectName?: string

  /**
   * 开始日期
   */
  startDate?: string

  /**
   * 截至日期
   */
  endDate?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 项目预算项
   */
  itemList?: ProjectSubjectItemTreeVO[]
}

export interface ProjectSubjectQuery extends PageQuery {
  /**
   * 开始日期
   */
  startDate?: string

  /**
   * 截至日期
   */
  endDate?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
