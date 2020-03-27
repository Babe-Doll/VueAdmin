import request from '@/utils/request'

export function getGridJson(query) {
  return request({
    url: '/Tag',
    method: 'get',
    params: query
  })
}

export function getFormJson(keyValue) {
  return request({
    url: `/Tag/${keyValue}`,
    method: 'get',
  })
}


export function submitForm(data) {
  return request({
    url: '/Tag',
    method: 'post',
    data
  })
}

export function updateForm(keyValue, data) {
  return request({
    url: `/Tag/${keyValue}`,
    method: 'post',
    data
  })
}


export function deleteForm(keyValue) {
  return request({
    url: `/Tag/${keyValue}`,
    method: 'delete'
  })
}

