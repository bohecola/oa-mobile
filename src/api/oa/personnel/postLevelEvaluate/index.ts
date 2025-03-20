import type { AxiosPromise } from 'axios'
import request from '@/service/request'

import type { PostLevelEvaluateItemForm, PostLevelEvaluateItemQuery, PostLevelEvaluateItemVO } from '@/api/oa/personnel/postLevelEvaluate/types'

/**
 * 查询岗位级别面试评价项列表
 * @param query
 * @returns {*}
 */

export function listPostLevelEvaluate(query?: PostLevelEvaluateItemQuery): AxiosPromise<PostLevelEvaluateItemVO[]> {
  return request({
    url: '/oa/personnel/postLevelEvaluateItem/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询岗位级别面试评价项详细
 * @param id
 */
export function getPostLevelEvaluate(id: string | number): AxiosPromise<PostLevelEvaluateItemVO> {
  return request({
    url: `/oa/personnel/postLevelEvaluateItem/${id}`,
    method: 'get',
  })
}

/**
 * 新增岗位级别面试评价项
 * @param data
 */
export function addPostLevelEvaluate(data: PostLevelEvaluateItemForm) {
  return request({
    url: '/oa/personnel/postLevelEvaluateItem',
    method: 'post',
    data,
  })
}

/**
 * 修改岗位级别面试评价项
 * @param data
 */
export function updatePostLevelEvaluate(data: PostLevelEvaluateItemForm) {
  return request({
    url: '/oa/personnel/postLevelEvaluateItem',
    method: 'put',
    data,
  })
}

/**
 * 删除岗位级别面试评价项
 * @param id
 */
export function delPostLevelEvaluate(ids: string | number | Array<string | number>) {
  return request({
    url: `/oa/personnel/postLevelEvaluateItem/${ids}`,
    method: 'delete',
  })
}
