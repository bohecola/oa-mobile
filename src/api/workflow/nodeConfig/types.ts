import type { FormManageVO } from '@/api/workflow/formManage/types'

export interface NodeConfigVO {
  /**
   * 主键
   */
  id: string | number

  /**
   * 表单id
   */
  formId: string | number

  /**
   * 表单类型
   */
  formType: string

  /**
   * 节点名称
   */
  nodeName: string

  /**
   * 节点id
   */
  nodeId: string | number

  /**
   * 流程定义id
   */
  definitionId: string | number

  /**
   * 是否为申请人节点 （0是 1否）
   */
  applyUserTask: string

  /**
   * 表单管理
   */
  wfFormManageVo: FormManageVO
}
