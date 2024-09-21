import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { parseEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { createProxy } from './build/vite/proxy'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig(({ command, mode }) => {
  // 当前工作目录
  const root = process.cwd()

  // 加载解析环境变量
  const env = parseEnv(loadEnv(mode, root))

  const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = env

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: `${pathResolve('src')}/`,
        },
      ],
    },

    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['debugger', 'console'] : [],
    },

    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      minify: 'esbuild',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      cssTarget: 'chrome80',
      // 启用/禁用 gzip 压缩大小报告，压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      reportCompressedSize: true,
      // 触发警告的 chunk 大小（以 kB 为单位）
      chunkSizeWarningLimit: 500,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          // 将 node_modules 三方依赖包最小化拆分
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const paths = id.split('node_modules/')

              if (paths[2]) {
                return paths[2].split('/')[0]
              }

              return paths[1].split('/')[0]
            }
          },
        },
      },
    },

    server: {
      host: true,
      open: false,
      // port: VITE_PORT,
      warmup: {
        // 预热的客户端文件: 首页、views、components
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
      // 开发服务器代理转发
      proxy: createProxy(VITE_PROXY),
    },

    optimizeDeps: {

    },

    plugins: createVitePlugins(env, isBuild),
  }
})
