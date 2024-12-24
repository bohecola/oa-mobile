import type { NodeConfigVO } from '@/api/workflow/nodeConfig/types'
import type { DefinitionConfigVO } from '@/api/workflow/definitionConfig/types'

export interface RouterJumpVo {
  wfNodeConfigVo: NodeConfigVO
  wfDefinitionConfigVo: DefinitionConfigVO
  businessKey: string
  businessStatus: string
  taskId: string
  processInstanceId: string
  type: string
}

export interface StartProcessBo<T = any> {
  businessKey?: string | number
  tableName: string
  variables: {
    entity?: T
    [k: string]: any
  }
  // 流程实例名称拼接
  processInstanceName?: string
}
