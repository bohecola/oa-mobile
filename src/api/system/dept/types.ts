/**
 * 部门查询参数
 */
export interface DeptQuery extends PageQuery {
  deptName?: string
  deptCategory?: string
  status?: string
  type?: string
  /**
   * 标识：内部人员看到的部门数据，系统管理看到的全部部门数据
   */
  isInternal?: string
  companyId?: string | number
}

/**
 * 部门类型
 */
export interface DeptVO extends BaseEntity {
  id: string
  parentName: string
  parentId: number | string
  children: DeptVO[]
  deptId: number | string
  companyId: number | string
  deptName: string
  deptCategory: string
  orderNum: number
  leader: string
  phone: string
  email: string
  status: string
  specialCommercialInsurance: string
  insuranceLimit: number
  delFlag: string
  ancestors: string
  menuId: string | number
  type: string
  responsibility: string
  purview: string
  address: string
  deptPostVoList: []
  isInternal: string
}

/**
 * 部门表单类型
 */
export interface DeptForm {
  id?: string
  parentName?: string
  parentId?: number | string
  children?: DeptForm[]
  deptId?: string
  deptName?: string
  companyId?: string | number
  deptCategory?: string
  businessType?: string // 业务类型
  specialCommercialInsurance?: string // 购买特殊商业保险
  insuranceLimit?: number
  responsibility?: string // 部门职能
  purview?: string // 部门权限
  address?: string // 地址
  type?: string
  orderNum?: number
  leader?: string
  leaderName?: string
  phone?: string
  email?: string
  status?: string
  delFlag?: string
  ancestors?: string
  deptPostVoList?: [] // 岗位配置表
  redFile?: string
  isInternal?: string
  ossIdList?: string[]
}
