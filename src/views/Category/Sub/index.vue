<template>
  <div class="sub-category">
    <div class="container" v-if="subCategoryData">
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
              @click="changeBrand(brand)"
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
      <!-- 排序组件 -->
      <div class="list-container">
        <!-- 排序区域 -->
        <!-- publishTime(最新)，orderNum(人气)，price(价格)， evaluateNum(评论) -->
        <div class="sub-sort">
          <div class="sort">
            <a
              href="javascript:;"
              @click="changeSortType('publishTime')"
              :class="{ active: sortType === 'publishTime' }"
              >默认排序</a
            >
            <a
              href="javascript:;"
              @click="changeSortType('orderNum')"
              :class="{ active: sortType === 'orderNum' }"
              >最新商品</a
            >
            <a
              href="javascript:;"
              @click="changeSortType('price')"
              :class="{ active: sortType === 'price' }"
              >最高人气</a
            >
            <a
              href="javascript:;"
              @click="changeSortType('evaluateNum')"
              :class="{ active: sortType === 'evaluateNum' }"
              >评论最多</a
            >
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="sort-list-container">
          <GoodItem v-for="item in goodList" :good="item" :key="item.id" />
        </div>
      </div>
    </div>
    <!--
      加载更多组件
      1. index.vue 和 加载更多  父子关系
      2. 加载下一页的依赖的参数以及接口 都在父组件中  而检测到要加载下一页的动作是在子组件中
         需要我们的子组件 在检测到要加载下一页数据了 通知父组件去以page++ 去拉取最新数据

      是否数据在加载中  这个条件是由谁获取到的？
      由于这个状态是在父组件中得到的  子组件需要用这个状态去判断当前是否继续触发load事件  父传子

      数据是否全部加载完毕  这个条件同样是父组件拿到的  items.length === 0  父传子

    -->
    <InfiniteLoad
      @load="loadNext"
      :isLoading="isLoading"
      :isFinished="isFinished"
    />
  </div>
</template>
<script>
import GoodItem from '../components/goodItem'
import { useCategoryData } from './service/useCategoryData'
import { useGoodList } from './service/useGoodList'
export default {
  name: 'SubCategory',
  components: {
    GoodItem
  },
  setup () {
    const { subCategoryData } = useCategoryData()
    const {
      goodList,
      changeSortType,
      changeBrand,
      toggleSelected,
      sortType,
      loadNext,
      isLoading,
      isFinished
    } = useGoodList()

    return {
      subCategoryData,
      toggleSelected,
      sortType,
      goodList,
      changeSortType,
      changeBrand,
      loadNext,
      isLoading,
      isFinished
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
        transition: all 0.3s;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.list-container {
  margin-top: 20px;
  padding: 0 20px;
  background: #fff;
}
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
.sort-list-container {
  display: flex;
  flex-wrap: wrap;
  .goods-item {
    flex: 1;
  }
}
</style>
