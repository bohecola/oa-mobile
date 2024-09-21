import type { FieldRule } from 'vant'

export {}

declare global {
  interface BaseEntity {
    createDept?: any
    createBy?: any
    updateBy?: any
    createTime?: string
    updateTime?: string
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
      [key: string]: FieldRule[]
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
}
