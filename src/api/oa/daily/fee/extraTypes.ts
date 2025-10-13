export interface ExtraForm extends ZDFY, CLSYXGFY, XMRCFY, TGJLFY, AQLPXFY, FYXMBTSSYBXGMSQ, FYSCXMBLPRYYDSTBZFYSP {}

// 招待费
export interface ZDFY {
  a_entertainObject?: string
  a_entertainCompany?: string
  a_customerNumber?: number
  a_accompanyNumber?: number
  a_entertainForm?: string
  a_entertainDate?: string
  a_entertainAddress?: string
  a_entertainReason?: string
}

// 车辆使用相关费用
export interface CLSYXGFY {
  b_contractNo?: string
  b_vehicleNo?: string
  b_vehicleModel?: string
  b_vehicleMileageToday?: number
  b_lastRepairDate?: string
  b_maintenanceIntervalMileage?: number
  b_type?: string
  b_maintenanceAddress?: string
  b_problemDescription?: string
  b_maintenanceItemsAndUnitPrice?: string
  b_invoiceType?: string
  b_paymentMethod?: string
  b_isPlugSmartDrivingBox?: string
  b_useTime?: string
  b_useReason?: string
  b_oilContent?: string
  b_useMethod?: string
  b_annualReviewExpirationDate?: string
  b_verificationDate?: string
  b_lastAnnualReviewExpirationDate?: string
  b_lastVerificationDate?: string
  b_annualReviewMethod?: string
  b_lastStrongInsuranceExpirationDate?: string
  b_lastCommercialInsuranceExpirationDate?: string
  b_strongInsuranceAmount?: number
  b_commercialInsuranceAmount?: number
  b_totalAmount?: number
  // 保险公司
  b_insuranceCompany?: string
  // 交强险购买日期
  b_compulsoryInsuranceDate?: string
  // 交强险到期日期
  b_compulsoryInsuranceExpirationDate?: string
  // 商业险购买日期
  b_commercialInsuranceDate?: string
  // 商业险到期日期
  b_commercialInsuranceExpirationDate?: string
  // 上次里程数
  b_upMileage?: number
}

// 项目日常费用
export interface XMRCFY {
  c_startDate?: string
  c_endDate?: string
  c_paymentMethod?: string
  c_invoiceType?: string
}

// 投稿奖励费用
export interface TGJLFY {
  d_articleName?: string
  d_articleDetail?: string
  //   d_screenshot?: string;
  d_rewardAmount?: number
}

// 安全类培训费用
export interface AQLPXFY {}

// 项目部特殊商业保险购买申请
export interface FYXMBTSSYBXGMSQ {
  e_dailyWorkId?: string
  e_deptId?: string
  e_personnelCategory?: string
  e_insuranceExpirationDate?: string
  e_insuranceExpirationStartDate?: string
  e_insuranceExpirationEndDate?: string
  e_latestPurchaseDate?: string
  e_purchaseInsuranceReason?: string
  e_purchaseInsuranceNumber?: number
  e_purchaseInsuranceCategory?: string
  e_insuranceLimit?: number
  e_isHighVoltageOperation?: string
  e_isClimbingHomework?: string
  e_distanceRange?: number
  e_insurancePeriod?: string
  e_purchaseInsuranceSpecialExplain?: string
  e_isNewHiredPurchaseInsurance?: string
  e_transferInDeptPurchaseInsurance?: string
  e_transferOutDeptNoPurchaseInsurance?: string
  e_isEarlyStagePurchaseInsurance?: string
  e_isBelong?: string
  e_notBelongDeptPurchaseInsuranceSpecialReason?: string
  e_isOldInsuranceTermination?: string
  e_isOldInsuranceTerminationReason?: string
  e_isContractPurchaseInsurance?: string // 合同中是否要求购买此类保险
}
// 生产项目部临聘人员月度食堂补助费用审批
export interface FYSCXMBLPRYYDSTBZFYSP {
  f_applyNumber: number
}
