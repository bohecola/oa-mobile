export interface RoleVO extends BaseEntity {
  roleId: string | number
  roleName: string
  roleKey: string
  roleSort: number
  dataScope: string
  menuCheckStrictly: boolean
  deptCheckStrictly: boolean
  status: string
  delFlag: string
  remark?: any
  flag: boolean
  menuIds?: Array<string | number>
  deptIds?: Array<string | number>
  admin: boolean
}
