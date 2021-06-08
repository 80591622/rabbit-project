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

/**
 * @description: 获取banner图
 * @param {*}
 * @return {*}
 */
export const findBanner = () => {
  return request('home/banner', 'get')
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNew = () => {
  return request('home/new', 'get')
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const findHot = () => {
  return request('home/hot', 'get')
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const findGoods = () => {
  return request('home/goods', 'get')
}
