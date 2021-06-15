<template>
  <div class="xtx-infinite-loading" ref="target">
    <!-- 正在加载数据时显示 -->
    <div class="loading" v-if="isLoading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <!-- 数据全部加载完毕时显示 -->
    <div class="none" v-if="isFinished">
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export default {
  name: 'InfiniteLoad',
  emits: ['load'],
  props: {
    // 是否在加载中  true代表在加载中 false 代表不在加载中
    isLoading: {
      type: Boolean,
      default: false
    },
    // 是否加载完毕
    isFinished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const target = ref(null)
    useIntersectionObserver(
      target,
      ([{ isIntersecting }], observerElement) => {
      // isIntersecting
      // 可以使用isIntersecting变量的是否为true来控制ajax请求是否要发起
        console.log('当前加载更多组件进入视口', isIntersecting)
        if (isIntersecting) {
          // 实现加载更多逻辑
          // 通知父组件 可以开始加载下一页数据了
          if (props.isLoading === false && props.isFinished === false) {
            ctx.emit('load')
          }
        }
      },
      {
      // 用来控制目标target进入视口区域的比例
      // 0 - 1  数值越大要求进入到视口区域的面积越大 才会触发回调
      //        数值越小要求进入到视口区域的面积越小 才会触发回调
        threshold: 0.1
      }
    )
    return {
      target
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
