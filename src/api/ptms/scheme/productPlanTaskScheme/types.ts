export interface ProductPlanTaskSchemeVO {
  /**
   * ID;生产工作任务方案项表
   */
  id: string

  /**
   * 生产工作计划方案ID
   */
  planSchemeId: string

  /**
   * 生产工作计划方案名称
   */
  planSchemeName: string

  /**
   * 任务分类
   */
  type: string

  /**
   * 任务内容
   */
  content: string

  /**
   * 执行方式;0：PAD  1：电脑 2：全部
   */
  way: string

  /**
   * 执行数
   */
  count: string

  /**
   * 执行周期
   */
  cycel: string

  /**
   * 排序号
   */
  sortNo: number

  /**
   * 备注
   */
  remark: string
}

export interface ProductPlanTaskSchemeForm extends BaseEntity {
  /**
   * ID;生产工作任务方案项表
   */
  id?: string

  /**
   * 生产工作计划模板id;生产工作任务模板id(product_task_scheme表id)
   */
  planSchemeId?: string

  /**
   * 任务分类
   */
  type?: string

  /**
   * 任务内容
   */
  content?: string

  /**
   * 执行方式;0：PAD  1：电脑 2：全部
   */
  way?: string

  /**
   * 执行月份
   */
  count?: string

  /**
   * 执行周期
   */
  cycel?: string

  /**
   * 排序号
   */
  sortNo?: number

  /**
   * 备注
   */
  remark?: string
}

export interface ProductPlanTaskSchemeQuery extends PageQuery {
  /**
   * 生产工作计划模板id;生产工作任务模板id(product_task_scheme表id)
   */
  planSchemeId?: string

  /**
   * 任务分类
   */
  type?: string

  /**
   * 任务内容
   */
  content?: string

  /**
   * 执行方式;0：PAD  1：电脑 2：全部
   */
  way?: string

  /**
   * 执行月份
   */
  count?: string

  /**
   * 执行周期
   */
  cycel?: string

  /**
   * 排序号
   */
  sortNo?: number

  params?: any
}
export interface ProductPlanTaskItemSchemeVO {
  /**
   * 检查项描述
   */
  description: string
  /**
   * ID
   */
  id: string
  /**
   * 是否必填;是否必填 Y: 是  N: 否
   */
  required: string

  /**
   * 工作计划任务id
   */
  taskSchemeId: string
  /**
   * 填报类型
   */
  dataType: string

  sortNo: number

  example: string

  remark: string
}
export interface ProductPlanTaskItemSchemeForm {
  /**
   * 检查项描述
   */
  description?: string
  /**
   * ID
   */
  id?: string
  /**
   * 是否必填;是否必填 Y: 是  N: 否
   */
  required?: string

  /**
   * 工作计划任务id
   */
  taskSchemeId?: string
  /**
   * 填报类型
   */
  dataType?: string

  sortNo?: number

  example?: string

  remark?: string
}
