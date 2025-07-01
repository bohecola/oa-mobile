/**
 * PatorlTaskVo，巡检工作任务视图对象 pt_patorl_task
 */
export interface PatorlTaskVo {
  /**
   * 任务描述
   */
  description?: string
  /**
   * ID
   */
  id?: number
  /**
   * 名称（周期+巡检方案名称）
   */
  name?: string
  /**
   * 计划结束日期
   */
  planEndDate?: Date
  /**
   * 生产计划id;生产计划id(product_plan表id)
   */
  planId?: number
  planName?: string
  /**
   * 计划开始日期
   */
  planStartDate?: Date
  /**
   * 计划类型
   */
  planType?: string
  /**
   * 电站id
   */
  psId?: number
  psname?: string
  /**
   * 实际结束日期
   */
  realEndDate?: Date
  /**
   * 实际开始日期
   */
  realStartDate?: Date
  /**
   * 方案id
   */
  schemeId?: number
  /**
   * 任务状态
   */
  status?: string
  /**
   * 巡检工作内容
   */
  taskContentList?: PatorlTaskContentVo[]
  /**
   * 执行方式;0：PAD  1：电脑
   */
  way?: string
  /**
   * 年度
   */
  year?: string
  [property: string]: any
}

/**
 * PatorlTaskContentVo，巡检工作内容视图对象 pt_patorl_task_content
 */
export interface PatorlTaskContentVo {
  index?: number
  /**
   * ID
   */
  id?: number | string
  /**
   * 巡检标准名称;巡检标准名称(pt_patorl_criterion表name)
   */
  name?: string
  /**
   * 对象id（设备id或区域id）
   */
  objectId?: number | string

  objectName?: string
  /**
   * 巡检类型;巡检类型 0：设备 1：区域
   */
  patrolType?: string
  /**
   * 电站id
   */
  psId?: number | string

  /**
   * 设备类型
   */
  devType?: number | string
  /**
   * 排序号
   */
  sortNo?: number
  /**
   * 巡检工作内容项
   */
  taskContentItemList?: PatorlTaskContentItemVo[]
  /**
   * 巡检任务id;巡检任务id(pt_patorl_task表弟)
   */
  taskId?: number | string
  [property: string]: any
}

/**
 * PatorlTaskContentItemVo，巡检工作内容项视图对象 pt_patorl_task_content_item
 */
export interface PatorlTaskContentItemVo {
  /**
   * 巡检工作内容id;巡检工作内容id（pt_patorl_task_content表id）
   */
  contentId?: number
  /**
   * 填报类型
   */
  dataType?: string
  /**
   * 检查项描述
   */
  description?: string
  /**
   * 填写示例
   */
  example?: string
  /**
   * ID
   */
  id?: number
  /**
   * 备注
   */
  remark?: string
  /**
   * 是否必填;是否必填 Y: 是  N: 否
   */
  required?: string
  /**
   * 排序号
   */
  sortNo?: number
  [property: string]: any
}
