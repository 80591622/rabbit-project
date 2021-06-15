<template>
  <div class="xtx-goods-page" v-if="goodData.categories">
    <!--
      当我们访问某个默认值为null或者undefined的属性的时候会报错
      通过v-if手动控制模板渲染时机, 只有当属性是存在或者有值的时候才正式渲染模板(正式读取属性)
     -->
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goodData.categories[1].id}`">{{
          goodData.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="`/subCategory/${goodData.categories[0].id}`">{{
          goodData.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goodData.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 图片预览区 -->
        <div class="media">
          <GoodImage :image-list="goodData.mainPictures" />
          <!-- 统计数量的组件sales -->
          <GoodSales :good="goodData" />
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <GoodName :good="goodData" />
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { findGoods } from '@/api/goods'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodImage from './components/good-image.vue'
import GoodSales from './components/good-sales.vue'
import GoodName from './components/good-name.vue'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodImage,
    GoodSales,
    GoodName
  },
  setup () {
    // 获取商品信息
    const route = useRoute()
    const goodData = ref({})
    async function loadGoodData () {
      const res = await findGoods(route.params.id)
      console.log(res)
      goodData.value = res.result
    }
    onMounted(() => {
      loadGoodData()
    })
    return {
      goodData
    }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
