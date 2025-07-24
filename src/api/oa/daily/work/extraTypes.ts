export interface ExtraForm
  extends SWXMKHJLQRD,
  RSLDHTXQSP,
  RSGHYYSP,
  RSKJXGZMHRSXGZZDSQ,
  RSSCXMBYRZRYXGZMKJSP,
  RSDYGSYGDZBXXSQ,
  RSXJRHMGSDDZZJGSQ,
  RSZGLYQXKTXGGBSQ,
  RSGYXGXYDDRSXGSPLCDSQ,
  RSXMBLWRYGZSP,
  RSLNHNYZRYDFGZJWXYJFYSP,
  RSXMBPYQWBRYSQ,
  RSKJGRXGZMSQ,
  RSGSGHYGFLSQ,
  RSYGWWJSQ,
  RSSCXMBYDYZXGFYSP,
  RSGCGLSYBXMBCFBZSQ,
  RSJCSCGSRYLDHTSQ,
  RSSCXMBRYYDXFFGLBZFYSQ,
  RSXMBRSZGQXGHSP,
  RSSCXMBJTFZQBZBZSQ,
  RSGSBMGWMCJBZTZSPLC,
  RSWBYGXYYJZX,
  RSXZSCGWSQ,
  RSWBRYZWXLGSRYDSQ,
  RSTXSP,
  RSFXSP,
  RSWZZRYBLSBZJHJSSPLC,
  RSGSRYZGZSZCSQ,
  RSYGKQZSBTSQ,
  RSYGKQZCJZSZSJLSQ,
  RSXMBQTFYSQ,
  RSQWBSCRYRZSQB,
  RSSCRYZPGZJLFYHSSPB,
  RSZPXQBGSQ,
  CWQQZH,
  CWCWZL,
  CWKJBH,
  SWSWZL,
  SWGSWLHJ,
  SWHTJSZL,
  XZYYFK,
  XZCCXMWZLZ,
  SWXSHTBH,
  RSXMBTSSYBXGMSQ,
  XZXLNYNASXTZHSQ,
  CGCGHTSQ,
  CGGYSZLSQ,
  KHXMRCKH {}

// 商务
// 项目考核奖励确认单
export interface SWXMKHJLQRD {
  a_deptId?: string | number
  a_contractId?: string
  a_contractNo?: string
  a_businessType?: string
  a_partyA?: string
  a_assessmentAmount?: number
  a_rewardAmount?: number
  a_assessmentReport?: string
}

// 人事
// 劳动合同续签审批
export interface RSLDHTXQSP {
  b_userId?: string
  b_deptId?: string | number
  b_postIds?: string
  b_sex?: string
  b_age?: string
  b_contractEndTime?: string
  b_contractType?: string
}

// 工会用印审批
export interface RSGHYYSP {
  c_deptId?: string | number
  c_sealType?: string
  c_useDate?: string
}

// 开具相关证明或人事相关资质的申请
export interface RSKJXGZMHRSXGZZDSQ {
  d_deptId?: string | number
  d_proveType?: string
}

// 生产项目部预入职人员相关证明开具审批
export interface RSSCXMBYRZRYXGZMKJSP {
  e_deptId?: string | number
  e_userCounts?: number
  e_proveType?: string
}

// 调用公司员工电子版信息申请
export interface RSDYGSYGDZBXXSQ {
  f_userId?: string
  f_deptId?: string | number
  f_fileType?: string
}

// 需加入鸿蒙公司钉钉组织架构申请
export interface RSXJRHMGSDDZZJGSQ {
  g_userId?: string
  g_deptId?: string | number
  g_postIds?: string
}

// 子管理员权限开通、修改、关闭申请
export interface RSZGLYQXKTXGGBSQ {
  h_userId?: string
  h_type?: string
  h_content?: string
  h_openingStatus?: string
  h_effectiveDate?: string
}

// 关于修改现有钉钉人事相关审批流程的申请
export interface RSGYXGXYDDRSXGSPLCDSQ {}

