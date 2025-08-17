import { defineCustomElement } from 'vue'
import HelloWorld from './HelloWorld.vue'

// 将组件定义为自定义元素
const HelloWorldElement = defineCustomElement(HelloWorld)

// 注册自定义元素
customElements.define('hello-world', HelloWorldElement)

// 导出自定义元素
 export default HelloWorldElement