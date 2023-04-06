import Request from '@/utils/request'
import { API_STATISTICS_NEWS_DIMENSION, API_STATISTICS_NEWS_PAGE, API_STATISTICS_NEWS_DETAIL } from '@/constants/api'

// 查询指定时间图文发布量、点赞数量、收藏数量、转发数量
export function getNewsDimensionStatistics (params) {
  return Request({
    url: API_STATISTICS_NEWS_DIMENSION,
    method: 'get',
    params: params
  })
}

// 查询指定时间文章分页列表
export function getNewsPageStatistics (params) {
  return Request({
    url: API_STATISTICS_NEWS_PAGE,
    method: 'get',
    params: params
  })
}

// 查询指定时间文章数据详情
export function getNewsDetailStatistics (params) {
  return Request({
    url: API_STATISTICS_NEWS_DETAIL,
    method: 'get',
    params: params
  })
}
