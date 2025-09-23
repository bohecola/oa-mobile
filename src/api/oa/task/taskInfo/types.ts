import type { AuthVO } from '@/api/system/objectAuth/types'
import type { TaskRecordVO } from '@/api/oa/task/taskRecord/types'

export interface TaskInfoVO {
  /**
   * ID
   */
  id: string

  /**
   * 标题
   */
  title: string

  /**
   * 内容
   */
  content: string

  /**
   * 开始日期
   */
  startDate: string

  /**
   * 结束日期
   */
  endDate: string

  /**
   * 实际完成日期
   */
  realEndDate: string

  /**
   * 完成人
   */
  endUser: string

  /**
   * 完成人姓名
   */
  endUserName: string

  /**
   * 状态
   */
  status: string

  /**
   * 审批意见
   */
  approvalComment: string

  /**
   * 备注
   */
  remark: string

  /**
   * 创建时间
   */
  createTime: string

  /**
   * 授权集合
   */
  authList: AuthVO[]

  /**
   * 执行记录列表
   */
  recordList?: TaskRecordVO[]

  [key: string]: any
}

export interface TaskInfoForm extends BaseEntity {
  /**
   * ID
   */
  id?: string

  /**
   * 标题
   */
  title?: string

  /**
   * 内容
   */
  content?: string

  /**
   * 开始日期
   */
  startDate?: string

  /**
   * 结束日期
   */
  endDate?: string

  /**
   * 实际完成日期
   */
  realEndDate?: string

  /**
   * 完成人
   */
  endUser?: string

  /**
   * 完成人姓名
   */
  endUserName?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 审批意见
   */
  approvalComment?: string

  /**
   * 备注
   */
  remark?: string

  /**
   * 授权集合
   */
  authList?: AuthVO[]

  /**
   * 执行记录列表
   */
  recordList?: TaskRecordVO[]
}

export interface TaskInfoQuery extends PageQuery {
  /**
   * 标题
   */
  title?: string

  /**
   * 状态
   */
  status?: string

  /**
   * 查询状态
   */
  queryStatus?: string

  /**
   * 日期范围参数
   */
  params?: any
}
