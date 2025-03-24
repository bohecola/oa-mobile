export interface ProjectVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 编码
   */
  no: string

  /**
   * 项目部门
   */
  deptId: string | number

  /**
   * 部门名称
   */
  deptName: string

  /**
   * 项目名称
   */
  name: string

  /**
   * 业务类型;运维类项目 工程类项目
   */
  businessType: string

  /**
   * 合同编号
   */
  contractNo?: string

  /**
   * 项目负责人
   */
  projectLeader: string

  /**
   * 负责人名称
   */
  projectLeaderName: string

  /**
   * 项目说明
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
   * 项目完成日期
   */
  finishDate: string

  /**
   * 状态;0 草稿1审批中2执行中 3 已结束 4 终止 9 作废
   */
  status: string

  /**
   * 备注
   */
  remark: string
}

export interface ProjectForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 编码
   */
  no?: string

  /**
   * 项目部门
   */
  deptId?: string | number

  /**
   * 项目部门
   */
  deptName?: string

  /**
   * 项目名称
   */
  name?: string

  /**
   * 合同编号
   */
  contractNo?: string

  /**
   * 业务类型;运维类项目 工程类项目
   */
  businessType?: string

  /**
   * 项目负责人
   */
  projectLeader?: string

  /**
   * 项目负责人名称
   */
  projectLeaderName?: string

  /**
   * 项目说明
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
   * 项目完成日期
   */
  finishDate?: string

  /**
   * 合同ID
   */
  contractIds?: string

  /**
   * 合同名称
   */
  contractName?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 附件
   */
  ossIdList?: string[]
}

export interface ProjectQuery extends PageQuery {
  /**
   * 编码
   */
  no?: string

  /**
   * 项目名称
   */
  name?: string

  /**
   * 业务类型;运维类项目 工程类项目
   */
  businessType?: string

  queryType?: string

  ids?: (string | number)[]

  status?: string

  statusList?: (string | number)[]

  /**
   * 日期范围参数
   */
  params?: any
}
