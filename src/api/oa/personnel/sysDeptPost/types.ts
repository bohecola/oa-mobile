export interface SysDeptPostVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 部门id
   */
  deptId: string | number

  /**
   * 岗位id
   */
  postId: string | number

  postName?: string

  /**
   * 人员编制数
   */
  userNum: number

  /**
   * 年龄范围
   */
  ageRange: string

  /**
   * 驻勤补助标准（元/天）
   */
  subsidyAmount: string | number

  /**
   * 乘坐标准
   */
  ridingStandards: string | number

  /**
   * 交通费标准
   */
  transportationFeeStandard: number

  /**
   * 岗位职责(新增)
   */
  responsibility: string

  /**
   * 任职要求(新增)
   */
  demand: string
}

export interface SysDeptPostForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 部门id
   */
  deptId?: string | number

  /**
   * 部门名称
   */
  deptName?: string

  /**
   * 岗位id
   */
  postId?: string | number

  /**
   * 岗位名称
   */
  postName?: string

  /**
   * 人员编制数
   */
  userNum?: number

  /**
   * 年龄范围
   */
  ageRange?: string

  /**
   * 驻勤补助标准（元/天）
   */
  subsidyAmount?: number

  /**
   * 乘坐标准
   */
  ridingStandards?: string | number

  /**
   * 交通费标准
   */
  transportationFeeStandard?: number

  /**
   * 岗位职责(新增)
   */
  responsibility?: string

  /**
   * 任职要求(新增)
   */
  demand?: string
}

export interface SysDeptPostQuery extends PageQuery {
  /**
   * 部门id
   */
  deptId?: string | number

  deptName?: string

  /**
   * 岗位id
   */
  postId?: string | number

  /**
   * 人员编制数
   */
  userNum?: number

  /**
   * 年龄范围
   */
  ageRange?: string

  /**
   * 驻勤补助标准（元/天）
   */
  subsidyAmount?: string | number

  /**
   * 乘坐标准
   */
  ridingStandards?: string | number

  /**
   * 交通费标准
   */
  transportationFeeStandard?: number

  /**
   * 岗位职责(新增)
   */
  responsibility?: string

  /**
   * 任职要求(新增)
   */
  demand?: string

  /**
   * 日期范围参数
   */
  params?: any
}
