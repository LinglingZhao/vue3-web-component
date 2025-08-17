import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取命令行参数中的组件名称
const componentName = process.env.COMPONENT_NAME || 'HelloWorld'

// 解析当前文件路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 添加process.env的定义，解决浏览器环境中process未定义的问题
const defineOptions = {
  'process.env.COMPONENT_NAME': JSON.stringify(componentName),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
}

export default defineConfig({
  define: defineOptions,
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('my-')
        }
      },
      customElement: true
    })
  ],
  build: {
    lib: {
      // 入口文件为指定组件的index.js
      entry: path.resolve(__dirname, `src/components/${componentName}/index.js`),
      formats: ['es'],
      // 文件名使用组件名称
      fileName: `${componentName}.vue3.wc`
    },
    // 输出目录设置为dist/components/组件名
    outDir: path.resolve(__dirname, `dist/components/${componentName}`),
    rollupOptions: {
    //   external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})