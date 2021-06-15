<template>
  <div class="goods-detail" v-if="goods && goods.details">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goods.details.properties" :key="item.value">
        <span class="dt">{{item.name}}</span>
        <span class="dd">{{item.value}}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for="item in goods.details.pictures" :key="item" :src="item" alt="">
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsDetail',
  setup () {
    const goods = ref(null)
    const route = useRoute()
    async function loadGoods () {
      const res = await findGoods(route.params.id)
      goods.value = res.result
    }
    onMounted(() => {
      loadGoods()
    })
    return {
      goods
    }
  }
}
</script>
<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
