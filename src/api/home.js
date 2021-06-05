// 定义首页需要的接口函数
import request from '@/utils/request'
/**
 * @description: 获取导航数据
 * @param {*}
 * @return {*}
 */
export const findHeadCategory = () => {
  return request('/home/category/head', 'get')
}
