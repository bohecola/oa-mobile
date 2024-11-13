export interface TrainCertificateForm {
  /**
   * 批次ID
   */
  batchId: string | number
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
  id?: number | string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 员工持证 List<UserCertificateBo>
   */
  userCertificateBo?: UserCertificateBo[]
  /**
   * 员工持证ID
   */
  userCertificateId?: number
  /**
   * 员工培训 List<UserTrainBo>
   */
  userTrainBo?: UserTrainBoForm
  /**
   * 员工培训ID
   */
  userTrainId?: number

  ossIdList?: []
}

/**
 * 持证
 */
export interface UserCertificateBo {
  /**
   * 证件状态（0正常 1停用）
   */
  certificateStatus: string
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
   * 到期日期
   */
  endDate?: Date
  /**
   * 附件
   */
  files?: string
  /**
   * ID
   */
  id: number
  /**
   * 发证日期
   */
  issuanceDate?: Date
  /**
   * 证书名称
   */
  name?: string
  /**
   * 编号
   */
  no?: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 备注
   */
  remark?: string
  /**
   * 专业
   */
  speciality?: string
  /**
   * 开始日期
   */
  startDate?: Date
  /**
   * 状态; 草稿、审核中、已完成
   */
  status?: string
  /**
   * 培训id(user_train)
   */
  trainId?: string
  /**
   * 类型
   */
  type?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 员工id
   */
  userId?: number | string
  userName?: string
}

/**
 * 培训
 */
export interface UserTrainBoForm {
  /**
   * 费用
   */
  amout?: number
  /**
   * 负责人
   */
  commander?: string
  /**
   * 培训内容
   */
  content: string
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
   * 培训结束日期
   */
  endDate: string
  /**
   * ID
   */
  id: number
  /**
   * 取得证书;Y 是 N 否
   */
  isCertificate?: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 备注
   */
  remark?: string
  /**
   * 培训结果  未通过  已通过
   */
  result: string
  /**
   * 培训开始日期
   */
  startDate: string

  trainDate?: string[]
  /**
   * 状态; 草稿、审核中、已完成
   */
  status?: string
  /**
   * 培训类型;内部培训  外部培训
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
  userId: string
}
