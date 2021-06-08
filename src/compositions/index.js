// 抽象可复用逻辑
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export function useObserver (apiFn) {
  // 基础使用 监听视口函数
  const target = ref(null)
  // 调用方法
  // 1. stop 可执行的方法  用来停止对于目标元素的监听
  // 2. target 要监听的一个对象  dom对象 组件实例对象
  // 3. isIntersecting  布尔值 代表当前监听的元素对象是否进入到视口区域 进来就为true 出去就false
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting
      // 可以使用isIntersecting变量的是否为true来控制ajax请求是否要发起
      // console.log(isIntersecting)
      if (isIntersecting) {
        apiFn()
        // 第一次请求成功发起之后立刻停止监听
        stop()
      }
    },
    // 进入可视区域的比例是多少才执行回调 0-1 值越大 代表需要进入的面积越大
    { threshold: 0 }
  )

  return {
    target
  }
}
