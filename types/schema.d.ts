export {}

declare global {
  interface BaseEntity {
    createDept?: any
    createBy?: any
    updateBy?: any
    createTime?: string
    updateTime?: string
  }
}
