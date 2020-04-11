import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Login/Token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/User/Info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}


export function getGridJson(query) {
  return request({
    url: '/User',
    method: 'get',
    params: query
  })
}

export function getFormJson(keyValue) {
  return request({
    url: `/User/${keyValue}`,
    method: 'get',
  })
}


export function submitForm(data) {
  return request({
    url: '/User',
    method: 'post',
    data
  })
}

export function updateForm(keyValue, data) {
  return request({
    url: '/User',
    method: 'post',
    data,
    params: { keyValue }
  })
}


export function deleteForm(keyValue) {
  return request({
    url: `/User/${keyValue}`,
    method: 'delete'
  })
}
