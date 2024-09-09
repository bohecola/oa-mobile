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
