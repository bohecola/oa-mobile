import type { FieldRule } from 'vant'

export {}

declare global {
  declare interface BaseEntity {
    createBy?: any
    createDept?: any
    createTime?: string
    updateBy?: any
    updateTime?: any
    operation?: 'tempSave' | 'submit'
  }

  /**
   * 弹窗属性
   */
  declare interface DialogOption {
    title?: string
    visible: boolean
  }

  /**
   * 分页数据
   * T : 表单数据
   * D : 查询参数
   */
  declare interface PageData<T, D> {
    form: T
    queryParams: D
    rules: {
      [k in keyof T]?: FieldRule[]
    }
  }

  /**
   * 分页查询参数
   */
  interface PageQuery {
    pageNum: number
    pageSize: number
  }

  /**
   * 字典数据  数据配置
   */
  declare interface DictDataOption {
    label: string
    value: string
    elTagType?: ElTagType
    elTagClass?: string
  }

  /**
   * 选择器自定义 label 字段描述符
   */
  declare interface LabelDescriptor<T = any> {
    text: string
    key: keyof T
    type: 'dict' | 'time' | 'plain'
    options?: Ref<DictDataOption[]>
  }
}
