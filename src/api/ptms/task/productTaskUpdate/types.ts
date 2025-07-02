/**
 * 生产工作任务视图对象
 */
export interface ProductTaskVo {
  /**
   * 负责人
   */
  charger?: string
  /**
   * 任务描述
   */
  description?: string
  /**
   * ID
   */
  id?: number
  /**
   * 名称
   */
  name?: string
  /**
   * 计划结束日期
   */
  planEndDate?: Date
  /**
   * 生产计划id
   */
  planId?: number
  /**
   * 生产计划名称
   */
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
   * 项目部
   */
  deptId?: string | number

  // 电站名称多选
  psIds?: string[] | number[]
  /**
   * 电站名称
   */
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
   * 备注
   */
  remark?: string
  /**
   * 任务状态
   */
  status?: string
  /**
   * 工作任务项
   */
  taskItemList?: ProductTaskItemVo[]
  /**
   * 任务执行记录
   */
  taskRecordList?: ProductTaskRecordVo[]
  /**
   * 生产任务方案id
   */
  taskSchemeId?: number
  /**
   * 任务分类
   */
  type?: string
  /**
   * 任务类型
   */
  taskType?: string
  /**
   * 执行方式; 0：PAD  1：电脑  2：PAD按日
   */
  way?: string
  /**
   * 执行周期  0 逐月 1 逐日
   */
  cycel?: string
  /**
   * 年度
   */
  year?: string
  [property: string]: any
}

/**
 * 生产工作任务项视图对象
 */
export interface ProductTaskItemVo {
  index?: number
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
   * 是否必填
   */
  required?: string
  /**
   * 排序号
   */
  sortNo?: number
  /**
   * 生产工作任务id
   */
  taskId?: number
  [property: string]: any
}

/**
 * 生产任务执行记录视图对象
 */
export interface ProductTaskRecordVo {
  /**
   * ID;生产任务执行记录
   */
  id?: number

  /**
   * 生产工作任务id
   */
  taskId?: string

  /**
   * PAD设备id
   */
  padId?: string

  /**
   * 项目部id
   */
  deptId?: string

  /**
   * 项目部名称
   */
  deptName?: string

  /**
   * 电站id
   */
  psId?: number

  /**
   * 电站名称
   */
  psname?: string

  /**
   * 执行人
   */
  operator?: string

  /**
   * 执行日期
   */
  operateDate?: string

  /**
   * 开始时间
   */
  starttime?: string

  /**
   * 结束时间
   */
  endtime?: Date

  /**
   * 状态 0 保存 1 提交
   */
  status?: string

  /**
   * 工作过程描述
   */
  description?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 任务执行记录结果
   */
  recordResultList?: ProductTaskRecordResultVo[]

  /**
   * 任务实际开始时间
   */
  taskRealStartDate?: Date

  /**
   * 任务实际结束时间
   */
  taskRealEndDate?: Date

  createBy?: string

  [property: string]: any
}

/**
 * 生产工作任务执行记录结果视图对象
 */
export interface ProductTaskRecordResultVo {
  /**
   * ID
   */
  id?: number
  /**
   * 工作任务项表id
   */
  itemId?: number
  /**
   * 工作任务执行记录id
   */
  recordId?: number
  /**
   * 备注
   */
  remark?: string

  /**
   * 检查项描述
   */
  description?: string

  /**
   * 检查项描述
   */
  dataType?: string

  /**
   * 是否拍摄
   */
  capture?: string

  /**
   * 填写示例
   */
  example?: string

  /**
   * selectData 下拉框对应的数据源
   */
  selectData?: any

  /**
   * 结果; 如果结果为值，则直接存储如果结果为附件，则保存附件ID
   */
  result?: string

  /**
   * 是否必填
   */
  required: string

  /**
   * 附件
   */
  files?: string

  /**
   * 工作任务表id
   */
  taskId?: number
  [property: string]: any
}
