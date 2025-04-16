import type { FieldRule } from 'vant'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const extraInitFormData: DailyWorkForm = {
  // 项目考核奖励确认单
  a_contractId: undefined,
  a_deptId: undefined,
  a_contractNo: undefined,
  a_businessType: undefined,
  a_partyA: undefined,
  a_assessmentAmount: undefined,
  a_rewardAmount: undefined,

  // 劳动合同续签审批
  b_userId: undefined,
  b_deptId: undefined,
  b_postIds: undefined,
  b_sex: undefined,
  b_age: undefined,
  b_contractEndTime: undefined,
  b_contractType: undefined,

  // 工会用印审批
  c_deptId: undefined,
  c_sealType: undefined,
  c_useDate: undefined,

  // 开具相关证明或人事相关资质的申请
  d_deptId: undefined,
  d_proveType: undefined,

  // 生产项目部预入职人员相关证明开具审批
  e_deptId: undefined,
  e_userCounts: undefined,
  e_proveType: undefined,

  // 调用公司员工电子版信息申请
  f_userId: undefined,
  f_deptId: undefined,
  f_fileType: undefined,

  // 需加入鸿蒙公司钉钉组织架构申请
  g_userId: undefined,
  g_deptId: undefined,
  g_postIds: undefined,

  // 子管理员权限开通、修改、关闭申请
  h_userId: undefined,
  h_type: undefined,
  h_content: undefined,
  h_openingStatus: undefined,
  h_effectiveDate: undefined,

  // 项目部劳务人员工资审批
  i_userId: undefined,
  i_deptIds: undefined,
  i_month: undefined,
  i_number: undefined,
  i_amount: undefined,

  // 辽宁华能业主人员代发工资及五险一金费用审批
  j_userId: undefined,
  j_deptIds: undefined,
  j_month: undefined,
  j_number: undefined,
  j_amount: undefined,
  j_scAmount: undefined,

  // 项目部聘用外包人员申请
  k_deptId: undefined,
  k_userType: undefined,
  k_isUniform: undefined,
  k_isKeyAccountsVP: undefined,
  k_nature: undefined,
  k_category: undefined,
  k_postId: undefined,
  k_number: undefined,
  k_isUseOriginalSalaryStandard: undefined,
  k_originalSalaryStandard: undefined,
  k_newSalaryStandard: undefined,
  k_effectiveDate: undefined,
  k_monthlyWorkingMode: undefined,
  k_salaryStandards: undefined,
  k_specialInstructions: undefined,
  k_otherDistribution: undefined,
  k_originalDistribution: undefined,
  k_changeAfterDistribution: undefined,
  k_changeReason: undefined,
  k_startDate: undefined,
  k_endDate: undefined,
  k_signeContractType: undefined,
  k_purchaseInsuranceType: undefined,
  k_workwearType: undefined,
  k_quantityAndSize: undefined,
  k_employInformation: undefined,
  k_insuranceStartDate: undefined,
  k_insuranceEndDate: undefined,
  k_insuranceSpecialInstructions: undefined,
  k_signeContractStartDate: undefined,
  k_signeContractEndDate: undefined,
  k_signeContractSpecialInstructions: undefined,
  k_isBudget: undefined,
  k_isBudgetStandards: undefined,
  k_supplementaryExplanation: undefined,

  // 开具个人相关证明申请
  l_userId: undefined,
  l_userType: undefined,
  l_proveType: undefined,

  // 公司工会员工福利申请
  m_welfareCategory: undefined,
  m_amount: undefined,

  // 员工慰问金申请
  n_userId: undefined,
  n_mounth: undefined,
  n_giftGoldCategory: undefined,
  n_amount: undefined,

  // 生产项目部月度业主相关费用审批
  o_userId: undefined,
  o_deptId: undefined,
  o_amount: undefined,

  // 工程管理事业部项目部餐费补助申请
  p_userId: undefined,
  p_deptId: undefined,
  p_amount: undefined,

  // 生产项目部人员月度需发放各类补助费用申请
  q_userId: undefined,
  q_deptId: undefined,
  q_type: undefined,
  q_defectEliminationAmount: undefined,
  q_trafficAmount: undefined,
  q_personnelReuseSubsidyAmount: undefined,
  q_totalAmount: undefined,

  // 部门/项目部人事主管权限更换审批
  r_deptId: undefined,
  r_oldUserId: undefined,
  r_newUserId: undefined,
  r_effectiveDate: undefined,

  // 生产项目部交通费、驻勤补助标准申请
  s_deptId: undefined,
  s_costCategory: undefined,
  s_transportationStandards: undefined,
  s_transportationFeeAmount: undefined,
  s_subsidyStandardDetails: undefined,
  s_startDate: undefined,
  s_endDate: undefined,

  // 解除生产/公司人员劳动合同申请
  t_userId: undefined,
  t_deptId: undefined,
  t_isFormal: undefined,
  t_postIds: undefined,

  // 外包员工续用意见征询
  x_userId: undefined,
  x_deptId: undefined,
  x_postIds: undefined,
  x_contractSigningTime: undefined,
  x_contractEndTime: undefined,
  x_isRetirementAge: undefined,

  // 公司人员资格证书注册申请
  y_type: undefined,
  y_name: undefined,
  y_certificateStatus: undefined,
  y_speciality: undefined,
  y_no: undefined,
  y_issuanceDate: undefined,
  y_recheckDate: undefined,
  y_unit: undefined,
  y_startDate: undefined,
  y_endDate: undefined,
  y_isTraining: undefined,
  y_certificateLevel: undefined, // 证书等级
  y_otherCompanyUseStatus: undefined, // 证书目前是否正在其他公司使用

  // 员工考取证书补贴申请
  yy_dailyWorkId: undefined,
  yy_type: undefined,
  yy_name: undefined,
  yy_certificateStatus: undefined,
  yy_speciality: undefined,
  yy_no: undefined,
  yy_issuanceDate: undefined,
  yy_recheckDate: undefined,
  yy_unit: undefined,
  yy_startDate: undefined,
  yy_endDate: undefined,
  yy_isTraining: undefined,
  yy_certificateLevel: undefined, // 证书等级
  yy_otherCompanyUseStatus: undefined, // 证书目前是否正在其他公司使用
  yy_entryCompanyDate: undefined, // 入职时间
  yy_subsidyStandards: undefined, // 补贴标准
  yy_registrationCompanyDate: undefined, // 注册到公司日期

  // 新增生产岗位申请
  z_deptId: undefined,
  z_postNumber: undefined,
  z_postNames: undefined,

  // 外包人员转为咸林公司人员的申请
  aa_deptId: undefined,
  aa_userId: undefined,
  aa_effectiveDate: undefined,

  // 调薪审批
  bb_userId: undefined,
  bb_effectiveDate: undefined,
  bb_changeSalaryAfter: undefined,

  // 为资质人员办理社保增加或减少审批流程
  cc_userId: undefined,
  cc_deptId: undefined,
  cc_socialSecurityProcessingCategory: undefined,
  cc_insuranceType: undefined,
  cc_effectiveMonth: undefined,

  // 发薪审批
  dd_totalAmount: undefined,
  dd_month: undefined,

  // 项目部其他费用申请
  ee_deptId: undefined,
  ee_salesContractNo: undefined,
  ee_category: undefined,
  ee_subsidyAmountStandard: undefined,
  ee_recipientsNumber: undefined,
  ee_subsidyTotalAmountMonth: undefined,
  ee_subsidyTotalAmountDay: undefined,
  ee_startDate: undefined,
  ee_endDate: undefined,
  ee_distributionCycle: undefined,
  ee_distributionMethod: undefined,

  // 全外包生产人员入职申请表
  ff_deptId: undefined,
  ff_userId: undefined,
  ff_age: undefined,
  ff_sex: undefined,
  ff_nation: undefined,
  ff_education: undefined,
  ff_interviewDate: undefined,
  ff_certificates: undefined,
  ff_employmentMethod: undefined,
  ff_employmentPost: undefined,
  ff_employmentNature: undefined,
  ff_hopeDate: undefined,
  ff_wages: undefined,
  ff_otherBenefits: undefined,
  ff_isProbation: undefined,
  ff_probationCycle: undefined,
  ff_probationWagesRate: undefined,

  // 招聘需求变更申请
  gg_deptId: undefined,
  gg_changeType: undefined,
  gg_changeDetails: undefined,
  gg_recruitmentNo: undefined,
  gg_formType: undefined,
  gg_contractNo: undefined,
  gg_changeBeforeRecruitNumber: undefined,
  gg_changeAfterRecruitNumber: undefined,
  gg_changeBeforeSalaryRange: undefined,
  gg_changeAfterSalaryRange: undefined,
  gg_fixedNumber: undefined,
  gg_changeAfterFixedNumber: undefined,
  gg_changeAfterNumberPost: undefined,
  gg_changeReason: undefined,
  gg_effectiveDate: undefined,
  gg_content: undefined,
  gg_additionalBudgetExpenses: undefined,

  // 企企账号申请
  hh_deptId: undefined,
  hh_type: undefined,
  hh_userId: undefined,
  hh_userName: undefined,
  hh_phone: undefined,
  hh_superiorLeaders: undefined,
  hh_isApprovalAuthority: undefined,
  hh_applyForAWebsite: undefined,

  // 财务资料申请
  ii_applicationMaterials: undefined,

  // 开具保函申请
  jj_type: undefined,

  // 商务资料申请
  kk_applicationMaterials: undefined,

  // 公司往来函件申请
  ll_letterType: undefined,
  ll_fileType: undefined,

  // 合同结算资料申请
  mm_contractSettlementNature: undefined,
  mm_contractSettlementcontent: undefined,

  // 预约访客申请
  nn_isReservationKey: undefined,

  // 撤场项目物资流转申请
  oo_evacuationMaterialPlan: undefined,

  // 销售合同编号申请
  pp_contractCategory: undefined,
  pp_contractNature: undefined,
  pp_contractNo: undefined,
  pp_customerName: undefined,
  pp_projectName: undefined,
  pp_projectOwnership: undefined,
  pp_remark: undefined,

  // 项目部特殊商业保险购买申请
  qq_deptId: undefined,
  qq_deptName: undefined,
  qq_personnelCategory: undefined,
  qq_insuranceExpirationDate: undefined,
  qq_insuranceExpirationStartDate: undefined,
  qq_insuranceExpirationEndDate: undefined,
  qq_latestPurchaseDate: undefined,
  qq_purchaseInsuranceReason: undefined,
  qq_purchaseInsuranceNumber: undefined,
  qq_purchaseInsuranceCategory: undefined,
  qq_insuranceLimit: undefined,
  qq_isHighVoltageOperation: undefined,
  qq_isClimbingHomework: undefined,
  qq_distanceRange: undefined,
  qq_insurancePeriod: undefined,
  qq_purchaseInsuranceSpecialExplain: undefined,
  qq_isContractPurchaseInsurance: undefined, // 默认值'Y'需要上传合同中要求购买此类保险的原文截图,不能修改如果是N的话不能发起
}

