import { getDicts } from '@/api/system/dict/data'
import { useFileListTransform } from '@/hooks'
import { useStore } from '@/store'

interface UseFileMapHelperOptions {
  dictType: string
}

export function useFileMapHelper(options?: UseFileMapHelperOptions) {
  const { dict } = useStore()
  const { dictType } = options ?? {}
  const { fileList, fileDictLoading, file_dict, transformFileMapToList, transformFileListToMap } = useFileListTransform()

  // 拉取文件字典
  async function fetchFileDict(dictType: string) {
    try {
      fileDictLoading.value = true
      const { data } = await getDicts(dictType)
      file_dict.value = data.map(e => ({
        label: e.dictLabel,
        value: e.dictValue,
        elTagType: e.listClass,
        elTagClass: e.cssClass,
        remark: e.remark,
      }))
      dict.setDict(dictType, file_dict.value)
    }
    finally {
      fileDictLoading.value = false
    }
  }

  // 回显文件列表
  async function viewFileList(fileMap: Record<string, string[]>) {
    await fetchFileDict(dictType)
    const map = {}
    // 设置文件 Map
    for (const { value } of file_dict.value) {
      map[value] = []
    }
    Object.assign(map, fileMap)
    // 设置文件列表
    fileList.value = transformFileMapToList(map)
  }

  return {
    fileList,
    fileDictLoading,
    file_dict,
    fetchFileDict,
    viewFileList,
    transformFileMapToList,
    transformFileListToMap,
  }
}
