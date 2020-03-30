import request from '@/utils/request'

export function getGridJson(query) {
  return request({
    url: '/Role',
    method: 'get',
    params: query
  })
}

export function getAllRole() {
  return request({
    url: '/Role/all',
    method: 'get' 
  })
}

export function getFormJson(keyValue) {
  return request({
    url: `/Role/${keyValue}`,
    method: 'get', 
  })
}
 

export function submitForm(data) {
  return request({
    url: '/Role',
    method: 'post',
    data
  })
}

export function updateForm(keyValue, data) {
  return request({
    url: `/Role/${keyValue}`,
    method: 'post',
    data
  })
}


export function deleteForm(keyValue) {
  return request({
    url: `/Role/${keyValue}`,
    method: 'delete'
  })
}

