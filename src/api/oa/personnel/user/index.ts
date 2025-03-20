import type { AxiosPromise } from 'axios'
import type { UserInfoForm } from './types'
import request from '@/service/request'

/**
 * 10月15将oa的员工管理列表接口更换
 */
export function oaUserList(query?: any) {
  return request({
    url: '/system/user/oaUserList',
    method: 'get',
    params: query,
  })
}

/**
 * 查询当前部门的所有用户信息
 * @param userId
 */
export function getUserMessageAll(userId: string | number) {
  return request({
    url: `/oa/personnel/userInfo/getUserMessageAll/${userId}`,
    method: 'get',
  })
}

/**
 * 查询userInfo的用户详情
 * @param userId
 */
export function getUserInfo(userId: string | number) {
  return request({
    url: `/oa/personnel/userInfo/getUserInfo/${userId}`,
    method: 'get',
  })
}

/**
 * 员工管理--修改用户--调用两个接口1.系统管理中用户管理修改用户接口和（用户userId，状态oaStatus）接口
 */
export function updateUserOaStatus(userId: string | number, status: string) {
  return request({
    url: `/oa/personnel/userInfo/updateUserInfoStatus/${userId}/${status}`,
    method: 'put',
  })
}

/**
 * 新增userInfo
 * @param userId
 */
export function addUserInfo(data: UserInfoForm) {
  return request({
    url: `/oa/personnel/userInfo`,
    method: 'post',
    data,
  })
}
/**
 * 修改userInfo
 * @param userId
 */
export function updateUserInfo(data: UserInfoForm) {
  return request({
    url: `/oa/personnel/userInfo`,
    method: 'put',
    data,
  })
}
