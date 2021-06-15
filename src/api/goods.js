import request from '@/utils/request'
/**
 * @description: 获取详情数据
 * @param {*} id
 * @return {*}
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * @description: 获取评价数据
 * @param {*} id  商品id
 * @return {*}
 */
export const findCommentInfoByGoods = (id) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}
