<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in $store.state.category.list" :key="item.id">
      <a href="#">{{item.name}}</a>
      <!-- 放置鼠标移入显示的二级弹框 -->
      <div class="layer">
        <ul>
          <li v-for="i in item.children" :key="i.id">
            <a href="#">
              <img :src="i.picture" alt="">
              <p>{{i.name}}</p>
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'AppHeaderNav'
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      a {
        color: @xtxColor;
        // border-bottom: 1px solid @xtxColor;
      }
    }
    // 初始样式 不显示
    .layer {
      width: 1240px;
      background-color: #fff;
      position: absolute;
      left: -200px;
      top: 56px;
      height: 0;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 124px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
          }
          &:hover {
            p {
              color: @xtxColor;
            }
          }
        }
      }
    }
    // hover之后显示出来
    &:hover {
         // 加上 >
      > a {
        color: @xtxColor;
        // border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        height: 124px;
        opacity: 1;
      }
    }
  }
}
</style>
