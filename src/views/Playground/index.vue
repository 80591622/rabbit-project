<template>
  <!-- 用来测试各种组件 -->
  <div style="background: #fff">
    <!-- 测试骨架屏结构 -->
    <XtxSkeleton :width="120" :height="50" />
    <XtxSkeleton :width="100" :height="60" bg="red" />
    <!-- 测试轮播图组件 -->
    <XtxSlider :sliders="sliders" :autoPlay="false" />
    <!-- 测试面板组件 -->
    <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
      <template #right>
        <span>查看更多</span>
      </template>
      <template>
        <div>我是主体内容</div>
      </template>
    </home-panel>
    <!-- 测试查看更多小组件 -->
    <XtxMore path="/login"/>
    <!-- 测试导航面包屑 -->
    <XtxBread separator="&nbsp;>&nbsp;">
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <XtxBreadItem>导航</XtxBreadItem>
    </XtxBread>
    <!-- 测试数量增减模块 -->
    <XtxNumbox :max="4" :min="3" :modelValue="num"></XtxNumbox>
    <!-- 测试加入购物车按钮 -->
    <XtxButton type="primary" size="middle">测试按钮</XtxButton>
    <!-- 测试图片选中状态 -->
    <XtxCheckbox>是否有图</XtxCheckBox>
  </div>
</template>
<script>
import { ref } from 'vue'
import HomePanel from '@/views/Home/components/home-panel'
export default {
  components: {
    HomePanel
  },
  setup () {
    const num = ref(1)
    const sliders = ref([
      {
        hrefUrl: '/#/',
        id: '630000201807155635',
        imgUrl:
          'http://zhoushugang.gitee.io/erabbit-client-pc-static/images/b1.jpg'
      },
      {
        hrefUrl: '/#/',
        id: '650000201207058528',
        imgUrl:
          'http://zhoushugang.gitee.io/erabbit-client-pc-static/images/b2.jpg'
      }
    ])
    return {
      sliders,
      num
    }
  }
}
</script>
