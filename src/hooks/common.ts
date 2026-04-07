export interface FileItem {
  dictValue: string
  ossIdList: string[]
}

// 文件 Map => 文件 List
export function transformFileMapToList(fileMap: Record<string, string[]>) {
  return Object.entries(fileMap).map(([dictValue, ossIdList]) => ({ dictValue, ossIdList }))
}

// 文件 List => 文件 Map
export function transformFileListToMap(fileList: FileItem[]) {
  return fileList.reduce(
    (acc, item) => {
      acc[item.dictValue] = item.ossIdList
      return acc
    },
    {} as Record<string, string[]>,
  )
}

// 文件列表转换
export function useFileListTransform() {
  // 文件类型字典
  const file_dict = ref<DictDataOption[]>([])

  // 附件列表
  const fileList = ref<FileItem[]>([])

  const fileDictLoading = ref(false)

  return {
    fileList,
    file_dict,
    fileDictLoading,
    transformFileMapToList,
    transformFileListToMap,
  }
}
