/**
 * 部门查询参数
 */
export interface DeptQuery extends PageQuery {
  deptName?: string
  deptCategory?: string
  status?: number
  type?: string
}

/**
 * 部门类型
 */
export interface DeptVO extends BaseEntity {
  id: number | string
  parentName: string
  parentId: number | string
  children: DeptVO[]
  deptId: number | string
  deptName: string
  deptCategory: string
  orderNum: number
  leader: string
  phone: string
  email: string
  status: string
  delFlag: string
  ancestors: string
  menuId: string | number
  type: string
  responsibility: string
  purview: string
  adress: string
  deptPostVoList: []
}

/**
 * 部门表单类型
 */
export interface DeptForm {
  parentName?: string
  parentId?: number | string
  children?: DeptForm[]
  deptId?: number | string
  deptName?: string
  deptCategory?: string
  responsibility?: string // 部门职能
  purview?: string // 部门权限
  adress?: string // 地址
  type?: string
  orderNum?: number
  leader?: string
  phone?: string
  email?: string
  status?: string
  delFlag?: string
  ancestors?: string
  redFile?: string
  ossIdList?: string
  deptPostVoList?: []
}