const baseMsg = '不能为空'

const extraInitRules: Record<string, FieldRule[]> = {
  // 项目考核奖励确认单
  a_contractId: [{ required: true, message: `合同名称${baseMsg}`, trigger: 'onBlur' }],
  a_deptId: [{ required: true, message: `部门${baseMsg}`, trigger: 'onBlur' }],
  a_assessmentAmount: [{ required: true, message: `考核金额${baseMsg}`, trigger: 'onBlur' }],
  a_rewardAmount: [{ required: true, message: `奖励金${baseMsg}`, trigger: 'onBlur' }],

  // 劳动合同续签审批
  b_userId: [{ required: true, message: `员工${baseMsg}`, trigger: 'onBlur' }],
  b_contractEndTime: [{ required: true, message: `合同到期时间${baseMsg}`, trigger: 'onBlur' }],
  b_contractType: [{ required: true, message: `合同类型${baseMsg}`, trigger: 'onBlur' }],

  // 工会用印审批
  c_deptId: [{ required: true, message: `申请部门${baseMsg}`, trigger: 'onBlur' }],
  c_sealType: [{ required: true, message: `用印类型${baseMsg}`, trigger: 'onBlur' }],
  c_useDate: [{ required: true, message: `用印日期${baseMsg}`, trigger: 'onBlur' }],

  // 开具相关证明或人事相关资质的申请
  d_deptId: [{ required: true, message: `部门/项目部${baseMsg}`, trigger: 'onBlur' }],
  d_proveType: [{ required: true, message: `证明类别${baseMsg}`, trigger: 'onBlur' }],

  // 生产项目部预入职人员相关证明开具审批，
  e_deptId: [{ required: true, message: `部门/项目部${baseMsg}`, trigger: 'onBlur' }],
  e_userCounts: [{ required: true, message: `证明开具人数${baseMsg}`, trigger: 'onBlur' }],
  e_proveType: [{ required: true, message: `证明类型${baseMsg}`, trigger: 'onBlur' }],

  // 调用公司员工电子版信息申请
  f_userId: [{ required: true, message: `申请人${baseMsg}`, trigger: 'onBlur' }],
  f_deptId: [{ required: true, message: `部门${baseMsg}`, trigger: 'onBlur' }],
  f_fileType: [{ required: true, message: `资料类别${baseMsg}`, trigger: 'onBlur' }],

  // 需加入鸿蒙公司钉钉组织架构申请
  g_userId: [{ required: true, message: `申请人${baseMsg}`, trigger: 'onBlur' }],

  // 子管理员权限开通、修改、关闭申请
  h_userId: [{ required: true, message: `申请子管理员权限人员${baseMsg}`, trigger: 'onBlur' }],
  h_type: [{ required: true, message: `子管理员调整类型${baseMsg}`, trigger: 'onBlur' }],
  h_content: [{ required: true, message: `内容${baseMsg}`, trigger: 'onBlur' }],
  h_openingStatus: [{ required: true, message: `开通情况${baseMsg}`, trigger: 'onBlur' }],
  h_effectiveDate: [{ required: true, message: `生效日期${baseMsg}`, trigger: 'onBlur' }],

  // 项目部劳务人员工资审批
  i_userId: [{ required: true, message: `提交人${baseMsg}`, trigger: 'onBlur' }],
  i_deptIds: [{ required: true, message: `项目部名称${baseMsg}`, trigger: 'onBlur' }],
  i_month: [{ required: true, message: `所发工资月份${baseMsg}`, trigger: 'onBlur' }],
  i_number: [{ required: true, message: `所发工资人数${baseMsg}`, trigger: 'onBlur' }],
  i_amount: [{ required: true, message: `所发工资总金额${baseMsg}`, trigger: 'onBlur' }],

  // 辽宁华能业主人员代发工资及五险一金费用审批
  j_userId: [{ required: true, message: `提交人${baseMsg}`, trigger: 'onBlur' }],
  j_deptIds: [{ required: true, message: `项目部名称${baseMsg}`, trigger: 'onBlur' }],
  j_month: [{ required: true, message: `所发工资月份${baseMsg}`, trigger: 'onBlur' }],
  j_number: [{ required: true, message: `所发工资人数${baseMsg}`, trigger: 'onBlur' }],
  j_amount: [{ required: true, message: `应发工资总额${baseMsg}`, trigger: 'onBlur' }],
  j_scAmount: [{ required: true, message: `单位社保总额${baseMsg}`, trigger: 'onBlur' }],

  // 项目部聘用外包人员申请
  k_deptId: [{ required: true, message: `申请部门${baseMsg}`, trigger: 'onBlur' }],
  k_userType: [{ required: true, message: `人员类别${baseMsg}`, trigger: 'onBlur' }],
  k_isUniform: [{ required: true, message: `是否配备公司工作服${baseMsg}`, trigger: 'onBlur' }],
  k_nature: [{ required: true, message: `聘用人员性质${baseMsg}`, trigger: 'onBlur' }],
  k_category: [{ required: true, message: `聘用类别${baseMsg}`, trigger: 'onBlur' }],
  k_postId: [{ required: true, message: `人员岗位${baseMsg}`, trigger: 'onBlur' }],
  k_number: [{ required: true, message: `人员数量${baseMsg}`, trigger: 'onBlur' }],
  k_isUseOriginalSalaryStandard: [{ required: true, message: `是否延用原工资标准${baseMsg}`, trigger: 'onBlur' }],
  k_originalSalaryStandard: [{ required: true, message: `原工资标准（人/元/月）${baseMsg}`, trigger: 'onBlur' }],
  k_newSalaryStandard: [{ required: true, message: `新工资标准（人/元/月）${baseMsg}`, trigger: 'onBlur' }],
  k_effectiveDate: [{ required: true, message: `变更生效时间${baseMsg}`, trigger: 'onBlur' }],
  k_monthlyWorkingMode: [{ required: true, message: `月度上班及休假模式${baseMsg}`, trigger: 'onBlur' }],
  k_salaryStandards: [{ required: true, message: `工资标准（元/人/月）${baseMsg}`, trigger: 'onBlur' }],
  k_specialInstructions: [{ required: true, message: `工资发放特殊说明${baseMsg}`, trigger: 'onBlur' }],
  k_otherDistribution: [{ required: true, message: `其他补助、发放标准及发放形式${baseMsg}`, trigger: 'onBlur' }],
  k_originalDistribution: [{ required: true, message: `原补助、发放标准及发放形式${baseMsg}`, trigger: 'onBlur' }],
  k_changeAfterDistribution: [{ required: true, message: `变更后补助、发放标准及发放形式${baseMsg}`, trigger: 'onBlur' }],
  k_changeReason: [{ required: true, message: `申请/增加/减少/变更聘用原因${baseMsg}`, trigger: 'onBlur' }],
  k_startDate: [{ required: true, message: `聘用开始时间${baseMsg}`, trigger: 'onBlur' }],
  k_endDate: [{ required: true, message: `聘用结束时间${baseMsg}`, trigger: 'onBlur' }],
  k_signeContractType: [{ required: true, message: `聘用人员签订合同类型${baseMsg}`, trigger: 'onBlur' }],
  k_purchaseInsuranceType: [{ required: true, message: `聘用人员购买保险类型${baseMsg}`, trigger: 'onBlur' }],
  k_workwearType: [{ required: true, message: `工服类型${baseMsg}`, trigger: 'onBlur' }],
  k_quantityAndSize: [{ required: true, message: `数量与尺寸${baseMsg}`, trigger: 'onBlur' }],
  k_employInformation: [{ required: true, message: `聘用人员信息${baseMsg}`, trigger: 'onBlur' }],
  k_insuranceStartDate: [{ required: true, message: `保险开始时间${baseMsg}`, trigger: 'onBlur' }],
  k_insuranceEndDate: [{ required: true, message: `保险结束时间${baseMsg}`, trigger: 'onBlur' }],
  k_insuranceSpecialInstructions: [{ required: true, message: `保险购买特殊说明${baseMsg}`, trigger: 'onBlur' }],
  k_signeContractStartDate: [{ required: true, message: `合同签订开始时间${baseMsg}`, trigger: 'onBlur' }],
  k_signeContractEndDate: [{ required: true, message: `合同签订结束时间${baseMsg}`, trigger: 'onBlur' }],
  k_signeContractSpecialInstructions: [{ required: true, message: `合同签订特殊说明${baseMsg}`, trigger: 'onBlur' }],
  k_isBudget: [{ required: true, message: `是否有预算${baseMsg}`, trigger: 'onBlur' }],
  k_isBudgetStandards: [{ required: true, message: `是否符合预算标准${baseMsg}`, trigger: 'onBlur' }],
  k_supplementaryExplanation: [{ required: true, message: `补充说明${baseMsg}`, trigger: 'onBlur' }],

  // 开具个人相关证明申请
  l_userId: [{ required: true, message: `申请人${baseMsg}`, trigger: 'onBlur' }],
  l_userType: [{ required: true, message: `人员类别${baseMsg}`, trigger: 'onBlur' }],
  l_proveType: [{ required: true, message: `证明类型${baseMsg}`, trigger: 'onBlur' }],

  // 公司工会员工福利申请
  m_welfareCategory: [{ required: true, message: `福利类别${baseMsg}`, trigger: 'onBlur' }],
  m_amount: [{ required: true, message: `金额合计${baseMsg}`, trigger: 'onBlur' }],

  // 员工慰问金申请
  n_userId: [{ required: true, message: `申请人${baseMsg}`, trigger: 'onBlur' }],
  n_mounth: [{ required: true, message: `申请月份${baseMsg}`, trigger: 'onBlur' }],
  n_giftGoldCategory: [{ required: true, message: `礼（慰问）金类别${baseMsg}`, trigger: 'onBlur' }],
  n_amount: [{ required: true, message: `本月礼（慰问）金合计${baseMsg}`, trigger: 'onBlur' }],

  // 生产项目部月度业主相关费用审批
  o_userId: [{ required: true, message: `申请人${baseMsg}`, trigger: 'onBlur' }],
  o_deptId: [{ required: true, message: `所属部门${baseMsg}`, trigger: 'onBlur' }],
  o_amount: [{ required: true, message: `总金额${baseMsg}`, trigger: 'onBlur' }],

  // 工程管理事业部项目部餐费补助申请
  p_userId: [{ required: true, message: `申请人${baseMsg}`, trigger: 'onBlur' }],
  p_deptId: [{ required: true, message: `所属部门${baseMsg}`, trigger: 'onBlur' }],
  p_amount: [{ required: true, message: `餐费补助总金额${baseMsg}`, trigger: 'onBlur' }],

  // 生产项目部人员月度需发放各类补助费用申请
  q_userId: [{ required: true, message: `申请人${baseMsg}`, trigger: 'onBlur' }],
  q_deptId: [{ required: true, message: `所属部门${baseMsg}`, trigger: 'onBlur' }],
  q_type: [{ required: true, message: `申请类型${baseMsg}`, trigger: 'onBlur' }],
  q_defectEliminationAmount: [{ required: true, message: `技术消缺总金额${baseMsg}`, trigger: 'onBlur' }],
  q_trafficAmount: [{ required: true, message: `项目交通费${baseMsg}`, trigger: 'onBlur' }],
  q_personnelReuseSubsidyAmount: [{ required: true, message: `人员复用补贴总金额${baseMsg}`, trigger: 'onBlur' }],
  q_totalAmount: [{ required: true, message: `合计金额${baseMsg}`, trigger: 'onBlur' }],

  // 部门/项目部人事主管权限更换审批
  r_deptId: [{ required: true, message: `项目部所属部门${baseMsg}`, trigger: 'onBlur' }],
  r_oldUserId: [{ required: true, message: `原主管权限人员${baseMsg}`, trigger: 'onBlur' }],
  r_newUserId: [{ required: true, message: `现主管权限人员${baseMsg}`, trigger: 'onBlur' }],
  r_effectiveDate: [{ required: true, message: `生效日期${baseMsg}`, trigger: 'onBlur' }],

  // 生产项目部交通费、驻勤补助标准申请
  s_deptId: [{ required: true, message: `项目部${baseMsg}`, trigger: 'onBlur' }],
  s_costCategory: [{ required: true, message: `申请费用类别${baseMsg}`, trigger: 'onBlur' }],
  s_transportationStandards: [{ required: true, message: `拟申请交通工具标准${baseMsg}`, trigger: 'onBlur' }],
  s_transportationFeeAmount: [{ required: true, message: `拟申请交通费金额（元/单趟）${baseMsg}`, trigger: 'onBlur' }],
  s_subsidyStandardDetails: [{ required: true, message: `驻勤补助标准明细${baseMsg}`, trigger: 'onBlur' }],
  s_startDate: [{ required: true, message: `开始时间${baseMsg}`, trigger: 'onBlur' }],
  s_endDate: [{ required: true, message: `结束时间${baseMsg}`, trigger: 'onBlur' }],

  // 解除生产/公司人员劳动合同申请
  t_userId: [{ required: true, message: `被解除劳动合同员工${baseMsg}`, trigger: 'onBlur' }],
  t_isFormal: [{ required: true, message: `是否已转正${baseMsg}`, trigger: 'onBlur' }],

  // 外包员工续用意见征询
  x_deptId: [{ required: true, message: `部门/项目部${baseMsg}`, trigger: 'onBlur' }],
  x_userId: [{ required: true, message: `外包员工${baseMsg}`, trigger: 'onBlur' }],
  x_postIds: [{ required: true, message: `岗位名称${baseMsg}`, trigger: 'onBlur' }],
  x_contractSigningTime: [{ required: true, message: `合同签订时间${baseMsg}`, trigger: 'onBlur' }],
  x_contractEndTime: [{ required: true, message: `合同到期时间${baseMsg}`, trigger: 'onBlur' }],
  x_isRetirementAge: [{ required: true, message: `是否到达退休年龄${baseMsg}`, trigger: 'onBlur' }],

  // 公司人员资格证书注册申请
  y_type: [{ required: true, message: `证书类型${baseMsg}`, trigger: 'onBlur' }],
  y_name: [{ required: true, message: `证书名称${baseMsg}`, trigger: 'onBlur' }],
  y_certificateStatus: [{ required: true, message: `证书状态${baseMsg}`, trigger: 'onBlur' }],
  y_speciality: [{ required: true, message: `专业名称${baseMsg}`, trigger: 'onBlur' }],
  y_no: [{ required: true, message: `编号${baseMsg}`, trigger: 'onBlur' }],
  y_issuanceDate: [{ required: true, message: `发证日期${baseMsg}`, trigger: 'onBlur' }],
  // y_recheckDate: [{ required: true, message: `复审日期${baseMsg}`, trigger: 'onBlur' }],
  y_unit: [{ required: true, message: `工作/申报单位${baseMsg}`, trigger: 'onBlur' }],
  // y_startDate: [{ required: true, message: `开始日期${baseMsg}`, trigger: 'onBlur' }],
  // y_endDate: [{ required: true, message: `结束日期${baseMsg}`, trigger: 'onBlur' }],
  y_certificateLevel: [{ required: true, message: `证书等级${baseMsg}`, trigger: 'onBlur' }],
  y_otherCompanyUseStatus: [{ required: true, message: `证书目前是否正在其他公司使用${baseMsg}`, trigger: 'onBlur' }],
  // y_isTraining: [{ required: true, message: `是否参与培训${baseMsg}`, trigger: 'onBlur' }],

  // 员工考取证书补贴申请
  yy_dailyWorkId: [{ required: true, message: `证书注册申请${baseMsg}`, trigger: 'onBlur' }],
  // yy_type: [{ required: true, message: `证书类型${baseMsg}`, trigger: 'onBlur' }],
  // yy_name: [{ required: true, message: `证书名称${baseMsg}`, trigger: 'onBlur' }],
  // yy_certificateStatus: [{ required: true, message: `证书状态${baseMsg}`, trigger: 'onBlur' }],
  // yy_speciality: [{ required: true, message: `专业名称${baseMsg}`, trigger: 'onBlur' }],
  // yy_no: [{ required: true, message: `编号${baseMsg}`, trigger: 'onBlur' }],
  // yy_issuanceDate: [{ required: true, message: `发证日期${baseMsg}`, trigger: 'onBlur' }],
  // yy_recheckDate: [{ required: true, message: `复审日期${baseMsg}`, trigger: 'onBlur' }],
  // yy_unit: [{ required: true, message: `工作/申报单位${baseMsg}`, trigger: 'onBlur' }],
  // yy_startDate: [{ required: true, message: `开始日期${baseMsg}`, trigger: 'onBlur' }],
  // yy_endDate: [{ required: true, message: `结束日期${baseMsg}`, trigger: 'onBlur' }],
  // yy_isTraining: [{ required: true, message: `是否参与培训${baseMsg}`, trigger: 'onBlur' }],
  // yy_certificateLevel: [{ required: true, message: `证书等级${baseMsg}`, trigger: 'onBlur' }],
  // yy_otherCompanyUseStatus: [{ required: true, message: `证书目前是否正在其他公司使用${baseMsg}`, trigger: 'onBlur' }],
  yy_subsidyStandards: [{ required: true, message: `补贴标准${baseMsg}`, trigger: 'onBlur' }],

  // 新增生产岗位申请
  z_deptId: [{ required: true, message: `申请部门${baseMsg}`, trigger: 'onBlur' }],
  z_postNumber: [{ required: true, message: `新增岗位个数${baseMsg}`, trigger: 'onBlur' }],
  z_postNames: [{ required: true, message: `本次所有新增岗位名称${baseMsg}`, trigger: 'onBlur' }],

  // 外包人员转为咸林公司人员的申请
  aa_deptId: [{ required: true, message: `申请部门${baseMsg}`, trigger: 'onBlur' }],
  aa_userId: [{ required: true, message: `申请人员名单${baseMsg}`, trigger: 'onBlur' }],
  aa_effectiveDate: [{ required: true, message: `变更生效日期${baseMsg}`, trigger: 'onBlur' }],

  // 调薪审批
  bb_userId: [{ required: true, message: `员工${baseMsg}`, trigger: 'onBlur' }],
  bb_effectiveDate: [{ required: true, message: `生效日期${baseMsg}`, trigger: 'onBlur' }],
  bb_changeSalaryAfter: [{ required: true, message: `调薪后基本工资${baseMsg}`, trigger: 'onBlur' }],

  // 为资质人员办理社保增加或减少审批流程
  cc_userId: [{ required: true, message: `申请人${baseMsg}`, trigger: 'onBlur' }],
  cc_deptId: [{ required: true, message: `部门${baseMsg}`, trigger: 'onBlur' }],
  cc_socialSecurityProcessingCategory: [{ required: true, message: `社保办理类别${baseMsg}`, trigger: 'onBlur' }],
  cc_insuranceType: [{ required: true, message: `险种${baseMsg}`, trigger: 'onBlur' }],
  cc_effectiveMonth: [{ required: true, message: `生效月份${baseMsg}`, trigger: 'onBlur' }],

  // 发薪审批
  dd_month: [{ required: true, message: `所发工资月份${baseMsg}`, trigger: 'onBlur' }],
  dd_totalAmount: [{ required: true, message: `总金额${baseMsg}`, trigger: 'onBlur' }],

  // 项目部其他费用申请
  ee_deptId: [{ required: true, message: `项目部${baseMsg}`, trigger: 'onBlur' }],
  ee_salesContractNo: [{ required: true, message: `销售合同编号${baseMsg}`, trigger: 'onBlur' }],
  ee_category: [{ required: true, message: `申请类别${baseMsg}`, trigger: 'onBlur' }],
  ee_subsidyAmountStandard: [{ required: true, message: `申请补助金额标准${baseMsg}`, trigger: 'onBlur' }],
  ee_recipientsNumber: [{ required: true, message: `发放人数${baseMsg}`, trigger: 'onBlur' }],
  ee_subsidyTotalAmountMonth: [{ required: true, message: `申请补助总金额(元/月)${baseMsg}`, trigger: 'onBlur' }],
  ee_subsidyTotalAmountDay: [{ required: true, message: `申请补助总金额(元/天)${baseMsg}`, trigger: 'onBlur' }],
  ee_startingDate: [{ required: true, message: `执行起始日期${baseMsg}`, trigger: 'onBlur' }],
  ee_distributionCycle: [{ required: true, message: `发放周期${baseMsg}`, trigger: 'onBlur' }],
  ee_distributionMethod: [{ required: true, message: `发放方式${baseMsg}`, trigger: 'onBlur' }],

  // 全外包生产人员入职申请表
  ff_deptId: [{ required: true, message: `项目部${baseMsg}`, trigger: 'onBlur' }],
  ff_userId: [{ required: true, message: `员工${baseMsg}`, trigger: 'onBlur' }],
  ff_age: [{ required: true, message: `年龄${baseMsg}`, trigger: 'onBlur' }],
  ff_sex: [{ required: true, message: `性别${baseMsg}`, trigger: 'onBlur' }],
  ff_nation: [{ required: true, message: `民族${baseMsg}`, trigger: 'onBlur' }],
  ff_education: [{ required: true, message: `学历${baseMsg}`, trigger: 'onBlur' }],
  ff_interviewDate: [{ required: true, message: `面试日期${baseMsg}`, trigger: 'onBlur' }],
  ff_certificates: [{ required: true, message: `持证情况${baseMsg}`, trigger: 'onBlur' }],
  ff_employmentMethod: [{ required: true, message: `入职方式${baseMsg}`, trigger: 'onBlur' }],
  ff_employmentPost: [{ required: true, message: `入职岗位${baseMsg}`, trigger: 'onBlur' }],
  ff_employmentNature: [{ required: true, message: `入职性质${baseMsg}`, trigger: 'onBlur' }],
  ff_hopeDate: [{ required: true, message: `预计到岗日期${baseMsg}`, trigger: 'onBlur' }],
  ff_wages: [{ required: true, message: `月工资总额(元/月)${baseMsg}`, trigger: 'onBlur' }],
  ff_otherBenefits: [{ required: true, message: `其他福利${baseMsg}`, trigger: 'onBlur' }],
  ff_isProbation: [{ required: true, message: `是否有试用期${baseMsg}`, trigger: 'onBlur' }],
  ff_probationCycle: [{ required: true, message: `试用期时长(月)${baseMsg}`, trigger: 'onBlur' }],
  ff_probationWagesRate: [{ required: true, message: `试用期薪资发放标准${baseMsg}`, trigger: 'onBlur' }],

  // 招聘需求变更申请
  gg_deptId: [{ required: true, message: `部门/项目部${baseMsg}`, trigger: 'onBlur' }],
  gg_changeType: [{ required: true, message: `变更类型${baseMsg}`, trigger: 'onBlur' }],
  gg_changeDetails: [{ required: true, message: `变更明细${baseMsg}`, trigger: 'onBlur' }],
  gg_additionalBudgetExpenses: [{ required: true, message: `预算费用追加金额${baseMsg}`, trigger: 'onBlur' }],
  gg_recruitmentNo: [{ required: true, message: `招聘编号${baseMsg}`, trigger: 'onBlur' }],
  gg_formType: [{ required: true, message: `招聘需求申请表单类型${baseMsg}`, trigger: 'onBlur' }],
  gg_contractNo: [{ required: true, message: `合同号${baseMsg}`, trigger: 'onBlur' }],
  gg_changeBeforeRecruitNumber: [{ required: true, message: `变更前需求招聘人数${baseMsg}`, trigger: 'onBlur' }],
  gg_changeAfterRecruitNumber: [{ required: true, message: `变更后实际需求招聘人数${baseMsg}`, trigger: 'onBlur' }],
  gg_changeBeforeSalaryRange: [{ required: true, message: `变更前薪资范围${baseMsg}`, trigger: 'onBlur' }],
  gg_changeAfterSalaryRange: [{ required: true, message: `变更前薪资范围${baseMsg}`, trigger: 'onBlur' }],
  gg_fixedNumber: [{ required: true, message: `现项目部定员数${baseMsg}`, trigger: 'onBlur' }],
  gg_changeAfterFixedNumber: [{ required: true, message: `变更后项目部定员数${baseMsg}`, trigger: 'onBlur' }],
  gg_changeAfterNumberPost: [{ required: true, message: `变更后需招聘人数及岗位${baseMsg}`, trigger: 'onBlur' }],
  gg_changeReason: [{ required: true, message: `变更原因${baseMsg}`, trigger: 'onBlur' }],
  gg_effectiveDate: [{ required: true, message: `变更生效日期${baseMsg}`, trigger: 'onBlur' }],
  gg_content: [{ required: true, message: `招聘详细内容${baseMsg}`, trigger: 'onBlur' }],
  // 企企账号申请
  hh_deptId: [{ required: true, message: `所属部门/项目部${baseMsg}`, trigger: 'onBlur' }],
  hh_type: [{ required: true, message: `申请类型${baseMsg}`, trigger: 'onBlur' }],
  hh_userId: [{ required: true, message: `姓名${baseMsg}`, trigger: 'onBlur' }],
  hh_userName: [{ required: true, message: `姓名${baseMsg}`, trigger: 'onBlur' }],
  hh_phone: [
    { required: true, message: `电话(企企登录账号)${baseMsg}`, trigger: 'onBlur' },
    { pattern: /^1[3-9|]\d{9}$/, message: '请输入正确的手机号码', trigger: 'onBlur' },
  ],
  hh_superiorLeaders: [{ required: true, message: `上级主管领导${baseMsg}`, trigger: 'onBlur' }],
  hh_isApprovalAuthority: [{ required: true, message: `是否有审批权${baseMsg}`, trigger: 'onBlur' }],
  hh_applyForAWebsite: [{ required: true, message: `申请站点${baseMsg}`, trigger: 'onBlur' }],

  // 财务资料申请
  ii_applicationMaterials: [{ required: true, message: `申请资料${baseMsg}`, trigger: 'onBlur' }],

  // 开具保函申请
  jj_type: [{ required: true, message: `业务类型${baseMsg}`, trigger: 'onBlur' }],

  // 商务资料申请
  kk_applicationMaterials: [{ required: true, message: `申请资料${baseMsg}`, trigger: 'onBlur' }],

  // 公司往来函件申请
  ll_letterType: [{ required: true, message: `函件类型${baseMsg}`, trigger: 'onBlur' }],
  ll_fileType: [{ required: true, message: `文件类型${baseMsg}`, trigger: 'onBlur' }],

  // 合同结算资料申请
  mm_contractSettlementNature: [{ required: true, message: `合同结算性质${baseMsg}`, trigger: 'onBlur' }],
  mm_contractSettlementcontent: [{ required: true, message: `合同结算资料内容${baseMsg}`, trigger: 'onBlur' }],

  // 预约访客申请
  nn_isReservationKey: [{ required: true, message: `预留会议室钥匙${baseMsg}`, trigger: 'onBlur' }],

  // 撤场项目物资流转申请
  oo_evacuationMaterialPlan: [{ required: true, message: `撤场物资处理方案${baseMsg}`, trigger: 'onBlur' }],

  // 销售合同编号申请
  pp_contractCategory: [{ required: true, message: `合同类别${baseMsg}`, trigger: 'onBlur' }],
  pp_contractNature: [{ required: true, message: `合同性质${baseMsg}`, trigger: 'onBlur' }],
  pp_contractNo: [{ required: true, message: `合同编号${baseMsg}`, trigger: 'onBlur' }],
  pp_customerName: [{ required: true, message: `客户名称${baseMsg}`, trigger: 'onBlur' }],
  pp_projectName: [{ required: true, message: `项目名称${baseMsg}`, trigger: 'onBlur' }],
  pp_projectOwnership: [{ required: true, message: `项目归属${baseMsg}`, trigger: 'onBlur' }],

  // 项目部特殊商业保险购买申请
  qq_deptId: [{ required: true, message: `部门/项目部${baseMsg}`, trigger: 'onBlur' }],
  qq_personnelCategory: [{ required: true, message: `人员类别${baseMsg}`, trigger: 'onBlur' }],
  qq_insuranceExpirationStartDate: [{ required: true, message: `建议保险开始日期${baseMsg}`, trigger: 'onBlur' }],
  qq_insuranceExpirationEndDate: [{ required: true, message: `建议保险截止日期${baseMsg}`, trigger: 'onBlur' }],
  qq_latestPurchaseDate: [{ required: true, message: `保险最晚购买日期${baseMsg}`, trigger: 'onBlur' }],
  qq_purchaseInsuranceReason: [{ required: true, message: `购买保险原因${baseMsg}`, trigger: 'onBlur' }],
  qq_purchaseInsuranceNumber: [{ required: true, message: `购买保险人数${baseMsg}`, trigger: 'onBlur' }],
  qq_purchaseInsuranceCategory: [{ required: true, message: `购买保险类别${baseMsg}`, trigger: 'onBlur' }],
  qq_insuranceLimit: [{ required: true, message: `购买保险额度(万元)${baseMsg}`, trigger: 'onBlur' }],
  qq_isHighVoltageOperation: [{ required: true, message: `是否涉及高压电作业${baseMsg}`, trigger: 'onBlur' }],
  qq_isClimbingHomework: [{ required: true, message: `是否涉及登高作业${baseMsg}`, trigger: 'onBlur' }],
  qq_distanceRange: [{ required: true, message: `登高作业位置到地面的距离范围${baseMsg}`, trigger: 'onBlur' }],
  qq_insurancePeriod: [{ required: true, message: `保险期限${baseMsg}`, trigger: 'onBlur' }],
  qq_purchaseInsuranceSpecialExplain: [{ required: true, message: `保险购买特殊说明${baseMsg}`, trigger: 'onBlur' }],
  qq_isNewHiredPurchaseInsurance: [{ required: true, message: `该项目部新入职人员是否购买此类保险${baseMsg}`, trigger: 'onBlur' }],
  qq_transferInDeptPurchaseInsurance: [{ required: true, message: `调入该项目部是否购买此类保险${baseMsg}`, trigger: 'onBlur' }],
  qq_transferOutDeptNoPurchaseInsurance: [{ required: true, message: `调出该项目部是否购买此类保险${baseMsg}`, trigger: 'onBlur' }],
  qq_isEarlyStagePurchaseInsurance: [{ required: true, message: `该项目部前期是否已购买其他商业类保险${baseMsg}`, trigger: 'onBlur' }],
  qq_isBelong: [{ required: true, message: `人员是否属于该项目部${baseMsg}`, trigger: 'onBlur' }],
  qq_notBelongDeptPurchaseInsuranceSpecialReason: [{ required: true, message: `不属于该项目部人员购买保险原因${baseMsg}`, trigger: 'onBlur' }],
  qq_isOldInsuranceTermination: [{ required: true, message: `原特殊商业保险是否终止${baseMsg}`, trigger: 'onBlur' }],
  qq_isOldInsuranceTerminationReason: [{ required: true, message: `原特殊商业保险终止原因说明${baseMsg}`, trigger: 'onBlur' }],
  qq_isContractPurchaseInsurance: [{ required: true, message: `合同中是否要求购买此类保险${baseMsg}`, trigger: 'onBlur' }],

  // 咸林能源NAS系统账号申请
  rr_deptId: [{ required: true, message: `所在部门${baseMsg}`, trigger: 'onBlur' }],
  rr_userId: [{ required: true, message: `姓名${baseMsg}`, trigger: 'onBlur' }],
  rr_permission: [{ required: true, message: `权限${baseMsg}`, trigger: 'onBlur' }],
}

export { extraInitFormData, extraInitRules }
