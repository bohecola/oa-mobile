import type { BigSource } from 'big.js'
import Big from 'big.js'
import { isNil } from 'lodash-es'
import type { PurchaseForm, PurchaseItemVO, TaxRateVO } from '@/api/oa/business/purchase/types'
import { isNumeric } from '@/utils'

export const allFields: PartialBooleanRecord<PurchaseForm> = {
  id: true,
  no: true,
  processName: true,
  nature: true,
  taxRateList: true,
  subjectType: true,
  psId: true,
  deptId: true,
  type: true,
  purchaseMethod: true,
  businessCategory: true,
  objectCategory: true,
  serviceCategory: true,
  leaseType: true,
  isDeposit: true,
  contractId: true,
  contractNo: true,
  contractExecute: true,
  isOwnerSettlement: true,
  amount: true,
  notTaxAmount: true,
  realAmount: true,
  notTaxRealAmount: true,
  description: true,
  remark: true,
  itemList: true,
  ossIdList: true,
  hasPurchaseContract: true,
  purchaseContractIds: false,
  purchaseFiles: true,
  checkFiles: true,
  purchaseChange: true,
  qzIncomeDescription: true,
}

// 签证收入金额/增值税率明细
export const taxRateItem: TaxRateVO = {
  amount: undefined,
  taxRate: undefined,
  notTaxAmount: undefined,
}

// 采购明细
export const purchaseItem: PurchaseItemVO = {
  psiId: undefined,
  subjectItemDeptId: undefined,
  budgetAmount: undefined,
  applyingAmount: undefined,
  finishAmount: undefined,
  availableAmount: undefined,
  name: undefined,
  brand: undefined,
  specsModel: undefined,
  unit: undefined,
  num: undefined,

  invoiceType: undefined,
  taxRate: undefined,

  amount: undefined,
  taxAmount: undefined,

  totalAmount: undefined,
  taxTotalAmount: undefined,

  realAmount: undefined,
  taxRealAmount: undefined,

  realTotalAmount: undefined,
  taxRealTotalAmount: undefined,

  inquiryWay: undefined,
  supplier: undefined,
  remark: undefined,
}

// 车辆租赁时采购说明
export const vehiclePurchaseDescription = `使用责任人：
租车用途：
用车详细地点：
车辆品牌及型号：
租赁开始日期：
租赁结束日期：
用油方式：（现金加油或申请加油卡）`

// 验收附件上传说明
export const checkFilesDescription = `验收附件上传说明：
1.通过采购部采购的需要上传收货确认单及全部物资照片\n
2.自行采购需要上传网络订单截图(线上)/店内销售清单(线下)及全部物资照片 [注：照片必需带时间、地点(水印相机拍照)]`

// 签证收入情况说明
export const qzIncomeDescription = `如果在签证采购申请时无法确认签证收入金额，请在签证收入金额中暂按“0”填写，并请在“情况说明”栏中填写因什么工作内容增加导致需申请该采购，预计什么时间能确认签证收入金额，并暂估签证收入金额。`

// 商务部注意事项
export const businessDepartmentNotice = `
<div>1：签证采购审批中，请调整合同金额。</div>
<div>2：如果签证采购时无法确认签证收入金额，签证收入金额暂按“0”填写时，请记录该签证的收入确认预计时间，追踪签证收入金额，一经确认及时调整合同金额。</div>
`

// 空键检查
export function isAllKeyNil<T extends Record<string, any>>(list: T[], key: keyof T) {
  return list.every(e => isNil(e[key]))
}

// 总金额计算
export function sumTotalMoney<T extends Record<string, any>>(list: T[], key: keyof T) {
  const value = list.reduce<Big>((acc, curr) => {
    if (isNumeric(curr[key])) {
      return acc.add(curr[key] as BigSource)
    }
    return acc.add(Big(0))
  }, Big(0))

  return value.toNumber()
}
