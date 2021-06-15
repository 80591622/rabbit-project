import request from '@/utils/request'

/**
 * @description: 获取分类数据
 * @param {*} id 分类id
 * @return {*}
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * @description: 获取筛选数据
 * @param {*} id 路由id
 * @return {*}
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * @description: 获取筛选数据
 * @param {*} params
 * @return {*}
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods', 'post', params)
}
