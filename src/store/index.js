import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
// 导入持久化插件 查看 mataion 数据的改变
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  },
  // 持久化插件配置项
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    }),
    createLogger()
  ]
})
