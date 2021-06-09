<template>
  <div class='xtx-bread'>
    <!-- 面包屑导航文字需要定制,所以使用插槽 -->
    <slot/>
  </div>
</template>

<script>
// 分隔符数据是在Bread中,分隔符数据是在底层组件中使用
// provide/inject
import { provide } from 'vue'
export default {
  name: 'XtxBread',
  props: {
    separator: {
      type: String,
      default: '>'
    }
  },
  setup (props) {
    // 顶层组件向底层组件传值
    provide('separator', props.separator)
  }
}
</script>

<style scoped lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
