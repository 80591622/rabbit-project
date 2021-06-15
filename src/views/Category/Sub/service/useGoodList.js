// 商品列表
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
export function useGoodList () {
  const route = useRoute()
  // 排序字段
  const sortType = ref('publishTime')
  // 请求参数
  const reqData = reactive({
    page: 1,
    pageSize: 20,
    categoryId: route.params.id,
    sortField: null, // 排序类别
    attrs: [], // 商品属性
    brandId: null // 品牌名称
  })
  // 商品列表数组
  const goodList = ref([])
  async function loadGoodList () {
    const res = await findSubCategoryGoods(reqData)
    goodList.value = res.result.items
    // 当第一天请求OK之后 把isLoading重新设置为false 正式开启加载下一页的逻辑
    isLoading.value = false
  }
  onMounted(() => {
    loadGoodList()
  })

  // 更改排序 获取数据
  function changeSortType (type) {
    sortType.value = type
    // 1.把传下来的sortType 赋值 reqData中的sortField字段
    reqData.sortField = type
    // 2.修改完毕之后重新调用loadGoodList方法 获取最新的数据
    loadGoodList()
  }

  // 更改品牌
  function changeBrand (brand) {
    reqData.brandId = brand.id
    loadGoodList()
  }

  // 更改规格
  function toggleSelected (i, item) {
    // 排它思想 先把其它项都设置为false 把自己设置为true
    item.properties.forEach(item => {
      item.selected = false
    })
    // 自己设置为true
    i.selected = true
    // 思路：正式添加之前先检测一下当前要添加的项是否已经在attrs中存在一个同类的项
    // 如果已经存在 就先把同类项删除 再把自己添加进来
    // 如果传下来的是‘全部’ 规格 把当前所属的大项删除
    // attr:[{ groupName:'颜色'} ]
    const index = reqData.attrs.findIndex(attr => attr.groupName === item.name)
    if (index > -1) {
      reqData.attrs.splice(index, 1)
    }
    reqData.attrs.push({
      groupName: item.name,
      propertyName: i.name
    })

    // 点击全部 进行当前大项的删除
    if (i.id === null) {
      const index = reqData.attrs.findIndex(attr => attr.groupName === item.name)
      if (index > -1) {
        reqData.attrs.splice(index, 1)
      }
    }
    loadGoodList()
  }

  // 加载下一页逻辑
  const isLoading = ref(true) // 是否在加载中
  const isFinished = ref(false) // 是否加载完
  async function loadNext () {
    console.log('开始加载下一页数据')
    // 使用下一页参数获取下一页数据
    // 目标：加载下一页数据
    // 0. isLoading 设置为true  告诉我的组件当前已经在加载中 不要重复触发load事件
    // 1. reqData.page++
    // 2. 使用最新的page字段数据获取下一页数据 发送网络请求
    // 3. 下一页数据返回之后 需要把新数据拼接到老数据的后面
    // 4. 重新把isLoading设置为false 告诉我的组件本次数据已经处理完毕 可以再次开启监听了
    // 5. 判断返回数据长度是否为零 如果为零 isFinished设置为true
    isLoading.value = true
    reqData.page++
    const res = await findSubCategoryGoods(reqData)
    // 判断是否全部加载完毕
    if (res.result.items.length === 0) {
      isFinished.value = true
    }
    goodList.value = [...goodList.value, ...res.result.items]
    isLoading.value = false
    // 经过分析我们发现现在加载下一页数据所依赖的响应式数据和方法多数都在useGoodList模块下
    // 如果我们想使用 必须在useGoodList模板中导出 然后在当前的模板中导入
    // 方案: 把加载下一页数据的逻辑 也放到useGoodList中不就没有这些麻烦了
  }

  return {
    goodList,
    changeSortType,
    changeBrand,
    toggleSelected,
    sortType,
    reqData,
    loadNext,
    isLoading,
    isFinished
  }
}
