<template>
  <!-- 产品区块组件 -->
  <div class="home-product">
    <!-- 面板组件 -->
    <HomePanel :title="cate.name" v-for="cate in goodProsuct" :key="cate.id">
      <template #right>
        <div class="sub">
          <RouterLink to="/" v-for="sub in cate.children" :key="sub.id">{{sub.name}}</RouterLink>
        </div>
        <XtxMore />
      </template>

      <template #default>
        <div class="box">
          <RouterLink class="cover" to="/">
            <img
              v-imgLazy="cate.picture"
              alt=""
            />
            <strong class="label">
              <span>{{cate.name}}馆</span>
              <span>{{cate.saleInfo}}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="item in cate.goods" :key="item.id">
              <!-- 商品组件 -->
              <HomeGoods :good="item"/>
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { findGoods } from '@/api/home'
import { ref, onMounted } from 'vue'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup () {
    // 定义响应式数据
    const goodProsuct = ref([])
    // 获取产品数据
    async function getGoods () {
      const { result } = await findGoods()
      console.log(result)
      goodProsuct.value = result
    }
    // mounted 中调用
    onMounted(() => {
      getGoods()
    })

    return {
      goodProsuct
    }
  }
}
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
