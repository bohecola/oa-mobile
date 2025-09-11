import type { FieldRule } from 'vant'
import type { CascaderOption } from 'vant'

export {}

declare global {
  interface BaseEntity {
    createBy?: any
    createByName?: string
    createDept?: any
    createDeptName?: string
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
    // 业务主键
    businessKey?: string
    pageNum: number
    pageSize: number
  }

  // 字典数据  数据配置
  interface DictDataOption {
    label: string
    value: string
    elTagType?: ElTagType
    elTagClass?: string
    remark?: string
    [key: string]: any
  }

  // 基础选项
  interface BaseOptions<T = any> {
    success?: (data?: T) => void
    fail?: (err?: any) => void
  }

  // 表单重置选项
  type ResetOptions<T = any> = BaseOptions<T>

  // 表单回显选项
  type ViewOptions<T = any> = BaseOptions<T>

  // 表单提交选项
  interface SubmitOptions<T = string> extends BaseOptions<T> {
    calledFrom?: 'bussiness' | 'workflow'
    operation?: BaseEntity['operation']
  }

  // 选择器自定义 label 字段描述符
  interface LabelDescriptor<T = any> {
    text: string
    key: keyof T
    type: 'dict' | 'time' | 'plain' | 'amount'
    options?: Ref<DictDataOption[]> | ((item: T) => DictDataOption[])
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

  // 级联选择器参数
  interface CascaderParams<T> {
    value: string
    selectedOptions: (CascaderOption & T)[]
    tabIndex: number
  }
}
