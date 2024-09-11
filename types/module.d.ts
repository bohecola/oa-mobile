import type { useDict } from '@/utils/dict'
import type { addDateRange, handleTree, parseTime, selectDictLabel, selectDictLabels } from '@/utils/base'
import type { getConfigKey, updateConfigByKey } from '@/api/system/config'

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    // 全局方法声明
    $modal: typeof modal

    useDict: typeof useDict
    addDateRange: typeof addDateRange
    handleTree: typeof handleTree
    getConfigKey: typeof getConfigKey
    updateConfigByKey: typeof updateConfigByKey
    selectDictLabel: typeof selectDictLabel
    selectDictLabels: typeof selectDictLabels
    parseTime: typeof parseTime
  }
}
