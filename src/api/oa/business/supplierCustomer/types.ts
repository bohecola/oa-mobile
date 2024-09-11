export interface SupplierCustomerVO {
  id: string

  /**
   * 类型  0 客户 1 供应商
   */
  type: string

  /**
   * 名称
   */
  name: string

  /**
   * 联系人
   */
  contacts: string

  /**
   * 联系电话
   */
  contactPhone: string

  /**
   * 状态 0 正常 1 停用
   */
  status: string
}

export interface SupplierCustomerForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number

  /**
   * 类型  0 客户 1 供应商
   */
  type?: string | string[]

  /**
   * 名称
   */
  name?: string

  /**
   * 联系人
   */
  contacts?: string

  /**
   * 联系电话
   */
  contactPhone?: string

  /**
   * 地址
   */
  address?: string

  /**
   * 邮政编码
   */
  postalCode?: string

  /**
   * 开户行
   */
  openingBank?: string

  /**
   * 支行名称
   */

  branchBankName?: string

  /**
   * 银行卡号
   */
  bankCard?: string

  /**
   * 状态 0 正常 1 停用
   */
  status?: string

  /**
   * 备注
   */
  remark?: string
}

export interface SupplierCustomerQuery extends PageQuery {
  /**
   * 类型  0 客户 1 供应商
   */
  type?: string

  /**
   * 名称
   */
  name?: string

  /**
   * 联系人
   */
  contacts?: string

  /**
   * 联系电话
   */
  contactPhone?: string

  /**
   * 状态 0 正常 1 停用
   */
  status?: string

  /**
   * 日期范围参数
   */
  params?: any
}
