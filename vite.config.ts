import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  const { VITE_PUBLIC_PATH } = env

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: `${pathResolve('src')}/`,
        },
      ],
    },

    server: {
      host: true,
      open: true,
    },
  }
})
