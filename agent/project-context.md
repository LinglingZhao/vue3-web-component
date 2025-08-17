# Vue3 Web Component 项目上下文文档

## 项目概述
本项目基于Vue3和Vite，用于开发可独立打包的Web Component组件，供Vue2项目或其他框架使用。通过将Vue3组件打包为标准Web Component，实现了跨框架、跨平台的组件复用。

## 技术栈
- **核心框架**: Vue 3.5.18
- **构建工具**: Vite 7.1.2
- **插件**: @vitejs/plugin-vue 6.0.1
- **打包格式**: ES模块

## 项目结构
```
vue3-web-component/
├── agent/
│   ├── histroy/         # 项目进度记录
│   ├── schedule/        # 执行计划文件
│   └── project-context.md  # 项目上下文文档
├── src/
│   ├── components/      # 组件目录
│   │   └── 组件名/
│   │       ├── 组件名.vue
│   │       └── index.js  # 组件导出文件
│   ├── App.vue          # 主应用组件
│   ├── main.js          # 应用入口文件
│   └── style.css        # 全局样式
├── dist/                # 构建输出目录
│   ├── components/      # 打包后的组件
│   └── ...
├── test/                # 测试目录
│   ├── index.html       # 测试页面
│   └── 组件名.vue3.wc.js  # 测试用组件
├── vite.config.js       # 主配置文件
├── vite.config.component.js  # 组件打包配置
├── build-component.js   # 组件打包脚本
└── package.json         # 项目依赖
```

## 核心功能
### 1. 组件打包机制
- 使用`vite.config.component.js`配置文件进行组件打包
- 通过`build-component.js`脚本可指定要打包的组件
- 打包后的组件位于`dist/components/组件名`目录下
- 组件以ES模块格式输出，文件名为`组件名.vue3.wc.js`

### 2. Web Component 实现方式
- 使用Vue3的`defineCustomElement`API将Vue组件转换为Web Component
- 在组件的`index.js`文件中注册自定义元素
- 支持props、events和slots等Vue组件特性
- 样式被内联到组件中，确保样式隔离

### 3. 组件使用方法
#### 在HTML中直接使用
```html
<script type="module" src="./path/to/组件名.vue3.wc.js"></script>
<组件名 msg="Hello World"></组件名>
```

#### 在Vue2项目中使用
```javascript
import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import './path/to/组件名.vue3.wc.js'

const WrappedComponent = wrap(Vue, customElements.get('组件名'))

export default {
  components: {
    WrappedComponent
  }
}
```

## 构建流程
1. 开发组件: 在`src/components`目录下创建组件
2. 测试组件: 在`test/index.html`中引入并测试
3. 打包组件: 运行`node build-component.js 组件名`
4. 部署组件: 将打包后的文件复制到目标项目中使用

## 注意事项
1. 组件名称必须使用连字符格式（kebab-case）
2. 确保组件的props和events在不同框架中正确映射
3. 对于复杂组件，可能需要额外的配置和测试
4. 组件打包默认不包含Vue运行时，需要在使用环境中提供Vue
5. 测试时需使用支持ES模块的现代浏览器

## 已知问题
1. 组件的某些高级特性（如provide/inject）在跨框架使用时可能受限
2. 样式隔离可能在某些复杂场景下存在问题
3. 大型组件的加载性能有待优化

## 扩展建议
1. 添加组件测试用例
2. 实现组件版本控制
3. 开发更多示例组件和使用场景
4. 优化打包体积和加载性能
5. 提供更丰富的文档和API参考