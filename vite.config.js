import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有标签视为自定义元素
          isCustomElement: (tag) => tag.startsWith('my-')
        }
      },
      // 启用自定义元素模式
      customElement: true
    })
  ],
  build: {
    // 配置库模式打包
    lib: {
      entry: './src/main.js',
      formats: ['es'],
      fileName: 'vue3-web-component'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
