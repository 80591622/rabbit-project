import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home/index')
const Play = () => import('@/views/Playground/index')
const Category = () => import('@/views/Category/index')
const SubCategory = () => import('@/views/Category/Sub/index')
const GoodDetail = () => import('@/views/Goods')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: Category },
      { path: '/SubCategory/:id', component: SubCategory },
      { path: '/good/:id', component: GoodDetail }
    ]
  },
  {
    path: '/Play',
    component: Play
  }
]

const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes
})

export default router
