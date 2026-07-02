import type { AxiosPromise } from 'axios'
import type { NoticeMobileQuery, NoticeMobileVO, NoticeUserQuery, NoticeUserVO } from './types'
import request from '@/service/request'

export function getNoticeMobileList(params?: NoticeMobileQuery): AxiosPromise<NoticeMobileVO[]> {
  return request({
    url: '/system/notice/mobileList',
    method: 'get',
    params,
  })
}

export function getNotice(noticeId: string | number): AxiosPromise<NoticeMobileVO> {
  return request({
    url: `/system/notice/${noticeId}`,
    method: 'get',
  })
}

export function getNoticeUserList(noticeId: string | number, isRead: string | number, params?: NoticeUserQuery): AxiosPromise<NoticeUserVO[]> {
  return request({
    url: `/system/noticeUser/userList/${noticeId}/${isRead}`,
    method: 'get',
    params,
  })
}
