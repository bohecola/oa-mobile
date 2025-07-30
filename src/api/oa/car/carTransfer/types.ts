export interface CarTransferVO {
  /**
   * ID
   */
  id: string

  /**
   * 车牌号
   */
  carNumber: string

  /**
   * 原工作公司
   */
  oldCompanyId: string | number

  /**
   * 原工作部门
   */
  oldDeptId: string | number

  /**
   * 新工作公司
   */
  newCompanyId: string | number

  /**
   * 新原工作部门
   */
  newDeptId: string | number

  /**
   * 交接人
   */
  recipient: number

  /**
   * 是否存在违章;是：Y，否：N
   */
  isExistRegulations: string

  /**
   * 流程业务ID
   */
  wfBusinessKey: number

  /**
   * 流程模型KEY
   */
  wfModelKey: string

  /**
   * 状态
   */
  status: string
}

export interface CarTransferForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 车牌号
   */
  carNumber?: string

  /**
   * 原工作公司
   */
  oldCompanyId?: string | number

  /**
   * 原工作公司名称
   */
  oldCompanyName?: string

  /**
   * 原工作部门
   */
  oldDeptId?: string | number

  /**
   * 原工作部门名称
   */
  oldDeptName?: string

  /**
   * 新工作公司
   */
  newCompanyId?: string | number

  /**
   * 新工作公司名称
   */
  newCompanyName?: string

  /**
   * 新原工作部门
   */
  newDeptId?: string | number

  /**
   * 新原工作部门名称
   */
  newDeptName?: string

  /**
   * 交接人
   */
  recipient?: number

  /**
   * 是否存在违章;是：Y，否：N
   */
  isExistRegulations?: string

  /**
   * 流程业务ID
   */
  wfBusinessKey?: number

  /**
   * 流程模型KEY
   */
  wfModelKey?: string

  /**
   * 状态
   */
  status?: string
}

export interface CarTransferQuery extends PageQuery {
  /**
   * 车牌号
   */
  carNumber?: string

  /**
   * 原工作公司
   */
  oldCompanyId?: string | number

  /**
   * 原工作部门
   */
  oldDeptId?: string | number

  /**
   * 新工作公司
   */
  newCompanyId?: string | number

  /**
   * 新原工作部门
   */
  newDeptId?: string | number

  /**
   * 日期范围参数
   */
  params?: any
}
