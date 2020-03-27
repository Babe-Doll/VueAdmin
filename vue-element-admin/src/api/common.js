import request from '@/utils/request'

export function getClientData() {
  return request({
    url: '/ClientData',
    method: 'get' 
  })
}