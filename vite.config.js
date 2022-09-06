import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import eslintPlugin from 'vite-plugin-eslint'
const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  base:'/manage-system/',
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  plugins: [
    Vue(),
    AutoImport({
      // 自动导入 vue,vue-router,pinia 相关函数
      imports: ['vue', 'pinia', 'vue-router'],

      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),

    Components({
      dirs: ['src/components', 'src/store'],
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],

      dts: path.resolve(pathSrc, 'components.d.ts')
    }),

    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),

    Inspect(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ]
})
