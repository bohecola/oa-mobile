import type { PostVO } from '@/api/system/post/types'

/**
 * 用户信息
 */
export interface UserInfo {
  user: UserVO
  roles: string[]
  permissions: string[]
}

/**
 * 用户查询对象类型
 */
export interface UserQuery extends PageQuery {
  nickName?: string
  userName?: string
  phonenumber?: string
  status?: string
  deptId?: string | number
  roleId?: string | number
  // Y: 显示  N: 不显示（默认）
  isShowResigned?: string
  /**
   * 标识：内部人员看到的部门数据，系统管理看到的全部部门数据
   */
  isInternal?: string
}

/**
 * 用户返回对象
 */
export interface UserVO extends BaseEntity {
  userId: string | number
  tenantId: string
  deptId: string | number
  deptType: string // 0 公司 1 部门 2 项目部
  userName: string
  nickName: string
  userType: string
  password: string
  email: string
  phonenumber: string
  sex: string
  avatar: string
  status: string
  delFlag: string
  loginIp: string
  loginDate: string
  remark: string
  deptName: string
  roles: string[]
  roleIds: any
  postIds: any
  postIdStr?: string
  postNames?: string
  maxPostLevel?: number
  roleId: any
  admin: boolean
  [key: string]: any
}

/**
 * 用户表单类型
 */
export interface UserForm {
  id?: string
  userId?: string | number
  deptId?: string | number
  avatar?: string
  userName?: string
  nickName?: string
  password?: string
  phonenumber?: string
  email?: string
  sex?: string
  status?: string
  remark?: string
  postIds?: string[]
  roleIds?: string[]
}

export interface UserInfoVO {
  user: UserVO
  roles: string[]
  roleIds: string[]
  posts: PostVO[]
  postIds: string[]
  permissions: string[]
  roleGroup: string
  postGroup: string
}

export interface ResetPwdForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface CheckUserNameAndPhoneUnique {
  userName?: string
  phonenumber?: string
}

/**
 * SysUserMobileVo，用户信息视图对象 sys_user
 */
export interface SysUserMobileVO {
  /**
   * 部门ID
   */
  deptId?: number
  /**
   * 部门名
   */
  deptName?: string
  /**
   * 用户邮箱
   */
  email?: string
  /**
   * 用户昵称
   */
  nickName?: string
  /**
   * 手机号码
   */
  phonenumber?: string

  /**
   * 昵称拼音
   */
  pinyin?: string

  /**
   * 拼音首字母
   */
  firstPinyin?: string

  /**
   * 帐号状态（0正常 1停用）
   */
  status?: string
  /**
   * 租户ID
   */
  tenantId?: string
  /**
   * 用户ID
   */
  userId?: string | number
  /**
   * 用户账号
   */
  userName?: string
  [property: string]: any
}

export interface UserMobileListQuery {
  userIds?: string
}

/**
 * 转正申请流程需要这个类型，获取userInfo信息
 */
export interface UserInfoListQuery {
  /**
   * 学位
   */
  academicDegree?: string
  /**
   * 住址
   */
  address?: string
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
  createTime?: string
  /**
   * 离职日期
   */
  departDate?: string
  /**
   * 学历
   */
  education?: string
  /**
   * 紧急联系人
   */
  emergencyContactName?: string
  /**
   * 紧急联系人电话
   */
  emergencyContactPhone?: string
  /**
   * 紧急联系人所属关系
   */
  emergencyContactRelation?: string
  /**
   * 入职id（user_employment）
   */
  employmentId?: number
  /**
   * 入职日期
   */
  entryCompanyDate?: string

  firstNum?: number
  /**
   * 转正日期
   */
  formalDate?: string
  /**
   * 毕业院校
   */
  graduationSchool?: string
  /**
   * ID
   */
  id?: number
  /**
   * 身份证号
   */
  idCard?: string
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string /**
                  * 婚姻状况(未婚 已婚)
                  */
  maritalStatus?: string
  /**
   * 民族
   */
  nation?: string
  /**
   * 籍贯
   */
  nativePlace?: string
  /**
   * 员工编号
   */
  no?: string /**
               * 排序列
               */
  orderByColumn?: string
  /**
   * 当前页数
   */
  pageNum?: number
  /**
   * 分页大小
   */
  pageSize?: number
  /**
   * 请求参数
   */
  params?: string
  /**
   * 个人邮箱
   */
  personEmail?: string
  /**
   * 政治面貌
   */
  politicalOutlook?: string
  /**
   * 试用期时长(月)
   */
  probationPeriod?: number
  /**
   * 专业
   */
  speciality?: string
  /**
   * 参加工作时间
   */
  startWorkDate?: string
  /**
   * 员工状态(试用期 在职 离职 )
   */
  status?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: string
  /**
   * 用户id
   */
  userId?: number | string

  userName?: string
}

/**
 * UserInfoVo，用户信息视图对象 oa_user_info
 */
export interface UserInfoVo {
  /**
   * 学位
   */
  academicDegree?: string
  /**
   * 住址
   */
  address?: string
  /**
   * 离职日期
   */
  departDate?: Date
  /**
   * 部门ID
   */
  deptId?: number
  /**
   * 部门名称
   */
  deptName?: string
  /**
   * 学历
   */
  education?: string
  /**
   * 紧急联系人
   */
  emergencyContactName?: string
  /**
   * 紧急联系人电话
   */
  emergencyContactPhone?: string
  /**
   * 紧急联系人所属关系
   */
  emergencyContactRelation?: string
  /**
   * 入职id（user_employment）
   */
  employmentId?: number
  /**
   * 入职日期
   */
  entryCompanyDate?: string
  /**
   * 转正日期
   */
  formalDate?: string
  /**
   * 毕业院校
   */
  graduationSchool?: string
  /**
   * ID
   */
  id?: number
  /**
   * 身份证号
   */
  idCard?: string
  /**
   * 婚姻状况(未婚 已婚)
   */
  maritalStatus?: string
  /**
   * 民族
   */
  nation?: string
  /**
   * 籍贯
   */
  nativePlace?: string
  /**
   * 员工编号
   */
  no?: string
  /**
   * 附件列表
   */
  ossIdList?: number[]
  /**
   * 个人邮箱
   */
  personEmail?: string
  /**
   * 政治面貌
   */
  politicalOutlook?: string
  /**
   * 岗位ID
   */
  postId?: string
  /**
   * 岗位名称
   */
  postName?: string
  /**
   * 试用期时长(月)
   */
  probationPeriod?: number
  /**
   * 专业
   */
  speciality?: string
  /**
   * 参加工作时间
   */
  startWorkDate?: Date
  /**
   * 员工状态(试用期 在职 离职 )
   */
  status?: string
  /**
   * 转正类型
   */
  type?: string
  /**
   * 用户id
   */
  userId?: number | string
  /**
   * 用户姓名
   */
  userName?: string

  /**
   * 保存'0'、提交'1'状态
   */
  writeStatus?: string
}