// 项目部劳务人员工资审批
export interface RSXMBLWRYGZSP {
  i_userId?: string
  i_deptIds?: string | number
  i_month?: string
  i_number?: number
  i_amount?: number
}

// 辽宁华能业主人员代发工资及五险一金费用审批
export interface RSLNHNYZRYDFGZJWXYJFYSP {
  j_userId?: string
  j_deptIds?: string | number
  j_month?: string
  j_number?: number
  j_amount?: number
  j_scAmount?: number
}

// 项目部聘用外包人员申请
export interface RSXMBPYQWBRYSQ {
  k_deptId?: string
  k_belongDeptIds?: string
  k_userType?: string
  k_isUniform?: string
  k_isKeyAccountsVP?: string
  k_nature?: string
  k_category?: string
  k_postId?: string
  k_number?: number
  k_isUseOriginalSalaryStandard?: string
  k_originalSalaryStandard?: number
  k_newSalaryStandard?: number
  k_effectiveDate?: string
  k_monthlyWorkingMode?: string
  k_salaryStandards?: number
  k_specialInstructions?: string
  k_otherDistribution?: string
  k_originalDistribution?: string
  k_changeAfterDistribution?: string
  k_changeReason?: string
  k_startDate?: string
  k_endDate?: string
  k_signeContractType?: string
  k_purchaseInsuranceType?: string
  k_workwearType?: string
  k_quantityAndSize?: string
  k_employInformation?: string
  k_insuranceStartDate?: string
  k_insuranceEndDate?: string
  k_insuranceSpecialInstructions?: string
  k_signeContractStartDate?: string
  k_signeContractEndDate?: string
  k_signeContractSpecialInstructions?: string
  k_isBudget?: string
  k_isBudgetStandards?: string
  k_supplementaryExplanation?: string
}

// 开具个人相关证明申请
export interface RSKJGRXGZMSQ {
  l_userId?: string
  l_userType?: string
  l_proveType?: string
}

// 公司工会员工福利申请
export interface RSGSGHYGFLSQ {
  m_welfareCategory?: string
  m_amount?: number
}

// 员工慰问金申请
export interface RSYGWWJSQ {
  n_userId?: string
  n_mounth?: string
  n_giftGoldCategory?: string
  n_amount?: number
}

// 生产项目部月度业主相关费用审批
export interface RSSCXMBYDYZXGFYSP {
  o_userId?: string
  o_deptId?: string | number
  o_amount?: number
}

// 工程管理事业部项目部餐费补助申请
export interface RSGCGLSYBXMBCFBZSQ {
  p_userId?: string
  p_deptId?: string | number
  p_amount?: number
}

// 生产项目部人员月度需发放各类补助费用申请
export interface RSSCXMBRYYDXFFGLBZFYSQ {
  q_userId?: string
  q_deptId?: string | number
  q_type?: string
  q_defectEliminationAmount?: number
  q_trafficAmount?: number
  q_personnelReuseSubsidyAmount?: number
  q_totalAmount?: number
}

// 部门/项目部人事主管权限更换审批
export interface RSXMBRSZGQXGHSP {
  r_deptId?: string | number
  r_oldUserId?: string
  r_newUserId?: string
  r_effectiveDate?: string
}

// 生产项目部交通费、驻勤补助标准申请
export interface RSSCXMBJTFZQBZBZSQ {
  s_deptId?: string | number
  s_costCategory?: string
  s_transportationStandards?: string
  s_transportationFeeAmount?: number
  s_subsidyStandardDetails?: string
  s_startDate?: string
  s_endDate?: string
}

// 解除生产/公司人员劳动合同申请
export interface RSJCSCGSRYLDHTSQ {
  t_userId?: string
  t_deptId?: string | number
  t_isFormal?: string
  t_postIds?: string
}

// 公司部门岗位名称及编制调整审批流程
export interface RSGSBMGWMCJBZTZSPLC {}

