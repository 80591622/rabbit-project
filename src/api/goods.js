import request from '@/utils/request'
/**
 * @description: 获取详情数据
 * @param {*} id
 * @return {*}
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
