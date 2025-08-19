# Vue3 Web Component 项目

## 项目介绍
本项目基于Vue3和Vite，用于开发可独立打包的web component组件，供Vue2项目或其他框架使用。

## 项目结构
```
vue3-web-component/
├── agent/
│   └── schedule/         # 执行计划文件
├── src/
│   ├── components/       # 组件目录
│   │   └── 组件名/
│   │       ├── 组件名.vue
│   │       └── index.js  # 组件导出文件
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── vite.config.js        # 主配置文件
├── vite.config.component.js  # 组件打包配置
├── build-component.js    # 组件打包脚本
└── package.json
```

## 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 创建新组件
1. 在`src/components`目录下创建新组件文件夹，例如`MyComponent`
2. 在该文件夹中创建`MyComponent.vue`和`index.js`文件
3. 在`index.js`中导出组件为自定义元素
   ```javascript
   import { defineCustomElement } from 'vue'
   import MyComponent from './MyComponent.vue'

   const MyComponentElement = defineCustomElement(MyComponent)

   customElements.define('my-component', MyComponentElement)

   export default MyComponentElement
   ```

### 打包组件
```bash
node build-component.js 组件名
```
例如：
```bash
node build-component.js HelloWorld
```
打包后的组件将位于`dist/components/组件名`目录下。

## 使用说明

### 在Vue2项目中使用
1. 在Vue2项目中安装`@vue/web-component-wrapper`
   ```bash
   npm install @vue/web-component-wrapper --save
   ```

2. 引入打包后的组件
   ```javascript
   import Vue from 'vue'
   import wrap from '@vue/web-component-wrapper'
   import './path/to/your-component.js'

   const YourComponent = wrap(Vue, customElements.get('your-component'))

   new Vue({
     components: {
       YourComponent
     }
   }).$mount('#app')
   ```

3. 在模板中使用
   ```vue
   <your-component></your-component>
   ```

### 在其他框架中使用
直接在HTML中引入打包后的JS文件，然后使用自定义元素标签：
```html
<script src="./path/to/your-component.js"></script>
<your-component></your-component>
```

## 注意事项
1. 组件名称必须使用连字符格式（kebab-case）
2. 确保组件的props和events在Vue2项目中正确映射
3. 对于复杂组件，可能需要额外的配置和测试

Github Token: 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