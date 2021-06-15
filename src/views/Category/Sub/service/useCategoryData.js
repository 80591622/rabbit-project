// 这里我们包含功能1所有的代码
import { onMounted, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
// 数据获取实现
export function useCategoryData () {
  // 模板的渲染是有俩次
  // 1. 第一次数据接口请求还未回来的时候 先进行一次模板渲染 以声明的响应式数据的默认值读取
  // 2. 第二个渲染是数据请求回来之后 修改了响应式数据
  const subCategoryData = ref(null)
  const route = useRoute()
  async function loadSubData () {
    const res = await findSubCategoryFilter(route.params.id)
    subCategoryData.value = res.result
    initData(subCategoryData)
  }
  // 处理额外的全部分类
  function initData (data) {
    // 兼容ref或者非ref
    data = unref(data)
    data.brands.unshift({
      name: '全部',
      id: null
    })
    data.saleProperties.forEach((item) => {
      item.properties.unshift({
        name: '全部',
        id: null
      })
      // 给每一个规格添加一个专门用来控制是否激活的字段 selected true 激活 false 不激活
      item.properties.forEach(item => {
        item.selected = false
      })
    })
  }
  onMounted(() => {
    loadSubData()
  })

  return {
    subCategoryData
  }
}
