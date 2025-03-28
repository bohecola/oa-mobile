import type { ExtraForm } from './extraTypes'

export interface DailyWorkVO {
  /**
   * ID
   */
  id: string | number

  /**
   * 自定义审批人
   */
  customizeApprover: string

  /**
   * 自定义办理人
   */
  customizeTransactor: string

  /**
   * 需求部门
   */
  needDepts: string

  /**
   * 日常事务申请类型ID
   */
  dailyWorkType: number

  /**
   * 资料类型(原件、复印件、电子版)
   */
  fileType: string

  /**
   * 使用方式(资料使用方式)
   */
  fileUseType: string

  /**
   * 是否加盖公章
   */
  isSeal: string

  /**
   * 是否运维类项目
   */
  isYwlProject: string

  /**
   * 是否涉及人员任命、调整
   */
  isPersonnelTransfer: string

  /**
   * 申请类型(印章类型)(刻制、重刻、变更、销毁)
   */
  sealType: string

  /**
   * 是否交回原印
   */
  isReturnSeal: string

  /**
   * 文件类别(用印文件类别)(资质办理资料、财务资料、规章制度、合同文件、往来函件、其他资料)
   */
  sealFileCategory: string

  /**
   * 用印类型(公章、合同章、法人章、法人签名、财务专用章、其他（多选）)
   */
  sealUseType: string

  /**
   * 申请资料(行政资料类型)(公司档案资料、房屋资料、车辆资料)
   */
  administrationFileType: string

  /**
   * 是否用印
   */
  isUseSeal: string

  /**
   * 是否存在违章
   */
  isExistRegulations: string

  /**
   * 销售合同类别
   */
  contractCategory: string

  /**
   * 申请事由
   */
  reason: string

  /**
   * 状态
   */
  status: string

  /**
   * 备注
   */
  remark: string
}

export interface DailyWorkForm extends BaseEntity, ExtraForm {
  /**
   * ID
   */
  id?: string | number

  /**
   * 公司
   */
  companyId?: string | number

  /**
   * 自定义审批人
   */
  customizeApprover?: string

  /**
   * 自定义办理人
   */
  customizeTransactor?: string

  /**
   * 需求部门
   */
  needDepts?: string

  /**
   * 日常事务申请类型ID
   */
  dailyWorkType?: string

  /**
   * 资料类型(原件、复印件、电子版)
   */
  fileType?: string

  /**
   * 使用方式(资料使用方式)
   */
  fileUseType?: string

  /**
   * 是否加盖公章
   */
  isSeal?: string

  /**
   * 是否运维类项目
   */
  isYwlProject?: string

  /**
   * 是否涉及人员任命、调整
   */
  isPersonnelTransfer?: string

  /**
   * 申请类型(印章类型)(刻制、重刻、变更、销毁)
   */
  sealType?: string

  /**
   * 是否交回原印
   */
  isReturnSeal?: string

  /**
   * 文件类别(用印文件类别)(资质办理资料、财务资料、规章制度、合同文件、往来函件、其他资料)
   */
  sealFileCategory?: string

  /**
   * 用印类型(公章、合同章、法人章、法人签名、财务专用章、其他（多选）)
   */
  sealUseType?: string

  /**
   * 申请资料(行政资料类型)(公司档案资料、房屋资料、车辆资料)
   */
  administrationFileType?: string

  /**
   * 是否用印
   */
  isUseSeal?: string

  /**
   * 是否存在违章
   */
  isExistRegulations?: string

  /**
   * 行政类：车辆移交申请，选择接收人
   */
  recipient?: string

  /**
   * 销售合同类别
   */
  contractCategory?: string

  /**
   * 申请事由
   */
  reason?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 备注
   */
  remark?: string

  // 流程中表单的字段
  /**
   * 流程中申请事由备注
   */
  wfRemark?: string
  /**
   * 事务编码
   */
  no?: string
  /**
   * 附件列表
   */
  ossIdList?: string[]

  /**
   * 申请业务内容
   */
  contentJson?: string

  /**
   * 最大岗位级别
   */
  maxPostLevel?: number
}

export interface DailyWorkQuery extends PageQuery {
  /**
   * 自定义审批人
   */
  customizeApprover?: string

  /**
   * 自定义办理人
   */
  customizeTransactor?: string

  /**
   * 需求部门
   */
  needDepts?: string

  /**
   * 日常事务申请类型ID
   */
  dailyWorkType?: number

  /**
   * 资料类型(原件、复印件、电子版)
   */
  fileType?: string

  /**
   * 使用方式(资料使用方式)
   */
  fileUseType?: string

  /**
   * 是否加盖公章
   */
  isSeal?: string

  /**
   * 是否运维类项目
   */
  isYwlProject?: string

  /**
   * 是否涉及人员任命、调整
   */
  isPersonnelTransfer?: string

  /**
   * 申请类型(印章类型)(刻制、重刻、变更、销毁)
   */
  sealType?: string

  /**
   * 是否交回原印
   */
  isReturnSeal?: string

  /**
   * 文件类别(用印文件类别)(资质办理资料、财务资料、规章制度、合同文件、往来函件、其他资料)
   */
  sealFileCategory?: string

  /**
   * 用印类型(公章、合同章、法人章、法人签名、财务专用章、其他（多选）)
   */
  sealUseType?: string

  /**
   * 申请资料(行政资料类型)(公司档案资料、房屋资料、车辆资料)
   */
  administrationFileType?: string

  /**
   * 是否用印
   */
  isUseSeal?: string

  /**
   * 是否存在违章
   */
  isExistRegulations?: string

  /**
   * 销售合同类别
   */
  contractCategory?: string

  /**
   * 申请事由
   */
  reason?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
