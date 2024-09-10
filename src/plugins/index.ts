import type { App } from 'vue'

import { useDict } from '@/utils/dict'
import { getConfigKey, updateConfigByKey } from '@/api/system/config'
import { addDateRange, handleTree, parseTime, selectDictLabel, selectDictLabels } from '@/utils/base'

export default function installPlugins(app: App) {
  // 全局方法挂载
  app.config.globalProperties.useDict = useDict
  app.config.globalProperties.getConfigKey = getConfigKey
  app.config.globalProperties.updateConfigByKey = updateConfigByKey
  app.config.globalProperties.parseTime = parseTime
  app.config.globalProperties.handleTree = handleTree
  app.config.globalProperties.addDateRange = addDateRange
  app.config.globalProperties.selectDictLabel = selectDictLabel
  app.config.globalProperties.selectDictLabels = selectDictLabels
}
