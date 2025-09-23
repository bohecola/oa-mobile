import type { App } from 'vue'
import { hasPermi, hasRoles } from './permission'
import loadingDirective from './loading'

export function setupDirective(app: App) {
  app.directive('loading', loadingDirective)
  app.directive('hasPermi', hasPermi)
  app.directive('hasRoles', hasRoles)
}
