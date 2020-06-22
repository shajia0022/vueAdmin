import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'vue/admin/server.php?active=login',
    method: 'post',
    data
  })
}