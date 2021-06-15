<template>
  <div class="xtx-city">
    <!-- 可点击区域 点击展开城市列表 再点击关闭城市列表 -->
    <div class="select" @click="toggleActive">
      <span class="placeholder" v-if="changeResult.provinceName === ''"
        >请选择配送地址</span
      >
      <span class="value" v-else>
        {{ changeResult.provinceName }}-{{ changeResult.cityName }}-{{
          changeResult.countyName
        }}
      </span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <!-- 城市列表显示(省市区) -->
    <div class="option" v-if="activeFlag">
      <span
        class="ellipsis"
        v-for="i in chinaData"
        :key="i.code"
        @click="optionClick(i)"
        >{{ i.name }}</span
      >
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue'
import axios from 'axios'
export default {
  name: 'XtxCity',
  emits: ['change'],
  setup (props, ctx) {
    /**
     * 点击交互实现: 如果当前是显示的 点击就隐藏  如果当前是隐藏的 点击就显示
     */
    const activeFlag = ref(false)
    function toggleActive () {
      // 切换逻辑 取反操作
      activeFlag.value = !activeFlag.value
    }

    // 获取城市数据
    const chinaData = ref([])
    let cacheData = [] // 缓存的数据列表
    function loadCityData () {
      axios({
        url: 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json',
        method: 'GET'
      }).then(res => {
        chinaData.value = res.data
        // 为了将来把省列表重新交给chinaData 要求把省列表数据提前缓存一份
        cacheData = res.data
      })
    }
    onMounted(() => {
      loadCityData()
    })

    // 点击交互
    // 1. 每一个单项中都有一个名称为areaList的字段存放着当前下面的子级列表数据
    // 2. 每一个单项中都有一个名称为level字段 代表当前是省->0  市->1 区->2

    // 区域点击交互
    // 核心逻辑：
    // 点击某个省 数据列表立刻变成当前省下面的市列表
    // 点击某个市 数据列表立刻变成了当前式下面的区列表
    // 点击某个区 展示数据列表弹框立刻关闭 然后把选择的所有数据展示出来

    // 思路: 负责当前区域的模板渲染的数据是 chinaData 点击的时候如果想要修改这块区域的显示
    // 必定要把chinaData变成一个全新的list 这个全新的list其实就是点击这一项数据下面的areaList

    const changeResult = reactive({
      provinceCode: '', // 省code
      provinceName: '', // 省名称
      cityCode: '', // 城市code
      cityName: '', // 城市名称
      countyCode: '', // 地区code
      countyName: '' // 地区名
    })

    function optionClick (cur) {
      chinaData.value = cur.areaList
      // 把当前传下来的数据赋值到changeResult数据里
      if (cur.level === 0) {
        changeResult.provinceCode = cur.code
        changeResult.provinceName = cur.name
      }
      if (cur.level === 1) {
        changeResult.cityCode = cur.code
        changeResult.cityName = cur.name
      }
      // 当前点击的区
      if (cur.level === 2) {
        changeResult.countyCode = cur.code
        changeResult.countyName = cur.name
        toggleActive()
      }
      // 把当前选择的数据通过自定义事件抛出去
      ctx.emit('change', changeResult)
    }

    // 每次重新打开的时候 需要重头开始
    // 1. activeFlag -> true   2. 以最初的数据（省列表）重新交给chinaData
    watch(() => {
      return activeFlag.value
    }, (newValue) => {
      if (newValue === true) {
        for (const key in changeResult) {
          changeResult[key] = ''
        }
        chinaData.value = cacheData
      }
    })
    return {
      activeFlag,
      toggleActive,
      chinaData,
      optionClick,
      changeResult
    }
  }
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  margin-left: 10px;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
