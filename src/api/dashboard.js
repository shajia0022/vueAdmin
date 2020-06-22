import request from '@/utils/request'

export function dashboard_get(data) {
  return request({
    url: 'vue/admin/server.php',
    method: 'get',
    params: data
  })
}

export function dashboard_post(data) {
  return request({
    url: 'vue/admin/server.php',
    method: 'post',
    data
  })
}
