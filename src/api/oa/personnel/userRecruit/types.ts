export interface UserRecruitVO {
  /**
   * ID
   */
  id: string

  /**
   * 编号
   */
  no: string

  /**
   * 部门id
   */
  deptId: string | number

  /**
   * 部门名称
   */
  deptName: string

  /**
   * 期望到达日期
   */
  hopeArriveDate: string

  /**
   * 申请原因
   */
  applyReason: string

  /**
   * 招聘开始日期
   */
  recruitStartDate: string

  /**
   * 招聘完成日期
   */
  recruitEndDate: string

  /**
   * 备注
   */
  remark: string

  /**
   * 状态
   */
  status: string

  userRecruitPostBoList: UserRecruitPostBo[]

  userRecruitPostVoList: UserRecruitPostBo[]
}

export interface UserRecruitForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 编号
   */
  no?: string

  /**
   * 部门id
   */
  deptId?: string | number

  deptType?: string

  deptName?: string

  /**
   * 期望到达日期
   */
  hopeArriveDate?: string

  /**
   * 申请原因
   */
  applyReason?: string

  /**
   * 招聘开始日期
   */
  recruitStartDate?: string

  /**
   * 招聘完成日期
   */
  recruitEndDate?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 状态
   */
  status?: string

  userRecruitPostBoList?: UserRecruitPostBo[]

  userRecruitPostVoList?: UserRecruitPostBo[]

  ossIdList?: string[]
}
export interface UserRecruitPostBo {
  /**
   * 创建者
   */
  createBy?: number
  /**
   * 创建部门
   */
  createDept?: number
  /**
   * 创建时间
   */
  createTime?: Date
  /**
   * 任职要求(新增)
   */
  demand: string
  /**
   * ID
   */
  id: string | number
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 岗位id
   */
  postId: number | string
  /**
   * 招聘id
   */
  recruitId: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 岗位职责(新增)
   */
  responsibility: string
  /**
   * 乘坐标准
   */
  ridingStandards: string
  /**
   * 驻勤补助标准（元/天）
   */
  subsidyAmount: number
  /**
   * 交通费标准
   */
  transportationFeeStandard: number
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 招聘人数
   */
  userNum: number
  [property: string]: any
}

export interface UserRecruitQuery extends PageQuery {
  /**
   * 编号
   */
  no?: string

  /**
   * 部门id
   */
  deptId?: string | number

  /**
   * 期望到达日期
   */
  hopeArriveDate?: string

  /**
   * 申请原因
   */
  applyReason?: string

  /**
   * 招聘开始日期
   */
  recruitStartDate?: string

  /**
   * 招聘完成日期
   */
  recruitEndDate?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
