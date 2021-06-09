<template>
  <!-- 顶部通栏 -->
  <TopNav/>
  <!-- 头部组件 -->
  <Header/>
  <!-- 吸顶组件 -->
  <HeaderSticky/>
  <main>
    <!-- 二级路由出口 -->
    <!-- fullPath: path + 参数
    path: 没有参数
    key: 1.提高列表的渲染性能   2.强制更新组件(破坏缓存机制) :key="$route.fullPath"-->
    <router-view ></router-view>
  </main>
  <!-- 底部区域 -->
  <Footer/>
</template>

<script>
import TopNav from './components/topnav'
import Header from './components/header'
import Footer from './components/footer'
import HeaderSticky from './components/header-sticky'
export default {
  name: 'xtx-layout',
  components: {
    TopNav,
    Header,
    Footer,
    HeaderSticky
  }
}
</script>

<style scoped lang='less'></style>
