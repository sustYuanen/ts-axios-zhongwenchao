import { isObject } from './util'

/*
 *  我们通过执行 `XMLHttpRequest` 对象实例的 `send` 方法来发送请求，并通过该方法的参数设置请求 `body` 数据(仅针对post请求),
 * `send` 方法的参数支持 `Document` 和 `BodyInit` 类型，`BodyInit` 包括了 `Blob`, `BufferSource`, `FormData`, `URLSearchParams`,
 * `ReadableStream`、`USVString(js中的USVString最终会映射成String)`，当没有数据的时候还可以传入 `null`。
 *但是我们最常用的场景还是传一个普通对象给服务端，例如：
 *axios({
 *method: 'post',
 *url: '/base/post',
 *data: {
      a: 1,
      b: 2
    }
 *})
 * 这个时候 `data`是不能直接传给 `send` 函数的，我们需要把它转换成 JSON 字符串。(原因：`send` 方法的参数支持USVString)
 */
export function transformRequest(val: any): any {
  if (isObject(val)) {
    return JSON.stringify(val)
  }
  return val
}


/*
 * 在我们不去设置 `responseType` 的情况下，服务端返回给我们的数据是字符串类型，我们可以去把它转换成一个 JSON 对象。例如：
 * data: "{"a":1,"b":2}".我们把它转换成：data: { a: 1, b: 2 }
 */
export function transformResponse(val: any): any {
  if (typeof val === 'string') {
    //  应使用try..catch来捕获异常.如果传入的是非json字符串(例如"hsgd),
    //  会报错Uncaught SyntaxError: Unexpected token h in JSON at position 0
    try {
      val = JSON.parse(val)
    } catch (e) {
      // do nothing
    }
  }
  return val
}
