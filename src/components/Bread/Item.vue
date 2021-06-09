<template>
  <div class="xtx-bread-item">
    <!-- 如果父组件传值to则显示router-link标签
    如果父组件没有传值to则渲染span标签 -->
    <router-link v-if="to" :to="to"><slot /></router-link>
    <span v-else><slot /></span>
    <i>{{ separator }}</i>
    <!-- <i class="iconfont icon-angle-right"></i> -->
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: String
    }
  },
  setup (props) {
    const separator = inject('separator')
    return {
      separator
    }
  }
}
</script>
<style lang="less" scoped>
  .xtx-bread-item{
    // 最后一个i隐藏
    &:nth-last-of-type(1){
      i{
        display: none;
      }
    }
  }
</style>
