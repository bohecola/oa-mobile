import type { AxiosPromise } from 'axios'
import type { GetPaperIdParams, InterviewOrganizeUserForm, InterviewOrganizeUserQuery, InterviewOrganizeUserVO } from '@/api/exam/interviewOrganizeUser/types'
import request from '@/service/request'

/**
 * 微信公众号考试-获取试卷id
 */
export function getPaperId(params: GetPaperIdParams): AxiosPromise<InterviewOrganizeUserVO[]> {
  return request({
    url: '/exam/interviewOrganizeUser/ignore/getPaperId',
    method: 'get',
    params,
  })
}

/**
 * 查询面试组织用户列表
 * @param query
 */
export function listInterviewOrganizeUser(query?: Partial<InterviewOrganizeUserQuery>): AxiosPromise<InterviewOrganizeUserVO[]> {
  return request({
    url: '/exam/interviewOrganizeUser/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询面试组织用户详细
 * @param id
 */
export function getInterviewOrganizeUser(id: string | number): AxiosPromise<InterviewOrganizeUserVO> {
  return request({
    url: `/exam/interviewOrganizeUser/${id}`,
    method: 'get',
  })
}

/**
 * 新增面试组织用户
 * @param data
 */
export function addInterviewOrganizeUser(data: InterviewOrganizeUserForm) {
  return request({
    url: '/exam/interviewOrganizeUser',
    method: 'post',
    data,
  })
}

/**
 * 修改面试组织用户
 * @param data
 */
export function updateInterviewOrganizeUser(data: InterviewOrganizeUserForm) {
  return request({
    url: '/exam/interviewOrganizeUser',
    method: 'put',
    data,
  })
}

/**
 * 删除面试组织用户
 * @param id
 */
export function delInterviewOrganizeUser(id: string | number | Array<string | number>) {
  return request({
    url: `/exam/interviewOrganizeUser/${id}`,
    method: 'delete',
  })
}
