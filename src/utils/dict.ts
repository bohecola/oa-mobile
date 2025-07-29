import { getDicts, getDictsNoAuth } from '@/api/system/dict/data'
import { useDictStore } from '@/store/dict'

/**
 * 获取字典数据
 */
export function useDict(...args: string[]): { [key: string]: DictDataOption[] } {
  const res = ref<{
    [key: string]: DictDataOption[]
  }>({})
  return (() => {
    args.forEach(async (dictType) => {
      res.value[dictType] = []
      const dicts = useDictStore().getDict(dictType)
      if (dicts) {
        res.value[dictType] = dicts
      }
      else {
        await getDicts(dictType).then((resp: any) => {
          res.value[dictType] = resp.data.map(
            (p: any): DictDataOption => ({
              label: p.dictLabel,
              value: p.dictValue,
              elTagType: p.listClass,
              elTagClass: p.cssClass,
              remark: p.remark,
            }),
          )
          useDictStore().setDict(dictType, res.value[dictType])
        })
      }
    })
    return res.value
  })()
}

/**
 * 获取字典数据（不鉴权）
 */
export function useDictNoAuth(...args: string[]): { [key: string]: DictDataOption[] } {
  const res = ref<{
    [key: string]: DictDataOption[]
  }>({})
  return (() => {
    args.forEach(async (dictType) => {
      res.value[dictType] = []
      const dicts = useDictStore().getDict(dictType)
      if (dicts) {
        res.value[dictType] = dicts
      }
      else {
        await getDictsNoAuth(dictType).then((resp: any) => {
          res.value[dictType] = resp.data.map(
            (p: any): DictDataOption => ({
              label: p.dictLabel,
              value: p.dictValue,
              elTagType: p.listClass,
              elTagClass: p.cssClass,
              remark: p.remark,
            }),
          )
          useDictStore().setDict(dictType, res.value[dictType])
        })
      }
    })
    return res.value
  })()
}
