import type { ProductTaskItemVo, ProductTaskRecordVo } from '../productTaskUpdate/types'

export interface ProductTaskVO {
  /**
   * ID
   */
  id: string

  /**
   * 项目部
   */
  deptId: string

  /**
   * 项目部名称
   */
  deptName: string

  /**
   * 计划id
   */
  planId: string

  /**
   * 计划名称
   */
  planName: string

  /**
   * 计划开始时间
   */
  planStartDate: string

  /**
   * 计划结束时间
   */
  planEndDate: string

  /**
   * 计划类型
   */
  planType: string

  /**
   * 年度
   */
  year: string

  /**
   * 工作任务
   */
  name: string

  /**
   * 任务分类
   */
  type: string

  /**
   * 执行方式; 0：PAD  1：电脑  2：PAD按日
   */
  way: string

  /**
   * 任务描述
   */
  description: string

  /**
   * 任务状态
   */
  status: string

  /**
   * 实际开始时间
   */
  realStartDate: string

  /**
   * 实际结束时间
   */
  realEndDate: string

  /**
   * 备注
   */
  remark: string

  /**
   * 工作任务项
   */
  taskItemList?: ProductTaskItemVo[]

  /**
   * 任务执行记录
   */
  taskRecordList?: ProductTaskRecordVo[]

}

export interface ProductTaskForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 生产计划id
   */
  planId?: string

  /**
   * 项目部
   */
  deptIds?: (string | number)[]

  /**
   * 电站名称
   */
  psName?: string

  /**
   * 电站id
   */
  psIds?: string[]

  /**
   * 年度
   */
  year?: string

  /**
   *工作计划名称
   */
  name?: string

  planName?: string

  planSchemeId?: string
  /**
   * 执行数
   */
  count?: number

  /**
   * 执行周期
   */
  cycel?: string

  /**
   * 任务描述
   */
  description?: string

  /**
   * 工作任务ID
   */
  taskSchemeIds?: string | string[]

  /**
   * 计划类型
   */
  planType?: string

  way?: string
  planStartDate?: string
  planEndDate?: string
}

export interface ProductTaskQuery extends PageQuery {
  /**
   * 生产计划id
   */
  planId?: string

  planName?: string

  name?: string

  type?: string

  deptId?: string

  /**
   * 电站id
   */
  psId?: string

  /**
   * 年度
   */
  year?: string

  /**
   * 工作计划名称
   */
  planSchemeName?: string

  /**
   * 工作任务ID
   */
  taskSchemeIds?: string

  /**
   * 计划类型
   */
  planType?: string

  taskType?: string

  /**
   * 任务状态
   */
  status?: string
  // 关键字
  keyword?: string
}

/**
 * 生产计划预览视图对象
 */
export interface PreviewVo {
  /**
   * 计划名称
   */
  name?: string
  /**
   * 电站id
   */
  psId?: number
  /**
   * 生产工作任务预览
   */
  taskpreviewList?: ProductTaskPreviewVo[]
  /**
   * 计划类型; 计划类型 0：非巡检计划 1：巡检计划
   */
  type?: string
  /**
   * 年度
   */
  year?: string
  [property: string]: any
}

export interface ProductTaskPreviewVo {
  /**
   * 任务内容
   */
  content?: string
  /**
   * 执行月份
   */
  count?: string
  /**
   * 执行周期
   */
  cycel?: string
  /**
   * 生产工作任务项预览
   */
  itemPreviewList?: ProductTaskItemPreviewVo[]
  /**
   * 备注
   */
  remark?: string
  /**
   * 生产任务方案id
   */
  taskSchemeId?: number
  /**
   * 执行方式;0：PAD  1：电脑 2：全部
   */
  way?: string
}

/**
 * 生产工作任务项预览视图
 */
export interface ProductTaskItemPreviewVo {
  index?: number
  /**
   * 填报类型
   */
  dataType?: string

  /**
   * 是否拍摄
   */
  capture?: string
  /**
   * 检查项描述
   */
  description?: string
  /**
   * 填写示例
   */
  example?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 是否必填
   */
  required?: string

  sortNo?: number

  taskSchemeId?: string
}
