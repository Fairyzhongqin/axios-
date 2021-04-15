import axios form 'axios';
import qs from 'qs';
// 根据环境变量区分接口地址
switch (process.env.NODE_ENV) {
  // 生产环境
  case "production":
    axios.defaults.baseURL = 'http://***';
    break;
  // 测试环境
  case "test":
    axios.defaults.baseURL = 'http://***';
    break;
  // 默认是开发环境
  default:
    axios.defaults.baseURL = 'http://***';
}

// 设置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
// 设置请求传递数据的格式
// json: 'application/json; charset=utf-8'
// form: 'application/x-www-form-urlencoded; charset=utf-8'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => {
  qs.stringify(data)
}
// 设置请求拦截
// 客户端发送数据->请求拦截->服务器
// token校验 接收服务器返回的token,存储到vuex/本地存储中,每次向服务器发送请求,都应该把token 带上

axios.interceptors.request.use(config => {
  //携带token 假设token存在localStoragel
  //如果是vuex  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  let token = localStorage.getItem('token');
  token && (config.headers.Authorization = token);
  return config;

}, error => {
  return Promise.reject(error);
});

// 响应拦截器 服务器返回信息->拦截的统一处理->客户端获取
axios.defaults.validateStatus = status => {
  //自定义响应成功的http状态码

}
axios.interceptors.response.use(response => {
  return response.data;

}, error => {
  let { response } = error;
  if (response) {
    //服务器返回果
    switch (response.status) {
      case 401: //超时
        break;
      case 403://服务拒绝执行 token过期
        break;
      case 404://找不到页面
        break;
    }
  } else {
    //服务器链结果都没返回
    if (!window.navigator.onLine) {
      //断网处理:可以跳转到调往网页面
      return;
    }
    return Promise.reject(error);
  }
});
export default axios