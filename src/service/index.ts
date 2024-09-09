import * as comm from '@/api/comm'
import * as open from '@/api/open'

// system
import * as user from '@/api/system/user'
import * as role from '@/api/system/role'
import * as dept from '@/api/system/dept'
import * as post from '@/api/system/post'

// workflow
import * as processInstance from '@/api/workflow/processInstance'

const service = {
  comm,
  open,
  system: {
    user,
    role,
    dept,
    post,
  },
  workflow: {
    processInstance,
  },
}

export { service }

// const modules = import.meta.glob(['@/api/**/*.ts', '!**/types.ts'], { eager: true })

// const services: Record<string, any> = {}

// for (const key in modules) {
//   // 命名路径
//   const namePaths = key.replace('/src/api/', '').replace('/index.ts', '').split('/')

//   // 构建 services 对象
//   namePaths.reduce((prev, currNamePath, index) => {
//     if (index === namePaths.length - 1) {
//       prev[currNamePath] = modules[key]
//     }
//     else {
//       prev[currNamePath] = {}
//     }
//     return prev[currNamePath]
//   }, services)
// }

// export {
//   services,
// }
