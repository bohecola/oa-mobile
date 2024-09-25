import type { UploaderFileListItem } from 'vant'

export const imageTypeEnum = ['png', 'jpg', 'jpeg'] as const
export const videoTypeEnum = ['avi', 'mp4'] as const
export const wordTypeEnum = ['doc', 'docx'] as const
export const excelTypeEnum = ['xls', 'xlsx'] as const
export const pptTypeEnum = ['ppt', 'pptx'] as const
export const pdfTypeEnum = ['pdf'] as const
export const txtTypeEnum = ['txt'] as const
export const otherTypeEnum = ['dwg', 'apk'] as const

export const docTypeEnum = [...wordTypeEnum, ...excelTypeEnum, ...pptTypeEnum, ...pdfTypeEnum]

export const fileTypeEnum = [...imageTypeEnum, ...videoTypeEnum, ...docTypeEnum, ...txtTypeEnum, ...otherTypeEnum] as const

export const isImageType = (val: any) => imageTypeEnum.includes(val)
export const isVideoType = (val: any) => videoTypeEnum.includes(val)
export const isDocType = (val: any) => docTypeEnum.includes(val)
export const isPdfType = (val: any) => pdfTypeEnum.includes(val)

export type FileType = typeof fileTypeEnum

export interface FileActionEnum {
  extensions: FileType[number][]
  icon?: string
  handler?: (item: UploaderFileListItem) => void
}
