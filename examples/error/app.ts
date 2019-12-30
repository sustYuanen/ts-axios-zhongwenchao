import axios, {AxiosError} from '../../src/index'
// // 404错误
// axios({
//   method: 'get',
//   url: '/error/get1'
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })
//
// // 服务器错误或请求正常
// axios({
//   method: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })
//
// // 超时错误
// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   }).then((res) => {
//     console.log(res)
//   }).catch((e) => {
//     console.log(e)
//   })
// }, 5000)
//
// // 超时错误
// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e.message)
// })




axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e);
  // Error: Timeout of 2000 ms exceeded
  //   at new AxiosError (errors.ts:27)
  //   at createError (errors.ts:46)
  //   at XMLHttpRequest.handleTimeOut (xhr.ts:63)
  console.log(e.message)
  // app.ts:54 Timeout of 2000 ms exceeded
  console.log(e.code)
  // app.ts:55 ECONNABORTED
})
