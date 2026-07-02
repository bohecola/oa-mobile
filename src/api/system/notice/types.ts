export interface NoticeMobileQuery extends PageQuery {
  tags?: string
  noticeTitle?: string
  noticeContent?: string
  [key: string]: any
}

export interface NoticeMobileVO {
  createDept?: string | number
  createBy?: string | number
  createTime?: string
  updateBy?: string | number
  updateTime?: string
  id?: string | number
  noticeId?: string | number
  title?: string
  noticeTitle?: string
  content?: string
  noticeContent?: string
  publisher?: string
  createByName?: string
  publishTime?: string
  tag?: string
  tags?: string
  noticeType?: string
  noticeTypeName?: string
  issueDept?: string | number
  issueDeptName?: string
  allMembers?: string
  userIdList?: Array<string | number>
  noticeUserIdList?: Array<string | number>
  ossIdList?: string | Array<string | number>
  readCount?: number
  readNum?: number
  unreadCount?: number
  attachments?: NoticeAttachment[]
  avatar?: string
  more?: boolean
  [key: string]: any
}

export interface NoticeAttachment {
  name?: string
  fileName?: string
  originalName?: string
  size?: string
  url?: string
  ossId?: string
  previewHtml?: string
  [key: string]: any
}

export interface NoticeUserVO {
  userId?: string | number
  userName?: string
  nickName?: string
  avatar?: string
  [key: string]: any
}

export interface NoticeUserQuery extends PageQuery {
  [key: string]: any
}
