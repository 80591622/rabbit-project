<template>
  <div class="app-header-sticky" :class="{show:y >= 78}">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <HeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 思路分析：
 *   1. 只要控制类名show存在 吸顶组件就会以过渡效果展示出来
 *   2. 监听页面的滚动事件 scroll 在事件回调函数里 判断当前是否应该添加show类名 满足条件就添加 不满足就移除
 *   3. 动态class可以用来控制一个类名的有无 :class="{show: 布尔值true/false}"
 *   4. 滚动的距离 大于78px 布尔值就为true 小于78px 布尔值就是false
 */
import HeaderNav from './header-nav'
// 导入页面滚动逻辑复用函数
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  components: { HeaderNav },
  setup () {
    // y表示具体顶部的滚动距离 会动态更新
    const { y } = useWindowScroll()
    /**
     * 小坑写法：bug原因 - setup函数只执行一次 判断逻辑也只会执行一次
      const showFlag = ref(false)
      if (y.value > 78) {
        showFlag.value = true
      } else {
        showFlag.value = false
      }
     */

    /*
      正确写法: 使用watch监听y
      watch(() => {
       return y.value
     }, () => {
       if (y.value > 78) {
         showFlag.value = true
       } else {
         showFlag.value = false
       }
     })
    */
    return {
      y
    }
  }
  // data () {
  //   return {
  //     showFlag: false
  //   }
  // },
  // mounted () {
  //   // 监听页面的滚动事件
  //   window.addEventListener('scroll', () => {
  //     // 监听滚动距离 大于78 showFlag = true  小于78 showFlag = false
  //     const scrollTop = document.documentElement.scrollTop
  //     if (scrollTop > 78) {
  //       this.showFlag = true
  //     } else {
  //       this.showFlag = false
  //     }
  //   })
  // }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 默认情况下完全把自己移动到上面
  transform: translateY(-100%);
  // 完全透明
  opacity: 0;
  // 显示出来的类名
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url("~@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
