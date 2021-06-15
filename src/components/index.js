// vue2.x  Vue.component('组件名称', 组件对象)
// vue3.x  createApp() -> app -> app.component('组件名称', 组件对象)

// 定义全局插件
// 骨架屏
import Skeleton from './Skeleton'
// 轮播图
import Slider from './Slider'
// 首页主体查看更多
import More from './More'
// 面包屑全局注册
import Bread from './Bread/index'
import BreadItem from './Bread/Item'
// 加载更多组件
import InfiniteLoad from './InfiniteLoad'
// 城市组件
import City from './City'
// 商品详情数量增加模块
import Nubmer from './Nubmer'
// 商品详情页加入购物车按钮
import Button from './Button'
// 商品详情页是否有图选择框
import CheckBox from './CheckBox'

export default {
  install (app) {
    // app: createApp 方法执行完得到实例对象
    // console.log('当前实例对象:', app)
    // 使用 app.component 方法进行全局组件注册
    // 以组件对象的 name 属性作为全局组件的名称,以自身对象作为第二个参数
    app.component(Skeleton.name, Skeleton)
    app.component(Slider.name, Slider)
    app.component(More.name, More)
    app.component(Bread.name, Bread)
    app.component(BreadItem.name, BreadItem)
    app.component(InfiniteLoad.name, InfiniteLoad)
    app.component(City.name, City)
    app.component(Nubmer.name, Nubmer)
    app.component(Button.name, Button)
    app.component(CheckBox.name, CheckBox)
  }
}
