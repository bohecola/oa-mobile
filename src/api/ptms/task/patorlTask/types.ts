export interface PatorlTaskVO {
  /**
   * ID
   */
  id: string

  /**
   * 生产计划id;生产计划id(product_plan表id)
   */
  planId: string | number

  /**
   * 方案id
   */
  schemeId: string | number

  /**
   * 电站id
   */
  psId: string | number

  /**
   * 名称（周期+巡检方案名称）
   */
  name: string

  /**
   * 执行方式;0：PAD  1：电脑
   */
  way: string

  /**
   * 任务描述
   */
  description: string

  /**
   * 计划开始日期
   */
  planStartDate: string

  /**
   * 计划结束日期
   */
  planEndDate: string

  /**
   * 实际开始日期
   */
  realStartDate: string

  /**
   * 实际结束日期
   */
  realEndDate: string

  /**
   * 任务状态
   */
  status: string
}

export interface PatorlTaskForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 生产计划id;生产计划id(product_plan表id)
   */
  planId?: string

  psname?: string

  year?: string

  planName?: string

  planSchemeId?: string

  taskSchemeIds?: string

  planType?: string

  /**
   * 方案id
   */
  schemeId?: string | number

  /**
   * 电站id
   */
  psId?: string

  /**
   * 名称（周期+巡检方案名称）
   */
  name?: string

  /**
   * 执行方式;0：PAD  1：电脑
   */
  way?: string

  /**
   * 任务描述
   */
  description?: string

  /**
   * 计划开始日期
   */
  planStartDate?: string

  /**
   * 计划结束日期
   */
  planEndDate?: string

  /**
   * 实际开始日期
   */
  realStartDate?: string

  /**
   * 实际结束日期
   */
  realEndDate?: string

  /**
   * 任务状态
   */
  status?: string
}

export interface PatorlTaskQuery extends PageQuery {
  /**
   * 生产计划id;生产计划id(product_plan表id)
   */
  planId?: string | number

  planName?: string

  year?: string

  /**
   * 方案id
   */
  schemeId?: string | number

  /**
   * 电站id
   */
  psId?: string | number

  /**
   * 名称（周期+巡检方案名称）
   */
  name?: string

  /**
   * 执行方式;0：PAD  1：电脑
   */
  way?: string

  /**
   * 计划开始日期
   */
  planStartDate?: string

  /**
   * 计划结束日期
   */
  planEndDate?: string

  /**
   * 实际开始日期
   */
  realStartDate?: string

  /**
   * 实际结束日期
   */
  realEndDate?: string

  /**
   * 任务状态
   */
  status?: string

  params?: any
}

export interface PlanNameListVo {
  id: string
  name: string
  type: string
  description: string
}
