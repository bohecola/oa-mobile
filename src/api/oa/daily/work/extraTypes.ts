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
  RSZPXQBGSQ {}

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
}

// 关于修改现有钉钉人事相关审批流程的申请
export interface RSGYXGXYDDRSXGSPLCDSQ {}

// 项目部劳务人员工资审批
export interface RSXMBLWRYGZSP {
  i_userId?: string
  i_deptIds?: string | number
  i_month?: string
  i_amount?: number
}

// 辽宁华能业主人员代发工资及五险一金费用审批
export interface RSLNHNYZRYDFGZJWXYJFYSP {
  j_userId?: string
  j_deptIds?: string | number
  j_month?: string
  j_amount?: number
  j_scAmount?: number
}

// 项目部聘用外包人员申请
export interface RSXMBPYQWBRYSQ {
  k_deptId?: string
  k_belongDeptIds?: string
  k_userType?: string
  k_isUniform?: string
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
  y_status?: string
  y_speciality?: string
  y_no?: string
  y_issuanceDate?: string
  y_recheckDate?: string
  y_unit?: string
  y_startDate?: string
  y_endDate?: string
  y_isTraining?: string
}

// 员工考取证书补贴申请
export interface RSYGKQZSBTSQ {}

// 员工考取注册建造师证书奖励申请
export interface RSYGKQZCJZSZSJLSQ {}

// 新增生产岗位申请
export interface RSXZSCGWSQ {
  z_deptId?: string | number
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
}
// 全外包生产人员入职申请表
export interface RSQWBSCRYRZSQB {
  ff_deptId?: string
}

// 生产人员招聘工作奖励费用核算审批表
export interface RSSCRYZPGZJLFYHSSPB {}

// 招聘需求变更申请
export interface RSZPXQBGSQ {
  gg_deptId?: string
}
