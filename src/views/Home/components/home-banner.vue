
<template>
<!--   轮播图 -->
  <div class="home-banner">
    <!-- 轮播图插件 -->
    <XtxSlider :sliders="bannerList"/>
  </div>
</template>

<script>
// 轮播图接口
import { findBanner } from '@/api/home'
import { onMounted, ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    // 定义响应式数据存储轮播图数据
    const bannerList = ref([])
    async function loadBannerList () {
      // 参数修改
      // ajax
      const res = await findBanner()
      bannerList.value = res.result
    }
    onMounted(() => {
      // 调用函数
      loadBannerList()
    })
    return {
      bannerList
    }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
