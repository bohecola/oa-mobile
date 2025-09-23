import type { Directive, DirectiveBinding } from 'vue'
import { useStore } from '@/store'

// 操作权限处理
export const hasPermi: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { user } = useStore()
    const { permissions } = user
    // 「其他角色」按钮权限校验
    const { value } = binding

    if (value && Array.isArray(value) && value.length > 0) {
      const hasPermission = permissions.some((permi: string) => {
        return permi === '*:*:*' || value.includes(permi)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
        return false
      }
    }
    else {
      throw new Error('check perms! Like v-has-permi="[\'system:user:add\',\'system:user:edit\']"')
    }
  },
}

// 角色权限处理
export const hasRoles: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const { user } = useStore()
    const { roles } = user

    if (value && Array.isArray(value) && value.length > 0) {
      const hasRole = roles.some((role: string) => {
        return role === 'admin' || value.includes(role)
      })
      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
        return false
      }
    }
    else {
      throw new Error('check roles! Like v-has-roles="[\'admin\',\'test\']"')
    }
  },
}
