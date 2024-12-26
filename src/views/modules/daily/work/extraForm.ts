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

  // 项目部劳务人员工资审批
  i_userId: undefined,
  i_deptIds: undefined,
  i_month: undefined,
  i_amount: undefined,

  // 辽宁华能业主人员代发工资及五险一金费用审批
  j_userId: undefined,
  j_deptIds: undefined,
  j_month: undefined,
  j_amount: undefined,
  j_scAmount: undefined,

  // 项目部聘用外包人员申请
  k_deptId: undefined,
  k_userType: undefined,

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
  y_status: undefined,
  y_speciality: undefined,
  y_no: undefined,
  y_issuanceDate: undefined,
  y_recheckDate: undefined,
  y_unit: undefined,
  y_startDate: undefined,
  y_endDate: undefined,
  y_isTraining: undefined,

  // 新增生产岗位申请
  z_deptId: undefined,

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

  // 全外包生产人员入职申请表
  ff_deptId: undefined,

  // 招聘需求变更申请
  gg_deptId: undefined,
}

const baseMsg = '不能为空'

const extraInitRules: Record<string, FieldRule[]> = {
  // 项目考核奖励确认单
  a_contractId: [{ required: true, message: `合同名称${baseMsg}`, trigger: 'onBlur' }],
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

  // 项目部劳务人员工资审批
  i_userId: [{ required: true, message: `提交人${baseMsg}`, trigger: 'onBlur' }],
  i_deptIds: [{ required: true, message: `项目部名称${baseMsg}`, trigger: 'onBlur' }],
  i_month: [{ required: true, message: `所发工资月份${baseMsg}`, trigger: 'onBlur' }],
  i_amount: [{ required: true, message: `所发工资总金额${baseMsg}`, trigger: 'onBlur' }],

  // 辽宁华能业主人员代发工资及五险一金费用审批
  j_userId: [{ required: true, message: `提交人${baseMsg}`, trigger: 'onBlur' }],
  j_deptIds: [{ required: true, message: `项目部名称${baseMsg}`, trigger: 'onBlur' }],
  j_month: [{ required: true, message: `所发工资月份${baseMsg}`, trigger: 'onBlur' }],
  j_amount: [{ required: true, message: `应发工资总额${baseMsg}`, trigger: 'onBlur' }],
  j_scAmount: [{ required: true, message: `单位社保总额${baseMsg}`, trigger: 'onBlur' }],

  // 项目部聘用外包人员申请
  k_deptId: [{ required: true, message: `申请部门${baseMsg}`, trigger: 'onBlur' }],
  k_userType: [{ required: true, message: `人员类别${baseMsg}`, trigger: 'onBlur' }],

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
  y_status: [{ required: true, message: `证书状态${baseMsg}`, trigger: 'onBlur' }],
  y_speciality: [{ required: true, message: `专业名称${baseMsg}`, trigger: 'onBlur' }],
  y_no: [{ required: true, message: `编号${baseMsg}`, trigger: 'onBlur' }],
  y_issuanceDate: [{ required: true, message: `发证日期${baseMsg}`, trigger: 'onBlur' }],
  y_recheckDate: [{ required: true, message: `复审日期${baseMsg}`, trigger: 'onBlur' }],
  y_unit: [{ required: true, message: `工作/申报单位${baseMsg}`, trigger: 'onBlur' }],
  y_startDate: [{ required: true, message: `开始日期${baseMsg}`, trigger: 'onBlur' }],
  y_endDate: [{ required: true, message: `结束日期${baseMsg}`, trigger: 'onBlur' }],
  // y_isTraining: [{ required: true, message: `是否参与培训${baseMsg}`, trigger: 'onBlur' }],

  // 新增生产岗位申请
  z_deptId: [{ required: true, message: `申请部门${baseMsg}`, trigger: 'onBlur' }],

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

  // 全外包生产人员入职申请表
  ff_deptId: [{ required: true, message: `项目部${baseMsg}`, trigger: 'onBlur' }],

  // 招聘需求变更申请
  gg_deptId: [{ required: true, message: `部门/项目部${baseMsg}`, trigger: 'onBlur' }],
}

export { extraInitFormData, extraInitRules }
