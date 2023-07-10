import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    // rollupOptions: {
    //   output: {
    //     manualChunks(id)
    //     {
    //       if (id.includes('node_modules'))
    //       {
    //         return id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString()
    //       }
    //     }
    //   }
    // }
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    '__GITHUB_SHA__': process.env.GITHUB_SHA
  }
})
