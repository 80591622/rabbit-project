import axios from 'axios'
import store from '@/store'
import router from '@/router'

/**
 * 针对 axios 封装
 * 引入axios
 * 1. 创建一个基于axios的实例对象 axios.create()
 *    1.1 baseURL  接口及地址
 *    1.2 timeout  接口的最大等待时间 5-10s 如果超时直接干掉
 *    1.3 大数处理  (处理数据超过js能表达的最大范围 + JSON.parse)
 *
 * 2. 请求拦截器
 *    全局注入token request headers
 *
 * 3. 响应拦截器
 *    1. token失效 401  http状态  调回登录页重新获取token数据
 *    2. 自定义错误处理  当后端接口不以http状态码作为接口调用成功的标识 是200-300 以一个自定义扥字段为主 success: true flase
 *    3. 我们可以根据自定义字段的判断  手动 return Promise.reject(e)  就可以捕捉错误
 */
// baseURL设置/超时时间设置
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000
})

// 全局注入token
instance.interceptors.request.use(config => {
  // 1. 获取token
  const { token } = store.state.user
  // 2. 请求头设置token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, e => Promise.reject(e))

// token失效跳回到登录页
instance.interceptors.response.use(res => res.data, e => {
  if (e.response && e.response.status === 401) {
    // 1. 最新版本的路由获取完整路径需要加上额外的value - `router.currentRoute.value.fullPath`
    // 2. 为避免url参数出现错误，我们使用`encodeURIComponent`方法进行编码
    const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + redirectUrl)
  }
  return Promise.reject(e)
})

/**
 * @param {String} - url  请求地址
 * @param {String} - method  请求类型
 * @param {Object} - submitData  对象类型，提交数据
 */
const request = (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
