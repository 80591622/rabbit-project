// 用户状态
const user = {
  // 解决不同模块的命名冲突问题
  namespaced: true,
  // 数据
  state: () => ({
    id: '',
    nickname: '',
    avatar: '',
    token: '',
    mobile: ''
  }),
  //  state 数据管理
  mutations: {
    setUser (state, payload) {
      state.id = 10001
    }
  },
  // 异步请求
  actions: {
  },
  // 计算模块
  getters: {}
}
export default user
