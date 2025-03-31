/**
 * UserTrainVo，员工培训视图对象 oa_user_train
 */
export interface UserTrainVO {
  /**
   * 附加费用说明
   */
  additionalAmountDescription?: string
  /**
   * 申请类型(0 培训 1报名 2 考试)
   */
  applicationType?: string
  /**
   * 参加人数
   */
  attendNumber?: number
  /**
   * 人均附加费用
   */
  averageAdditionalAmount?: number
  /**
   * 人均费用
   */
  averageAmount?: number
  /**
   * 取得证书类型
   */
  certificateType?: string
  /**
   * 负责人
   */
  commander?: string
  /**
   * 负责人
   */
  commanderNames?: string
  /**
   * 培训/报名/考试内容
   */
  content?: string
  /**
   * 培训结束日期
   */
  endDate?: string
  /**
   * ID
   */
  id?: number
  /**
   * 取得证书;Y 是 N 否
   */
  isCertificate?: string
  /**
   * 报名是否产生费用 Y是 N否
   */
  isProduceCost?: number
  /**
   * 附件
   */
  ossIdList?: number[]
  /**
   * 个人附件信息
   */
  ossMessageAllVoList?: OssMessageAllVo[]
  /**
   * 附件类型
   */
  ossType?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 培训结果;未通过  已通过
   */
  result?: string
  /**
   * 培训开始日期
   */
  startDate?: string
  /**
   * 状态;草稿、审核中、已完成
   */
  status?: string
  /**
   * 费用
   */
  totalAmount?: number
  /**
   * 培训地址
   */
  trainAddress?: string
  /**
   * 培训开票类型
   */
  trainInvoicingType?: string
  /**
   * 培训类型/报名类型/考试类型
   */
  trainType?: string
  /**
   * 培训类型;内部培训  外部培训
   */
  type?: string
  /**
   * 用户id
   */
  userId?: string
  /**
   * 员工姓名
   */
  userName?: string
}

export interface OssMessageAllBo {
  /**
   * 附件ID
   */
  files?: string
  /**
   * 业务ID
   */
  objectId?: number
  /**
   * 业务表名
   */
  objectName?: string
  /**
   * 业务类型
   */
  type?: string
}

/**
 * OssMessageAllVo
 */
export interface OssMessageAllVo {
  /**
   * 附件ID
   */
  files?: string
  /**
   * 业务ID
   */
  objectId?: number
  /**
   * 业务表名
   */
  objectName?: string
  /**
   * 业务类型
   */
  type?: string
}

export interface UserTrainForm extends BaseEntity {
  /**
   * 附加费用说明
   */
  additionalAmountDescription?: string
  /**
   * 申请类型(0 培训 1报名 2 考试)
   */
  applicationType: string
  /**
   * 参加人数
   */
  attendNumber?: number
  /**
   * 人均附加费用
   */
  averageAdditionalAmount?: number
  /**
   * 人均费用
   */
  averageAmount?: number
  /**
   * 取得证书类型
   */
  certificateType?: string
  /**
   * 负责人
   */
  commander?: string
  /**
   * 培训/报名/考试内容
   */
  content: string

  /**
   * 培训结束日期
   */
  endDate?: string
  /**
   * ID
   */
  id: string
  /**
   * 取得证书;Y 是 N 否
   */
  isCertificate?: string
  /**
   * 报名是否产生费用 Y是 N否
   */
  isProduceCost?: string
  /**
   * 附件
   */
  ossIdList?: number[]
  /**
   * 个人附件
   */
  ossMessageAllBoList?: OssMessageAllBo[]

  ossMessageAllVoList?: OssMessageAllVo[]

  /**
   * 备注
   */
  remark?: string
  /**
   * 培训结果;未通过  已通过
   */
  result?: string
  /**
   * 培训开始日期
   */
  startDate?: string
  /**
   * 状态;草稿、审核中、已完成
   */
  status?: string
  /**
   * 费用
   */
  totalAmount?: number
  /**
   * 培训地址
   */
  trainAddress?: string
  /**
   * 培训开票类型
   */
  trainInvoicingType?: string
  /**
   * 培训类型/报名类型/考试类型
   */
  trainType: string
  /**
   * 培训类型;内部培训  外部培训
   */
  type: string

  /**
   * 用户id
   */
  userId: string
}

export interface UserTrainQuery extends PageQuery {
  /**
   * 培训类型;内部培训  外部培训
   */
  type?: string

  /**
   * 用户id
   */
  userId?: string | number

  /**
   * 负责人
   */
  commander?: string

  /**
   * 培训日期
   */
  trainDate?: string

  dateRangeDate?: [string, string]

  /**
   * 培训内容
   */
  content?: string

  /**
   * 取得证书;Y 是 N 否
   */
  isCertificate?: number

  /**
   * 费用
   */
  amout?: number

  /**
   * 状态;未通过  已通过
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
