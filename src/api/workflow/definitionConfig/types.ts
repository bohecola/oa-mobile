import type { FormManageVO } from '@/api/workflow/formManage/types'

export interface DefinitionConfigVO {
  /**
   * 主键
   */
  id: string

  /**
   * 表名
   */
  tableName?: string

  /**
   * 流程定义ID
   */
  definitionId: string

  /**
   * 流程KEY
   */
  processKey: string

  /**
   * 流程版本
   */
  version?: number

  /**
   * 备注
   */
  remark: string

  categoryCode?: string
  categoryName?: string
  procdefName?: string
  formName?: string
  router?: string
  sortNum?: number
  nodeId?: string

  /**
   * 表单管理
   */
  wfFormManageVo: FormManageVO
}

export interface DefinitionConfigForm extends BaseEntity {
  /**
   * 主键
   */
  id?: string

  /**
   * 表名
   */
  tableName?: string

  /**
   * 流程定义ID
   */
  definitionId?: string

  /**
   * 流程KEY
   */
  processKey?: string

  /**
   * 流程版本
   */
  version?: number

  /**
   * 备注
   */
  remark?: string

  /**
   * 表单管理
   */
  wfFormManageVo?: FormManageVO
}

export interface DefinitionConfigQuery extends PageQuery {
  /**
   * 表名
   */
  tableName?: string

  /**
   * 流程定义ID
   */
  definitionId?: string

  /**
   * 流程KEY
   */
  processKey?: string

  /**
   * 流程版本
   */
  version?: number

  /**
   * 表单管理
   */
  wfFormManageVo: FormManageVO
}
