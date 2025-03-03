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
  businessType?: string // 业务类型
  responsibility?: string // 部门职能
  purview?: string // 部门权限
  address?: string // 地址
  type?: string
  orderNum?: number
  leader?: string
  phone?: string
  email?: string
  specialCommercialInsurance?: string // 购买特殊商业保险
  insuranceLimit?: number
  status?: string
  delFlag?: string
  ancestors?: string
  redFile?: string
  ossIdList?: string
  deptPostVoList?: []
}

export interface TreeVO {
  /**
   * 主键
   */
  id: string | number

  /**
   * 父id
   */
  parentId: string | number

  /**
   * 部门id
   */
  deptId: string | number

  /**
   * 用户id
   */
  userId: string | number

  /**
   * 值
   */
  treeName: string

  /**
   * 子对象
   */
  children: TreeVO[]
}
