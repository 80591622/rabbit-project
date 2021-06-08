// 定义图片懒加载指令
//  引进默认图片,在图片加载失败时使用
import defaaultImg from '@/assets/images/200.png'
// 组件懒加载
import { useIntersectionObserver } from '@vueuse/core'
export default {
  // app => main.js中的createApp产出的app实例对象
  install (app) {
    // console.log('当前实例对象:', app)
    // app实例中有全局注册指令方法
    app.directive('imgLazy', {
      mounted (el, binding) {
        // el:img  dom对象
        // binding.value  图片url的地址
        // 使用vueuse/core提供的监听api对图片进行dom监听 正式进入视口才加载
        // img.src = url
        // console.log(el, binding)
        const { stop } = useIntersectionObserver(
          // 监听目标元素
          el,
          ([{ isIntersecting }], observerElement) => {
            // isIntersecting
            // 可以使用isIntersecting变量的是否为true来控制ajax请求是否要发起
            // console.log(isIntersecting)
            if (isIntersecting) {
              // 当图片 url 无效加载失败的时候使用默认图片替代
              el.onerror = function () {
                el.src = defaaultImg
              }
              // 在这里把url交给src属性
              el.src = binding.value
              // 第一次请求成功发起之后立刻停止监听
              stop()
            }
          },
          // 进入可视区域的比例是多少才执行回调 0-1 值越大 代表需要进入的面积越大
          { threshold: 0 }
        )
      }
    })
  }
}
