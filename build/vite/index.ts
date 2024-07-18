import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { configHtmlPlugin } from './plugin/html'

export function createVitePlugins(env: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    // 自动导入 Vant 组件
    Components({
      dts: true,
      resolvers: [VantResolver()],
      types: [],
    }),
    // 自动导入 API
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'types/auto-imports.d.ts',
    }),
  ]

  vitePlugins.push(configHtmlPlugin(env, isBuild))

  return vitePlugins
}
