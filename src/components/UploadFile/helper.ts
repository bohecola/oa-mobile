import type { UploaderFileListItem as _UploaderFileListItem } from 'vant'

export type UploaderFileListItem = _UploaderFileListItem & {
  name?: string
  url?: string
  ossId?: string
}

export const wordTypeEnum = ['doc', 'docx'] as const
export const excelTypeEnum = ['xls', 'xlsx'] as const
export const pptTypeEnum = ['ppt', 'pptx'] as const
export const pdfTypeEnum = ['pdf'] as const
export const imageTypeEnum = ['png', 'jpg', 'jpeg'] as const
export const videoTypeEnum = ['avi', 'mp4'] as const
export const txtTypeEnum = ['txt'] as const
export const compressedTypeEnum = ['zip', 'rar', 'jar', 'tar', 'gzip', '7z'] as const
export const otherTypeEnum = ['dwg', 'apk'] as const

export const docTypeEnum = [...wordTypeEnum, ...excelTypeEnum, ...pptTypeEnum, ...pdfTypeEnum] as const
export const allTypeEnum = [...imageTypeEnum, ...videoTypeEnum, ...docTypeEnum, ...txtTypeEnum, ...compressedTypeEnum, ...otherTypeEnum] as const

export const isImageType = (val: any) => imageTypeEnum.includes(val)
export const isVideoType = (val: any) => videoTypeEnum.includes(val)
export const isDocType = (val: any) => docTypeEnum.includes(val)
export const isPdfType = (val: any) => pdfTypeEnum.includes(val)
export const isTxtType = (val: any) => txtTypeEnum.includes(val)
export const isCompressedType = (val: any) => compressedTypeEnum.includes(val)
export const isOtherType = (val: any) => otherTypeEnum.includes(val)

export type FileType = typeof allTypeEnum

export interface FileActionEnum {
  extensions: FileType[number][]
  icon?: string
  handler?: (item: UploaderFileListItem) => void
}
