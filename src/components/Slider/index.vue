<template>
  <div class="box" style="height:500px">
    <div class="xtx-slider">
      <!-- 图片列表 -->
      <!-- 定义鼠标进入和离开事件,鼠标进入暂停轮播,鼠标离开开始轮播 -->
      <ul class="slider-body" @mouseenter="clearTimer" @mouseleave="startTimer">
        <!--
          fade: 当fade类名存在 当前图片就显示 不存在就不显示
         -->
        <li
          class="slider-item"
          v-for="(item, i) in sliders"
          :key="i"
          :class="{ fade: curIndex === i }"
        >
          <img :src="item.imgUrl" alt="" />
        </li>
      </ul>
      <!-- 圆圈切换按钮 -->
      <div class="slider-indicator">
        <span class="active"
          v-for="(item,index) in sliders"
          :key="index"
          @click="curIndex = index"></span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 目标：点击圆圈按钮 实现对应图片的切换
 * 思路：
 *   1. 图片和圆圈按钮数量是一样的 下标值是对应的
 *   2. 记录一下当前点击的是哪一项
 *   3. 需要根据记录下来的下标值 去配合:class 控制fade这个类名是否应该显示
 */
import { ref, onMounted } from 'vue'
export default {
  name: 'XtxSlider',
  props: {
    // 父组件轮播图数据
    sliders: {
      type: Array,
      // 工厂函数方式返回默认值
      default: () => {
        return []
      }
    },
    // 父组件传递过来的轮播图转台
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const curIndex = ref(0)
    // 声明一个存放定时器的数据
    const timer = ref(null)
    // 鼠标离开清楚定时器
    function clearTimer () {
      clearInterval(timer.value)
    }
    // 鼠标进入开启轮播图定时器
    function startTimer () {
      initLoop()
    }
    // 封装轮播图定时器
    function initLoop () {
      // 判断父组件值如果为空则不执行轮播图轮播
      if (!props.autoPlay) {
        return false
      }
      // console.log(props.sliders)
      timer.value = window.setInterval(() => {
        // 圆圈按钮每切换一次 ++1 轮播下张图片
        curIndex.value++
        // 如果圆圈按钮的索引大于图片的数量就把圆圈索引重置为0
        // 重新开始轮播
        if (curIndex.value > props.sliders.length - 1) {
          curIndex.value = 0
        }
      }, 2000)
    }
    onMounted(() => {
      initLoop()
    })
    return {
      curIndex,
      initLoop,
      clearTimer,
      startTimer
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-slider {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .slider {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .slider-btn {
      opacity: 1;
    }
  }
}
</style>
