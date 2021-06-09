<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑导航 -->
      <XtxBread separator="&nbsp;>&nbsp;">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{breadName}}</XtxBreadItem>
      </XtxBread>
      <!-- 全局轮播图组件 -->
      <XtxSlider :sliders="bannerList" :autoPlay="true" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <a href="javascript:;">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div
        class="ref-goods"
        v-for="item in categoryData.children"
        :key="item.id"
      >
        <div class="head">
          <h3>{{ item.name }}</h3>
          <!-- 右侧查看全部小组件 -->
          <XtxMore to="/" />
        </div>
        <div class="body">
          <goodItem v-for="good in item.goods" :key="good.id" :good="good" />
          <!-- <RouterLink to="/" class="goods-item" v-for="good in item.goods" :key="good.id">
            <img
              :src="good.picture"
              alt=""
            />
            <p class="name ellipsis">{{good.name}}</p>
            <p class="desc ellipsis">{{good.desc}}</p>
            <p class="price">&yen;{{good.price}}</p>
          </RouterLink> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import goodItem from './components/goodItem'
export default {
  name: 'TopCategory',
  components: {
    goodItem
  },
  setup () {
    // 轮播图数据
    const bannerList = ref([])
    async function loadBannerList () {
      const res = await findBanner()
      // console.log(res)
      bannerList.value = res.result
    }
    onMounted(() => {
      loadBannerList()
    })
    // 获取分类列表数据
    const categoryData = ref({})
    const breadName = ref({})
    const route = useRoute() // this.$route
    async function loadCategoryData (id = route.params.id) {
      const res = await findTopCategory(id)
      // console.log(res)
      categoryData.value = res.result
      breadName.value = res.result.name
    }
    onMounted(() => {
      loadCategoryData()
    })
    onBeforeRouteUpdate(to => {
      // to: 目标路由对象,拿到最新路由参数
      // console.log(to)
      loadCategoryData(to.params.id)
    })
    return {
      bannerList,
      categoryData,
      loadCategoryData,
      breadName
    }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }
}
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
