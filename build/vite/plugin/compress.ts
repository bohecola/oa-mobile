import type { PluginOption } from 'vite'
import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin() {
  const plugins: PluginOption[] = [
    compressPlugin({
      // verbose: true,
      // filter: (file) => true, // RegExp or (file: string) => boolean
      // disable: false,
      // threshold: 1025,
      // algorithm: 'gzip',
      // ext: '.gz',
      // compressionOptions: {},
      // deleteOriginFile: false,
    }),
  ]

  return plugins
}
