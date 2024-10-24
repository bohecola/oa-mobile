import type { App } from 'vue'

import { useDict } from '@/utils/dict'

export default function installPlugins(app: App) {
  app.config.globalProperties.useDict = useDict
}
