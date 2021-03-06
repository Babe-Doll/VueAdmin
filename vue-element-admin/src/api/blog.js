import request from '@/utils/request'

export function getGridJson(query) {
  return request({
    url: '/Blog',
    method: 'get',
    params: query
  })
}

export function getFormJson(keyValue) {
  return request({
    url: `/Blog/${keyValue}`,
    method: 'get',
  })
}


export function submitForm(data) {
  return request({
    url: '/Blog',
    method: 'post',
    data
  })
}

export function updateForm(keyValue, data) {
  return request({
    url: '/Blog',
    method: 'post',
    data,
    params: { keyValue }
  })
}

export function deleteForm(keyValue) {
  return request({
    url: `/Blog/${keyValue}`,
    method: 'delete'
  })
}

export function updateVisible(data) {
  return request({
    url: '/Blog',
    method: 'put',
    data
  })
}

