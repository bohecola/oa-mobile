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

  /**
   * 部门类型
   */
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
   * 项目部地址
   */
  address?: string

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
   * ID
   */
  id: string | number

  /**
   * 岗位id
   */
  postId: number | string

  /**
   * 岗位名称
   */
  postName: string
  /**
   * 招聘id
   */
  recruitId?: string
  /**
   * 备注
   */
  remark?: string

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

  /**
   * 学历要求
   */
  educationalRequire: string

  /**
   * 建议薪资（元/月）
   */
  suggestSalary: number

  /**
   * 工作经验
   */
  workExperience: string

  /**
   * 其他要求
   */
  otherRequire: string

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
