<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner/>
        <!-- 新鲜好物 -->
        <HomeNew/>
        <!-- 人气推荐 -->
        <HomeHot/>
        <!-- 产品区块组件 -->
        <HomeProduct/>
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-categroy'
import HomeBanner from './components/home-banner'
// 新鲜好物
import HomeNew from './components/home-new'
// 人气推荐
import HomeHot from './components/home-hot'
// 产品区块组件
import HomeProduct from './components/home-product'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeProduct }
}
</script>

<style scoped lang='less'>
  @import '~@/styles/variables.less';
  .xtx-home-page{
    color: @xtxColor;
  }
</style>
