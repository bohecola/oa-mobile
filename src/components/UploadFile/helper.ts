export const imageTypeEnum = ['png', 'jpg', 'jpeg']
export const videoTypeEnum = ['avi', 'mp4']
export const wordTypeEnum = ['doc', 'docx']
export const excelTypeEnum = ['xls', 'xlsx']
export const pptTypeEnum = ['ppt', 'pptx']
export const pdfTypeEnum = ['pdf']
export const txtTypeEnum = ['txt']
export const otherTypeEnum = ['dwg', 'apk']

export const docTypeEnum = [...wordTypeEnum, ...excelTypeEnum, ...pptTypeEnum, ...pdfTypeEnum]

export const fileTypeEnum = [...imageTypeEnum, ...videoTypeEnum, ...docTypeEnum, ...txtTypeEnum, ...otherTypeEnum]

export const isImageType = (val: string) => imageTypeEnum.includes(val)
export const isVideoType = (val: string) => videoTypeEnum.includes(val)
export const isDocType = (val: string) => docTypeEnum.includes(val)
export const isPdfType = (val: string) => pdfTypeEnum.includes(val)
