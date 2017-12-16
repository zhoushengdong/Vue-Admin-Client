import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function addData(params) {
  return request({
    url: '/table/add',
    method: 'post',
    data: params
  })
}
