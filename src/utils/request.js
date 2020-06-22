import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import {Message} from 'element-ui'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API, // 使用环境变量
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 10000 // 请求超时
})

// 设置post默认请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发出请求前做点什么
    // 判断是否有Token
    
    var Token = sessionStorage.getItem('Token');
    config.headers['Token'] = Token;
    // if(store.getters.Token){
    //   service.headers.Token = store.getters.Token;
    // }

    // post请求需要qs转化
    if (config.method == 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    // 处理请求错误
    console.log('错误', error);
    return Promise.reject(error);
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 如果您想获取诸如头或状态之类的http信息
  // 请返回response => response

  // 通过自定义代码确定请求状态
  response => {
    const res = response.data;
    // 如果自定义代码不是200，则判断为错误
    // 201 - 用户名或密码错误
    // 202 - 令牌失效，请重新登录

    if (res.code != 200) {
      console.log('错误！！code:' + res.code + '-' + res.msg);
      Message({
        type: "error",
        message: res.msg
      });

      if (res.code == 202) {
        store.commit('user/removeToken');
      }

      return Promise.reject(res);
    } else {
      return res;
    }
  },
  error => {
    console.log('err', error);
    return Promise.reject(error);
  }
)

export default service