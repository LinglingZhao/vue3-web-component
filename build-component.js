#!/usr/bin/env node
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// 解析当前文件路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 获取命令行参数中的组件名称
const componentName = process.argv[2]

if (!componentName) {
  console.error('请提供组件名称，例如: node build-component.js HelloWorld')
  process.exit(1)
}

// 检查组件目录是否存在
const componentPath = path.resolve(__dirname, `src/components/${componentName}`)

try {
  // 检查组件目录是否存在
  fs.accessSync(componentPath, fs.constants.F_OK)

  // 设置环境变量并执行构建命令
  console.log(`开始打包组件: ${componentName}`)
  process.env.COMPONENT_NAME = componentName

  // 执行构建命令
  execSync('npm run build:component -- --config vite.config.component.js', {
    stdio: 'inherit',
    env: { ...process.env, COMPONENT_NAME: componentName }
  })

  console.log(`组件 ${componentName} 打包完成，输出目录: dist/components/${componentName}`)
} catch (error) {
  console.error(`组件 ${componentName} 不存在或打包失败:`, error.message)
  process.exit(1)
}