// 外包员工续用意见征询
export interface RSWBYGXYYJZX {
  x_userId?: string
  x_deptId?: string | number
  x_postIds?: string | number
  x_contractSigningTime?: string
  x_contractEndTime?: string
  x_isRetirementAge?: string
}

// 公司人员资格证书注册申请
export interface RSGSRYZGZSZCSQ {
  y_type?: string
  y_name?: string
  y_certificateStatus?: string
  y_speciality?: string
  y_no?: string
  y_issuanceDate?: string
  y_recheckDate?: string
  y_unit?: string
  y_startDate?: string
  y_endDate?: string
  y_isTraining?: string
  y_certificateLevel?: string // 证书等级
  y_otherCompanyUseStatus?: string // 证书目前是否正在其他公司使用
}

// 员工考取证书补贴申请
export interface RSYGKQZSBTSQ {
  yy_dailyWorkId?: string
  yy_type?: string
  yy_name?: string
  yy_certificateStatus?: string
  yy_speciality?: string
  yy_no?: string
  yy_issuanceDate?: string
  yy_recheckDate?: string
  yy_unit?: string
  yy_startDate?: string
  yy_endDate?: string
  yy_isTraining?: string
  yy_certificateLevel?: string // 证书等级
  yy_otherCompanyUseStatus?: string // 证书目前是否正在其他公司使用
  yy_entryCompanyDate?: string // 入职时间
  yy_subsidyStandards?: number // 补贴标准
  yy_registrationCompanyDate?: string // 注册到公司日期
}

// 员工考取注册建造师证书奖励申请
export interface RSYGKQZCJZSZSJLSQ {}

// 新增生产岗位申请
export interface RSXZSCGWSQ {
  z_deptId?: string | number
  z_postNumber?: number
  z_postNames?: string
}

// 外包人员转为咸林公司人员的申请
export interface RSWBRYZWXLGSRYDSQ {
  aa_deptId?: string | number
  aa_userId?: string
  aa_effectiveDate?: string
}

// 调薪审批
export interface RSTXSP {
  bb_userId?: string
  bb_effectiveDate?: string
  bb_changeSalaryAfter?: number
}

// 为资质人员办理社保增加或减少审批流程
export interface RSWZZRYBLSBZJHJSSPLC {
  cc_userId?: string
  cc_deptId?: string | number
  cc_socialSecurityProcessingCategory?: string
  cc_insuranceType?: string
  cc_effectiveMonth?: string
}

// 发薪审批
export interface RSFXSP {
  dd_month?: string
  dd_totalAmount?: number
}

// 项目部其他费用申请
export interface RSXMBQTFYSQ {
  ee_deptId?: string
  ee_salesContractNo?: string
  ee_category?: string
  ee_subsidyAmountStandard?: number
  ee_recipientsNumber?: number
  ee_subsidyTotalAmountMonth?: number
  ee_subsidyTotalAmountDay?: number
  ee_startDate?: string
  ee_endDate?: string
  ee_distributionCycle?: string
  ee_distributionMethod?: string
}
// 全外包生产人员入职申请表
export interface RSQWBSCRYRZSQB {
  ff_deptId?: string | number
  ff_userId?: string
  ff_age?: number
  ff_sex?: string
  ff_nation?: string
  ff_education?: string
  ff_interviewDate?: string
  ff_certificates?: string
  ff_employmentMethod?: string
  ff_employmentPost?: string
  ff_employmentNature?: string
  ff_hopeDate?: string
  ff_wages?: number
  ff_otherBenefits?: string
  ff_isProbation?: string
  ff_probationCycle?: number
  ff_probationWagesRate?: number
}

// 生产人员招聘工作奖励费用核算审批表
export interface RSSCRYZPGZJLFYHSSPB {}

