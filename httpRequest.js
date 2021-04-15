// 1.先导入axios
import axios from 'axios'
2.
export function request (config, success, fail) {
  let newHttp = axios.create({
    baseURL: 'http://ww.baidu.com',
    timeout: 1000
  });
  return new Promise((resolve, reject) => {
    newHttp(config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
调用的位置
request(config: {
  url: ''
}).then(res => {
  console.log(res);
})




