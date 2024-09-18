import type { App } from 'vue'
import loadingDirective from './loading'

export function setupDirective(app: App) {
  app.directive('loading', loadingDirective)
}
