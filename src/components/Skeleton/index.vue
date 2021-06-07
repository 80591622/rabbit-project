<template>
  <!-- 决定骨架屏宽高 -->
  <div
    class="xtx-skeleton shan"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <!-- 1 盒子 决定骨架屏背景色-->
    <div class="block" :style="{ backgroundColor: bg}"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>
<script>
export default {
  name: 'XtxSkeleton',
  // 定义为props，由用户自定义传入定制效果
  props: {
    // 宽度（width）
    width: {
      type: Number,
      default: 100
    },
    // 高度（height）
    height: {
      type: Number,
      default: 60
    },
    // 背景色（backgroundColor）
    bg: {
      type: String,
      default: '#ccc'
    }
  }
}
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
