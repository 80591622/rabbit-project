<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        @click="activeFlag = 'detail'"
        :class="{ active: activeFlag === 'detail' }"
        >商品详情</a
      >
      <a
        href="javascript:;"
        @click="activeFlag = 'comment'"
        :class="{ active: activeFlag === 'comment' }"
        >商品评价</a
      >
    </nav>
     <!-- 这个位置显示对应的组件 GoodsDetail 或者 GoodsComment -->
    <!-- <GoodDetail v-if="activeFlag === 'detail'" />
    <GoodComment v-if="activeFlag === 'comment'" /> -->
    <keep-alive>
      <component :is="compoentsTypes[activeFlag]" />
    </keep-alive>
  </div>
</template>
<script>
import { ref } from 'vue'
import GoodDetail from './good-detail.vue'
import GoodComment from './good-comment.vue'
export default {
  name: 'GoodsTabs',
  setup () {
    // 通过枚举定义一个组件标识和组件对象的对应关系
    // 在这里我们可以非常清晰的看到当前我们需要通过component内置组件切换的所有子组件
    const compoentsTypes = {
      detail: GoodDetail,
      comment: GoodComment
    }
    // 实现tab激活交互  维护一个响应式数据 通过点击不同的tab来切换这个属性
    // 然后再通过动态class 控制active类名显示
    // 详情 -> detail   评论 -> comment
    const activeFlag = ref('detail')
    return {
      activeFlag,
      compoentsTypes
    }
  }
}
</script>
<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
