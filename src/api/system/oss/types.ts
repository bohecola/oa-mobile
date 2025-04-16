export interface OssVO extends BaseEntity {
  size: string
  ossId: string
  fileName: string
  originalName: string
  fileSuffix: string
  url: string
  createByName: string
  service: string
  fileDate: string
  fileLng: number
  fileLat: number
  fileAddress: string
}

export interface OssQuery extends PageQuery {
  fileName: string
  originalName: string
  fileSuffix: string
  createTime: string
  service: string
  orderByColumn: string
  isAsc: string
}

export interface OssForm {
  file: undefined | string
}
