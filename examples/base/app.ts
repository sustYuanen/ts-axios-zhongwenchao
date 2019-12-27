import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})









axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})








// 我们请求的数据是普通对象并且没有配置 `headers` 的时候，会自动为其添加 `Content-Type:application/json;charset=utf-8`；
// 同时我们发现当 data 是某些类型如 `URLSearchParams` 的时候，浏览器会自动为请求 `header`加上合适的 `Content-Type`。
// Content-Type: application/x-www-form-urlencoded;charset=UTF-8
// 目前我们的请求从网络层面是可以收到服务端的响应的，下一节课我们就从代码层面来处理服务端响应，并且让调用方可以拿到从服务端返回的数据。
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;'
  },
  data: {
    a: 1,
    b: 2
  }
})
/*
* let a = new URLSearchParams(location.search); 然后通过a.get()的方式输入键 拿到值
* 就简单点吧 拿到前一个页面传过来的id,let id = a.get(‘id’);这样就可以直接拿到id了
*/
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

// console.log(searchParams)
// {q: URLUtils.searchParams,  topic: api}

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})





// 我们打开浏览器运行 demo，看一下结果，发现我们可以正常 log 出这个 `res` 变量，它包含 `AxiosResponse` 类型中定义的那些属性，不过我们发现 2 个小问题
// 第一个是 `headers` 属性是一个字符串，我们需要把它解析成对象类型；
// 第二个是在第二个请求中，得到的数据是一个 JSON 字符串，我们也需要把它转换成对象类型。
// 那么下一小节，我们将来解决第一个问题，对于响应的 `header` 做处理。
axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
  // config: {method: "post", url: "/base/post", data: "{"a":1,"b":2}", headers: {…}}
  // data: "{"a":1,"b":2}"
  // headers: "date: Fri, 27 Dec 2019 06:05:27 GMT↵etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"↵connection: keep-alive
  //             ↵x-powered-by: Express↵content-length: 13↵content-type: application/json; charset=utf-8↵"
  // request: {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
  // status: 200
  // statusText: "OK"
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
  // config: {method: "post", url: "/base/post", responseType: "json", data: "{"a":3,"b":4}", headers: {…}}
  // data: {a: 3, b: 4}
  // headers: "date: Fri, 27 Dec 2019 06:05:27 GMT↵etag: W/"d-talgBZSHcQOay+ud5zDrtp+2VNk"↵connection: keep-alive
  //          ↵x-powered-by: Express↵content-length: 13↵content-type: application/json; charset=utf-8↵"
  // request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
  // status: 200
  // statusText: "OK"
})
