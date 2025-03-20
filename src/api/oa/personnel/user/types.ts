/**
 * 个人资料 UserInfoBo，用户信息业务对象 oa_user_info
 */
export interface UserInfoForm {
  /**
   * 学位
   */
  academicDegree: string
  /**
   * 住址
   */
  address: string
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
   * 离职日期
   */
  departDate: Date
  /**
   * 学历
   */
  education: string
  /**
   * 紧急联系人
   */
  emergencyContactName: string
  /**
   * 紧急联系人电话
   */
  emergencyContactPhone: string
  /**
   * 紧急联系人所属关系
   */
  emergencyContactRelation: string
  /**
   * 入职id（user_employment）
   */
  employmentId?: number
  /**
   * 入职日期
   */
  entryCompanyDate: Date
  /**
   * 转正日期
   */
  formalDate: Date
  /**
   * 毕业院校
   */
  graduationSchool: string
  /**
   * ID
   */
  id: number | string
  /**
   * 身份证号
   */
  idCard: string
  /**
   * 婚姻状况(未婚 已婚)
   */
  maritalStatus: string
  /**
   * 民族
   */
  nation: string
  /**
   * 籍贯
   */
  nativePlace: string
  /**
   * 员工编号
   */
  no: string
  /**
   * 附件列表
   */
  ossIdList?: number[]
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 个人邮箱
   */
  personEmail: string
  /**
   * 政治面貌
   */
  politicalOutlook: string
  /**
   * 试用期时长(月)
   */
  probationPeriod: number
  /**
   * 专业
   */
  speciality: string
  /**
   * 参加工作时间
   */
  startWorkDate: Date
  /**
   * 员工状态(试用期 在职 离职 )
   */
  status: string
  /**
   * 转正类型
   */
  type: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 用户id
   */
  userId: number | string
  /**
   * 保存'0'、提交'1'状态
   */
  writeStatus?: string

  /**
   * 附件列表
   */
  ossMessageAllBoList?: OssMessageAllVo[]
}

/**
 * 个人资料  UserInfoBo，用户信息业务对象 oa_user_info
 */
export interface UserInfoVO {
  /**
   * 学位
   */
  academicDegree: string
  /**
   * 住址
   */
  address: string
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
   * 离职日期
   */
  departDate: Date
  /**
   * 学历
   */
  education: string
  /**
   * 紧急联系人
   */
  emergencyContactName: string
  /**
   * 紧急联系人电话
   */
  emergencyContactPhone: string
  /**
   * 紧急联系人所属关系
   */
  emergencyContactRelation: string
  /**
   * 入职id（user_employment）
   */
  employmentId?: number
  /**
   * 入职日期
   */
  entryCompanyDate: Date
  /**
   * 转正日期
   */
  formalDate: Date
  /**
   * 毕业院校
   */
  graduationSchool: string
  /**
   * ID
   */
  id: number | string
  /**
   * 身份证号
   */
  idCard: string
  /**
   * 婚姻状况(未婚 已婚)
   */
  maritalStatus: string
  /**
   * 民族
   */
  nation: string
  /**
   * 籍贯
   */
  nativePlace: string
  /**
   * 员工编号
   */
  no: string
  /**
   * 附件列表
   */
  ossIdList?: number[]
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 个人邮箱
   */
  personEmail: string
  /**
   * 政治面貌
   */
  politicalOutlook: string
  /**
   * 试用期时长(月)
   */
  probationPeriod: number
  /**
   * 专业
   */
  speciality: string
  /**
   * 参加工作时间
   */
  startWorkDate: Date
  /**
   * 员工状态(试用期 在职 离职 )
   */
  status: string
  /**
   * 转正类型
   */
  type: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 用户id
   */
  userId: number | string
  /**
   * 保存'0'、提交'1'状态
   */
  writeStatus?: string

  /**
   * 附件列表
   */
  ossMessageAllVoList?: OssMessageAllVo[]
}

export interface OssMessageAllVo {
  /**
   * 类型
   */
  type: string
  /**
   * 附件id
   */
  files: string
}
