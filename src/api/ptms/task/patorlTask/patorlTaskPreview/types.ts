/**
 * PatorlPlanPreviewVo，巡检工作任务预览视图对象 pt_patorl_task
 */
export interface PatorlPlanPreviewVo {
  /**
   * 计划名称
   */
  name?: string
  /**
   * 电站id;电站id(p_powerstation_info表id)
   */
  psId?: string
  /**
   * 巡检工作任务预览
   */
  taskPreviewList?: PatorlTaskPreviewVo[]
  /**
   * 计划类型;计划类型 0：非巡检计划 1：巡检计划
   */
  type?: string
  /**
   * 年度
   */
  year?: string
  [property: string]: any
}

/**
 * PatorlTaskPreviewVo，巡检工作任务预览视图对象 pt_patorl_task
 */
export interface PatorlTaskPreviewVo {
  index?: number
  /**
   * 执行数
   */
  count?: number
  /**
   * 执行周期
   */
  cycel?: string
  /**
   * 开始周期
   */
  startCycel?: string
  /**
   * 结束周期
   */
  endCycel?: string
  /**
   * 描述
   */
  description?: string
  /**
   * 名称
   */
  name?: string
  /**
   * 电站Id
   */
  psId?: string
  /**
   * 方案id
   */
  schemeId?: string
  /**
   * 排序号
   */
  sortNo?: number
  /**
   * 巡检工作内容
   */
  taskContentPreviewList?: PatorlTaskContentPreviewVo[]
  /**
   * 执行方式
   */
  way?: string
  [property: string]: any
}

/**
 * PatorlTaskContentPreviewVo，巡检工作内容视图对象 pt_patorl_task_content
 */
export interface PatorlTaskContentPreviewVo {
  /**
   * 索引
   */
  index?: number
  /**
   * 巡检标准Id
   */
  criterionId?: string
  /**
   * 巡检标准名称
   */
  criterionName?: string
  /**
   * ID
   */
  id?: string
  /**
   * 设备|区域Id
   */
  objectId?: string
  /**
   * 设备或区域名称
   */
  objectName?: string
  /**
   * 巡检方案类型
   */
  patrolType?: string

  schemeId?: string

  devType?: string
  /**
   * 排序号
   */
  sortNo?: number
  /**
   * 巡检工作内容巡检项
   */
  taskContentItemPreviewList?: PatorlTaskContentItemPreviewVo[]

  [property: string]: any
}

/**
 * PatorlTaskContentItemPreviewVo，巡检工作内容项视图对象 pt_patorl_task_content_item
 */
export interface PatorlTaskContentItemPreviewVo {
  index?: 0
  /**
   * 巡检工作内容id;巡检工作内容id
   */
  contentId?: number
  /**
   * 巡检标准id
   */
  criterionId?: number
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

  capture?: string
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
