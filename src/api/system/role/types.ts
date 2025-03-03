/**
 * 菜单树形结构类型
 */
export interface DeptTreeOption {
  id: string | number
  label: string
  parentId: string
  weight: number
  children?: DeptTreeOption[]
}

export interface RoleDeptTree {
  checkedKeys: string[]
  depts: DeptTreeOption[]
}

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

export interface RoleQuery extends PageQuery {
  roleName: string
  roleKey: string
  status: string
  /**
   * 标识：内部人员看到的部门数据，系统管理看到的全部部门数据
   */
  isInternal?: string
}

export interface RoleForm {
  roleName: string
  roleKey: string
  roleSort: number
  status: string
  menuCheckStrictly: boolean
  deptCheckStrictly: boolean
  remark: string
  dataScope?: string
  roleId: string | undefined
  menuIds: Array<string | number>
  deptIds: Array<string | number>
}
