import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入重置样式的包
import 'normalize.css'
// 导入全局公共样式
import '@/styles/common.less'
// 注册为全局插件
import componentPlugin from '@/components'
// createApp 可执行方法用来创建一个 vue 实例对象
// 当我们使用use方法注册插件的时候 app实例对象会被当做一个实参传入到
// 定义插件的install方法中去
createApp(App).use(store).use(router).use(componentPlugin).mount('#app')

// store.commit('user/setUser')
