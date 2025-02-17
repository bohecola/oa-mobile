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
  b_vehicleModel?: number
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
  b_annualReviewMethod?: string
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
  e_personnelCategory?: string
  e_insuranceExpirationDate?: string
  e_latestPurchaseDate?: string
  e_purchaseInsuranceReason?: string
  e_purchaseInsuranceNumber?: number
  e_purchaseInsuranceCategory?: string
  e_isHighVoltageOperation?: string
  e_isClimbingHomework?: string
  e_insurancePeriod?: string
  e_purchaseInsuranceSpecialExplain?: string
}
// 生产项目部临聘人员月度食堂补助费用审批
export interface FYSCXMBLPRYYDSTBZFYSP {
  f_applyNumber: number
}
