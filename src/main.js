import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式的包
import 'normalize.css'
// 导入全局公共样式
import '@/styles/common.less'

// createApp 可执行方法用来创建一个 vue 实例对象
createApp(App).use(store).use(router).mount('#app')

// store.commit('user/setUser')
