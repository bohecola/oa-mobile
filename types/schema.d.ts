import type { FieldRule } from 'vant'

export {}

declare global {
  interface BaseEntity {
    createBy?: any
    createDept?: any
    createTime?: string
    updateBy?: any
    updateTime?: any
    operation?: 'tempSave' | 'submit'
    initiator?: Initiator
  }

  // 弹窗属性
  interface DialogOption {
    title?: string
    visible: boolean
  }

  // 分页数据
  interface PageData<T, D> {
    form: T
    queryParams: D
    rules: {
      [k in keyof T]?: FieldRule[]
    }
  }

  // 分页查询参数
  interface PageQuery {
    pageNum: number
    pageSize: number
  }

  // 字典数据  数据配置
  interface DictDataOption {
    label: string
    value: string
    elTagType?: ElTagType
    elTagClass?: string
  }

  // 选择器自定义 label 字段描述符
  interface LabelDescriptor<T = any> {
    text: string
    key: keyof T
    type: 'dict' | 'time' | 'plain' | 'amount'
    options?: Ref<DictDataOption[]> | ((item: any) => DictDataOption[])
  }

  // 发起人
  interface Initiator {
    userId: string | number
    nickName: string
    deptId: string | number
    deptName: string
    createTime: string
    maxPostLevel: number
  }

  // 流程启动参数
  interface StartWorkFlowOptions<T> {
    operation?: BaseEntity['operation']
    entity: T & { initiator: Initiator }
    next?: (result: any) => void
  }

  // 暂存荷载
  interface TempSavePayload {
    done: () => void
    load: () => void
    next: () => void
    initiator: Initiator
    operation: BaseEntity['operation']
  }

  // 提交荷载
  interface SubmitPayload {
    done: () => void
    load: () => void
    open: (taskId: string) => void
    initiator: Initiator
    operation: BaseEntity['operation']
  }

  // 审批荷载
  interface ApprovalPayload {
    open: (taskId: string) => void
  }
}
