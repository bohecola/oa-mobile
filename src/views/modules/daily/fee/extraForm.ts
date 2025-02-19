import type { FieldRule } from 'vant'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

const extraInitFormData: DailyFeeForm = {
  // 招待费用
  a_entertainObject: undefined,
  a_entertainCompany: undefined,
  a_customerNumber: undefined,
  a_accompanyNumber: undefined,
  a_entertainForm: undefined,
  a_entertainDate: undefined,
  a_entertainAddress: undefined,
  a_entertainReason: undefined,

  // 车辆使用相关费用（其中包含二级的字段）
  b_contractNo: undefined,
  b_vehicleNo: undefined,
  b_vehicleModel: undefined,
  b_vehicleMileageToday: undefined,
  b_lastRepairDate: undefined,
  b_maintenanceIntervalMileage: undefined,
  b_type: undefined,
  b_maintenanceAddress: undefined,
  b_problemDescription: undefined,
  b_maintenanceItemsAndUnitPrice: undefined,
  b_invoiceType: undefined,
  b_paymentMethod: undefined,
  b_isPlugSmartDrivingBox: undefined,
  b_useTime: undefined,
  b_useReason: undefined,
  b_oilContent: undefined,
  b_useMethod: undefined,
  b_annualReviewExpirationDate: undefined,
  b_verificationDate: undefined,
  b_annualReviewMethod: undefined,

  // 项目日常费用（其中包含二级的字段）
  c_startDate: undefined,
  c_endDate: undefined,
  c_paymentMethod: undefined,
  c_invoiceType: undefined,

  // 投稿奖励费
  d_articleName: undefined,
  d_articleDetail: undefined,
  // d_screenshot: undefined,
  d_rewardAmount: undefined,

  // 项目部特殊商业保险购买申请
  e_deptId: undefined,
  e_personnelCategory: undefined,
  e_insuranceExpirationDate: undefined,
  e_latestPurchaseDate: undefined,
  e_purchaseInsuranceReason: undefined,
  e_purchaseInsuranceNumber: undefined,
  e_purchaseInsuranceCategory: undefined,
  e_insuranceLimit: undefined,
  e_isHighVoltageOperation: undefined,
  e_isClimbingHomework: undefined,
  e_distanceRange: undefined,
  e_insurancePeriod: undefined,
  e_purchaseInsuranceSpecialExplain: undefined,
  e_isNewHiredPurchaseInsurance: undefined,
  e_transferInDeptPurchaseInsurance: undefined,
  e_transferOutDeptNoPurchaseInsurance: undefined,
  e_isEarlyStagePurchaseInsurance: undefined,
  e_isBelong: undefined,
  e_notBelongDeptPurchaseInsuranceSpecialReason: undefined,
  e_isOldInsuranceTermination: undefined,
  e_isOldInsuranceTerminationReason: undefined,

  // 生产项目部临聘人员月度食堂补助费用审批
  f_applyNumber: undefined,
}

const baseMsg = '不能为空'

