<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑区域 -->
      <XtxBread separator="&nbsp;>&nbsp;">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${subCategoryData.parentId}`">
          {{ subCategoryData.parentName }}
        </XtxBreadItem>
        <XtxBreadItem>{{ subCategoryData.name }}</XtxBreadItem>
      </XtxBread>
            <!-- 筛选区域 -->
      <div class="sub-filter">
        <!-- 品牌 -->
        <div class="item">
          <div class="head">品牌：</div>
          <div class="body">
            <a
              href="javascript:;"
              v-for="brand in subCategoryData.brands"
              :key="brand.id"
              >{{ brand.name }}</a
            >
          </div>
        </div>
        <!-- 规格 -->
        <div
          class="item"
          v-for="item in subCategoryData.saleProperties"
          :key="item.id"
        >
          <div class="head">{{ item.name }}：</div>
          <div class="body">
            <a
              href="javascript:;"
              v-for="i in item.properties"
              :key="i.id"
              @click="toggleSelected(i, item)"
              :class="{ active: i.selected === true }"
              >{{ i.name }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findSubCategoryFilter } from '@/api/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  setup () {
    const subCategoryData = ref({})
    const route = useRoute()
    async function loadSubCategoryData () {
      const res = await findSubCategoryFilter(route.params.id)
      subCategoryData.value = res.result

      // 品牌  subCategoryData.value.brands  没有'全部'分类  我们自己添加一个全部分类
      // 在品牌list中的头上添加一个全部分类  unshift
      subCategoryData.value.brands.unshift({
        name: '全部',
        id: null
      })
      subCategoryData.value.saleProperties.forEach(item => {
        item.properties.unshift({
          name: '全部',
          id: null
        })
      })
    }
    function toggleSelected (i, item) {
      // 排它思想  先把其他项设置为false 把自己设置为true
      item.properties.forEach(item => {
        item.selected = false
      })
      // 把自己设置为true
      i.selected = true
    }
    onMounted(() => {
      loadSubCategoryData()
    })
    return {
      subCategoryData,
      loadSubCategoryData,
      toggleSelected
    }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
 // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      padding: 10px 0;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