// 招聘需求变更申请
export interface RSZPXQBGSQ {
  gg_deptId?: string
  gg_changeType?: string
  gg_changeDetails?: string
  gg_recruitmentNo?: string
  gg_formType?: string
  gg_contractNo?: string
  gg_changeBeforeRecruitNumber?: number
  gg_changeAfterRecruitNumber?: number
  gg_changeBeforeSalaryRange?: string
  gg_changeAfterSalaryRange?: string
  gg_fixedNumber?: number
  gg_changeAfterFixedNumber?: number
  gg_changeAfterNumberPost?: string
  gg_changeReason?: string
  gg_effectiveDate?: string
  gg_content?: string
  gg_additionalBudgetExpenses?: number
}

// 企企账号申请
export interface CWQQZH {
  hh_deptId?: string | number
  hh_type?: string
  hh_userId?: string
  hh_userName?: string
  hh_phone?: string
  hh_superiorLeaders?: string
  hh_isApprovalAuthority?: string
  hh_applyForAWebsite?: string
}

// 财务资料申请
export interface CWCWZL {
  ii_applicationMaterials?: string
}

// 开具保函申请
export interface CWKJBH {
  jj_type?: string
}

// 商务资料申请
export interface SWSWZL {
  kk_applicationMaterials?: string
}

// 公司往来函件申请
export interface SWGSWLHJ {
  ll_letterType?: string
  ll_fileType?: string
}

// 合同结算资料申请
export interface SWHTJSZL {
  mm_contractSettlementNature?: string
  mm_contractSettlementcontent?: string
}

// 预约访客申请
export interface XZYYFK {
  nn_isReservationKey?: string
}

// 撤场项目物资流转申请
export interface XZCCXMWZLZ {
  oo_evacuationMaterialPlan?: string
}

// 销售合同编号申请
export interface SWXSHTBH {
  pp_contractCategory?: string
  pp_contractNature?: string
  pp_contractNo?: string
  pp_customerName?: string
  pp_projectName?: string
  pp_projectOwnership?: string
  pp_projectLeader?: string
  pp_remark?: string
}

// 项目部特殊商业保险购买申请
export interface RSXMBTSSYBXGMSQ {
  qq_deptId?: string
  qq_deptName?: string
  qq_personnelCategory?: string
  qq_insuranceExpirationDate?: string // 建议保险开始截至时间
  qq_insuranceExpirationStartDate?: string // 建议保险开始时间
  qq_insuranceExpirationEndDate?: string // 建议保险截至时间
  qq_latestPurchaseDate?: string
  qq_purchaseInsuranceReason?: string
  qq_purchaseInsuranceNumber?: number
  qq_purchaseInsuranceCategory?: string
  qq_insuranceLimit?: number
  qq_isHighVoltageOperation?: string
  qq_isClimbingHomework?: string
  qq_distanceRange?: number
  qq_insurancePeriod?: string
  qq_purchaseInsuranceSpecialExplain?: string
  qq_isNewHiredPurchaseInsurance?: string
  qq_transferInDeptPurchaseInsurance?: string
  qq_transferOutDeptNoPurchaseInsurance?: string
  qq_isEarlyStagePurchaseInsurance?: string
  qq_isBelong?: string
  qq_notBelongDeptPurchaseInsuranceSpecialReason?: string
  qq_isOldInsuranceTermination?: string
  qq_isOldInsuranceTerminationReason?: string
  qq_isContractPurchaseInsurance?: string // 合同中是否要求购买此类保险
}

// 咸林能源NAS系统账号申请
export interface XZXLNYNASXTZHSQ {
  rr_deptId?: string | number
  rr_userId?: string | number
  rr_permission?: string
}

// 采购类
// 采购合同申请
export interface CGCGHTSQ {
  ss_applicationMaterials?: string
}

// 供应商资料申请
export interface CGGYSZLSQ {
  tt_applicationMaterials?: string
}

// 考核类
// 项目日常考核
export interface KHXMRCKH {
  uu_deptId?: string | number
  uu_contractId?: string
  uu_contractNo?: string
  uu_businessType?: string
  uu_partyA?: string
  uu_assessmentReport?: string
}
