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
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-categroy'
import HomeBanner from './components/home-banner'
// 新鲜好物
import HomeNew from './components/home-new'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, HomeNew }
}
</script>

<style scoped lang='less'>
  @import '~@/styles/variables.less';
  .xtx-home-page{
    color: @xtxColor;
  }
</style>
