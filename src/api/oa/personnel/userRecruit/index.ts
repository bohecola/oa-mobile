import type { AxiosPromise } from 'axios'
import request from '@/service/request'
import type { UserRecruitForm, UserRecruitQuery, UserRecruitVO } from '@/api/oa/personnel/userRecruit/types'

/**
 * 查询招聘申请列表
 * @param query
 * @returns {*}
 */

export function listUserRecruit(query?: UserRecruitQuery): AxiosPromise<UserRecruitVO[]> {
  return request({
    url: '/oa/personnel/userRecruit/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询招聘申请详细
 * @param id
 */
export function getUserRecruit(id: string | number): AxiosPromise<UserRecruitVO> {
  return request({
    url: `/oa/personnel/userRecruit/${id}`,
    method: 'get',
  })
}

/**
 * 新增招聘申请
 * @param data
 */
export function addUserRecruit(data: UserRecruitForm) {
  return request({
    url: '/oa/personnel/userRecruit',
    method: 'post',
    data,
  })
}

/**
 * 修改招聘申请
 * @param data
 */
export function updateUserRecruit(data: UserRecruitForm) {
  return request({
    url: '/oa/personnel/userRecruit',
    method: 'put',
    data,
  })
}

/**
 * 删除招聘申请
 * @param id
 */
export function delUserRecruit(id: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/userRecruit/${id}`,
    method: 'delete',
  })
}

/**
 * 删除招聘岗位
 * @param id
 */
export function delUserRecruitPost(ids: string | number) {
  return request({
    url: `/oa/personnel/userRecruitPost/${ids}`,
    method: 'delete',
  })
}
