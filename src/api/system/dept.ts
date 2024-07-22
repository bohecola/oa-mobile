export interface DeptVO extends BaseEntity {
  id: number | string
  parentName: string
  parentId: number | string
  children: DeptVO[]
  deptId: number | string
  deptName: string
  orderNum: number
  leader: string
  phone: string
  email: string
  status: string
  delFlag: string
  ancestors: string
  menuId: string | number
}
