import request from '@/utils/request'

export function getGridJson(query) {
  return request({
    url: '/Category',
    method: 'get',
    params: query
  })
}

export function getAllCategory() {
  return request({
    url: '/Category/all',
    method: 'get' 
  })
}

export function getFormJson(keyValue) {
  return request({
    url: `/Category/${keyValue}`,
    method: 'get',
    // params: { keyValue }
  })
}

// export function fetchPv(pv) {
//   return request({
//     url: '/Category/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

export function submitForm(data) {
  return request({
    url: '/Category',
    method: 'post',
    data
  })
}

export function updateForm(keyValue,data) {
  return request({
    url: '/Category',
    method: 'post', 
    data,
    params:  { keyValue }
  })
}


export function deleteForm(keyValue) {
  return request({
    url: `/Category/${keyValue}`,
    method: 'delete' 
  })
}

