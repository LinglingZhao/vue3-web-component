import { defineCustomElement } from 'vue'
import './style.css'
import App from './App.vue'

// 将App组件定义为自定义元素
const MyWebComponent = defineCustomElement(App)

// 注册自定义元素
customElements.define('my-web-component', MyWebComponent)

// 导出自定义元素，以便其他地方可以使用
export default MyWebComponent
