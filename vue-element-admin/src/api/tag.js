import request from '@/utils/request'

export function getGridJson(query) {
  return request({
    url: '/Tag',
    method: 'get',
    params: query
  })
}

export function getAllTag() {
  return request({
    url: '/Tag/all',
    method: 'get' 
  })
}

export function getFormJson(keyValue) {
  return request({
    url: `/Tag/${keyValue}`,
    method: 'get',
  })
}


export function submitTagForm(data) {
  return request({
    url: '/Tag',
    method: 'post',
    data
  })
}

export function updateForm(keyValue, data) {
  return request({
    url: '/Tag',
    method: 'post',
    data,
    params: { keyValue }
  })
}

export function deleteForm(keyValue) {
  return request({
    url: `/Tag/${keyValue}`,
    method: 'delete'
  })
}

export function getTagListByBlogID(keyValue) {
  return request({
    url: '/Tag/getTagListByBlogID',
    method: 'get',
    keyValue: keyValue
  })
}
export function GetTagsNoBindByBlogID(keyValue) {
  return request({
    url: '/Tag/GetTagsNoBindByBlogID',
    method: 'get',
    params: keyValue
  })
}
export function submitBlogTagBind(data) {
  return request({
    url: '/Tag/submitBlogTagBind',
    method: 'post',
    data
  })
}

export function deleteBlogTagBind(keyValue) {
  return request({
    url: '/Tag/deleteBlogTagBind',
    method: 'delete',
    params: keyValue
  })
}

export function createTagAndBindBlog(data) {
  return request({
    url: '/Tag/CreateTagAndBindBlog',
    method: 'post',
    data
  })
}