const extraInitRules: Record<string, FieldRule[]> = {
  // 招待费用
  a_entertainObject: [{ required: true, message: `招待对象${baseMsg}`, trigger: 'onBlur' }],
  a_entertainCompany: [{ required: true, message: `招待单位${baseMsg}`, trigger: 'onBlur' }],
  a_customerNumber: [{ required: true, message: `客户人数${baseMsg}`, trigger: 'onBlur' }],
  a_accompanyNumber: [{ required: true, message: `陪同人数${baseMsg}`, trigger: 'onBlur' }],
  a_entertainForm: [{ required: true, message: `招待形式${baseMsg}`, trigger: 'onBlur' }],
  a_entertainDate: [{ required: true, message: `招待日期${baseMsg}`, trigger: 'onBlur' }],
  a_entertainAddress: [{ required: true, message: `招待地点${baseMsg}`, trigger: 'onBlur' }],
  a_entertainReason: [{ required: true, message: `招待事由${baseMsg}`, trigger: 'onBlur' }],

  // 车辆使用相关费用
  b_contractNo: [{ required: true, message: `合同编号${baseMsg}`, trigger: 'onBlur' }],
  b_vehicleNo: [{ required: true, message: `车牌号${baseMsg}`, trigger: 'onBlur' }],
  b_vehicleModel: [{ required: true, message: `车型${baseMsg}`, trigger: 'onBlur' }],
  b_vehicleMileageToday: [{ required: true, message: `今行车里程（公里）${baseMsg}`, trigger: 'onBlur' }],
  b_lastRepairDate: [{ required: true, message: `上次维修日期${baseMsg}`, trigger: 'onBlur' }],
  b_maintenanceIntervalMileage: [{ required: true, message: `保养间隔里程数（公里）${baseMsg}`, trigger: 'onBlur' }],
  b_type: [{ required: true, message: `申请类型${baseMsg}`, trigger: 'onBlur' }],
  b_maintenanceAddress: [{ required: true, message: `车辆维修/保养地点${baseMsg}`, trigger: 'onBlur' }],
  b_problemDescription: [{ required: true, message: `问题描述${baseMsg}`, trigger: 'onBlur' }],
  b_maintenanceItemsAndUnitPrice: [{ required: true, message: `维修/保养项目及单价${baseMsg}`, trigger: 'onBlur' }],
  b_invoiceType: [{ required: true, message: `发票类型${baseMsg}`, trigger: 'onBlur' }],
  b_paymentMethod: [{ required: true, message: `付款方式${baseMsg}`, trigger: 'onBlur' }],
  b_isPlugSmartDrivingBox: [{ required: true, message: `本次维保是否需拔插智驾盒子${baseMsg}`, trigger: 'onBlur' }],
  b_useTime: [{ required: true, message: `使用时间${baseMsg}`, trigger: 'onBlur' }],
  b_oilContent: [{ required: true, message: `用油内容${baseMsg}`, trigger: 'onBlur' }],
  b_useReason: [{ required: true, message: `使用事由${baseMsg}`, trigger: 'onBlur' }],
  b_useMethod: [{ required: true, message: `使用方式${baseMsg}`, trigger: 'onBlur' }],
  b_annualReviewExpirationDate: [{ required: true, message: `年审到期时间${baseMsg}`, trigger: 'onBlur' }],
  b_verificationDate: [{ required: true, message: `审验日期${baseMsg}`, trigger: 'onBlur' }],
  b_annualReviewMethod: [{ required: true, message: `年审方式${baseMsg}`, trigger: 'onBlur' }],

  // 项目日常费用
  c_startDate: [{ required: true, message: `开始时间${baseMsg}`, trigger: 'onBlur' }],
  c_endDate: [{ required: true, message: `结束时间${baseMsg}`, trigger: 'onBlur' }],
  c_paymentMethod: [{ required: true, message: `付款方式${baseMsg}`, trigger: 'onBlur' }],
  c_invoiceType: [{ required: true, message: `发票类型${baseMsg}`, trigger: 'onBlur' }],

  // 投稿奖励费
  d_articleName: [{ required: true, message: `稿件名称${baseMsg}`, trigger: 'onBlur' }],
  d_articleDetail: [{ required: true, message: `稿件详情${baseMsg}`, trigger: 'onBlur' }],
  // d_screenshot: [{ required: true, message: `招待事由${baseMsg}`, trigger: 'onBlur' }],
  d_rewardAmount: [{ required: true, message: `奖励金额${baseMsg}`, trigger: 'onBlur' }],

  // 项目部特殊商业保险购买申请
  e_deptId: [{ required: true, message: `部门/项目部${baseMsg}`, trigger: 'onBlur' }],
  // e_personnelCategory: [{ required: true, message: `人员类别${baseMsg}`, trigger: 'onBlur' }],
  // e_insuranceExpirationDate: [{ required: true, message: `建议保险开始截止日期${baseMsg}`, trigger: 'onBlur' }],
  // e_latestPurchaseDate: [{ required: true, message: `保险最晚购买日期${baseMsg}`, trigger: 'onBlur' }],
  // e_purchaseInsuranceReason: [{ required: true, message: `购买保险原因${baseMsg}`, trigger: 'onBlur' }],
  // e_purchaseInsuranceNumber: [{ required: true, message: `购买保险人数${baseMsg}`, trigger: 'onBlur' }],
  // e_purchaseInsuranceCategory: [{ required: true, message: `购买保险类别${baseMsg}`, trigger: 'onBlur' }],
  // e_insuranceLimit: [{ required: true, message: `购买保险额度(万元)${baseMsg}`, trigger: 'onBlur' }],
  // e_isHighVoltageOperation: [{ required: true, message: `是否涉及高压电作业${baseMsg}`, trigger: 'onBlur' }],
  // e_isClimbingHomework: [{ required: true, message: `是否涉及登高作业${baseMsg}`, trigger: 'onBlur' }],
  // e_distanceRange: [{ required: true, message: `登高作业位置到地面的距离范围${baseMsg}`, trigger: 'onBlur' }],
  // e_insurancePeriod: [{ required: true, message: `保险期限${baseMsg}`, trigger: 'onBlur' }],
  // e_purchaseInsuranceSpecialExplain: [{ required: true, message: `保险购买特殊说明${baseMsg}`, trigger: 'onBlur' }],
  // e_isNewHiredPurchaseInsurance: [{ required: true, message: `该项目部新入职人员是否购买此类保险${baseMsg}`, trigger: 'blur' }],
  // e_transferInDeptPurchaseInsurance: [{ required: true, message: `调入该项目部是否购买此类保险${baseMsg}`, trigger: 'blur' }],
  // e_transferOutDeptNoPurchaseInsurance: [{ required: true, message: `调出该项目部是否购买此类保险${baseMsg}`, trigger: 'blur' }],
  // e_isEarlyStagePurchaseInsurance: [{ required: true, message: `该项目部前期是否已购买其他商业类保险${baseMsg}`, trigger: 'blur' }],
  // e_isBelong: [{ required: true, message: `人员是否属于该项目部${baseMsg}`, trigger: 'blur' }],
  // e_notBelongDeptPurchaseInsuranceSpecialReason: [{ required: true, message: `不属于该项目部人员购买保险原因${baseMsg}`, trigger: 'blur' }],
  // e_isOldInsuranceTermination: [{ required: true, message: `原特殊商业保险是否终止${baseMsg}`, trigger: 'blur' }],
  // e_isOldInsuranceTerminationReason: [{ required: true, message: `原特殊商业保险终止原因说明${baseMsg}`, trigger: 'blur' }],

  // 生产项目部临聘人员月度食堂补助费用审批
  f_applyNumber: [{ required: true, message: `申请人数${baseMsg}`, trigger: 'onBlur' }],
}
export { extraInitFormData, extraInitRules }
