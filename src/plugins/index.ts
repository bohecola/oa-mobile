import type { App } from 'vue'
import modal from './modal'
import download from './download'

import { getConfigKey, updateConfigByKey } from '@/api/system/config'
import { useDict, useDictNoAuth } from '@/utils/dict'
import { addDateRange, handleTree, parseTime, selectDictLabel, selectDictLabels } from '@/utils/base'
import { formatCurrencyUtil, toCnMoney } from '@/utils/finance'

export default function installPlugins(app: App) {
  // 模态框对象
  app.config.globalProperties.$modal = modal

  // 下载文件
  app.config.globalProperties.$download = download

  // 全局方法挂载
  app.config.globalProperties.useDict = useDict
  app.config.globalProperties.useDictNoAuth = useDictNoAuth
  app.config.globalProperties.getConfigKey = getConfigKey
  app.config.globalProperties.updateConfigByKey = updateConfigByKey
  app.config.globalProperties.parseTime = parseTime
  app.config.globalProperties.handleTree = handleTree
  app.config.globalProperties.addDateRange = addDateRange
  app.config.globalProperties.selectDictLabel = selectDictLabel
  app.config.globalProperties.selectDictLabels = selectDictLabels
  app.config.globalProperties.formatCurrency = formatCurrencyUtil
  app.config.globalProperties.toCnMoney = toCnMoney
}
