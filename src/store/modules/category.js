
import { findHeadCategory } from '@/api/home'
// 用户状态
const category = {
  // 解决不同模块的命名冲突问题
  namespaced: true,
  // 数据
  state: () => ({
    list: []
  }),
  //  唯一能改变state的数据
  mutations: {
    setCategory (state, categoryList) {
      state.list = categoryList
    }
  },
  // 异步请求
  actions: {
    async asyncSetList (ctx, payload) {
      // 1. 发送ajax请求
      const res = await findHeadCategory()
      // 2. 数据成功返回之后 把数据通过调用mutation函数的形式修改state中的list
      ctx.commit('setCategory', res.result)
    }
  }
}

export default category
