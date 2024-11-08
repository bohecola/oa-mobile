import type { AxiosPromise } from 'axios'
import type { PostForm, PostVO } from './types'
import request from '@/service/request'

// 查询岗位列表
export function listPost(query?: any): AxiosPromise<PostVO[]> {
  return request({
    url: '/system/post/list',
    method: 'get',
    params: query,
  })
}

// 查询岗位详细
export function getPost(postId: string | number): AxiosPromise<PostVO> {
  return request({
    url: `/system/post/${postId}`,
    method: 'get',
  })
}

// 获取岗位选择框列表
export function optionselect(deptId?: number | string, postIds?: (number | string)[]): AxiosPromise<PostVO[]> {
  return request({
    url: '/system/post/optionselect',
    method: 'get',
    params: {
      postIds,
      deptId,
    },
  })
}

// 新增岗位
export function addPost(data: PostForm) {
  return request({
    url: '/system/post',
    method: 'post',
    data,
  })
}

// 修改岗位
export function updatePost(data: PostForm) {
  return request({
    url: '/system/post',
    method: 'put',
    data,
  })
}

// 删除岗位
export function delPost(postId: string | number | (string | number)[]) {
  return request({
    url: `/system/post/${postId}`,
    method: 'delete',
  })
}
