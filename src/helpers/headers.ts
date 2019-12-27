/**
 * 1.我们做请求数据的处理，把 `data` 转换成了 JSON 字符串，但是数据发送到服务端的时候，服务端并不能正常解析我们发送的数据，
 * 因为我们并没有给请求 `header` 设置正确的 `Content-Type `。
 * 2.发现 `/base/buffer` 的请求是可以拿到数据，但是 `base/post` 请求的 response 里却返回的是一个空对象，
 * 3.实际上是因为我们虽然执行 `send` 方法的时候把普通对象 `data` 转换成一个 `JSON` 字符串，
 * 但是我们请求`header` 的 `Content-Type` 是 `text/plain;charset=UTF-8`，导致了服务端接受到请求并不能正确解析请求 `body` 的数据。
 * 4.所以首先我们要支持发送请求的时候，可以支持配置 `headers` 属性，如下：
 * headers: {
 *   'content-type': 'application/json;charset=utf-8'
 * }
 * 并且在当我们传入的 `data` 为普通对象的时候，`headers` 如果没有配置 `Content-Type` 属性，
 * 需要自动设置请求 `header` 的 `Content-Type` 字段为：`application/json;charset=utf-8`。
 */
import {isObject} from './util';

/*  `header` 属性名规范化---规范请求头Content-Type写法 */
function normalizeHeaderName(headers: any, normalizename: string): any {
  if (!headers) return;
  Object.keys(headers).forEach(name => {
    if (name !== normalizename && name.toUpperCase() === normalizename.toUpperCase()) {
      headers[normalizename] = headers[name];
      delete headers[name];
    }
  })
}


export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, "Content-Type");
  /* 当我们传入的 `data` 是一个普通对象时，如果没请求头没content-type属性则进行添加（作用是将json字符串转化为对象） */
  if (isObject(data)) {
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json;charset=utf-8";
    }
  }
  return headers;
}



// 前面在xhr.ts中我们通过 `XMLHttpRequest` 对象的 `getAllResponseHeaders` 方法获取到的值是如下一段字符串：
// "date: Fri, 05 Apr 2019 12:40:49 GMT
// etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
// connection: keep-alive
// x-powered-by: Express
// content-length: 13
// content-type: application/json; charset=utf-8"
// 每一行都是以回车符和换行符 `\r\n` 结束，它们是每个 `header` 属性的分隔符。对于上面这串字符串，我们希望最终解析成一个对象结构：
// {
//   date: 'Fri, 05 Apr 2019 12:40:49 GMT'
//   etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
//   connection: 'keep-alive',
//   'x-powered-by': 'Express',
//   'content-length': '13',
//   'content-type': 'application/json; charset=utf-8'
// }
export function parseHeaders(headers: string): any {
  /*
   * Object.create(null)没有继承任何原型方法，也就是说它的原型链没有上一层。没有任何属性，显示No properties，
   *                    我们可以把它当作一个非常纯净的map来使用，我们可以自己定义hasOwnProperty、toString方法
   * 1.另一个使用create(null)的理由是，在我们使用for..in循环的时候会遍历对象原型链上的属性，
   * 使用create(null)就不必再对属性进行检查了，当然，我们也可以直接使用Object.keys[]。
   * Object.create({}).toString  // function toString() { [native code] }
   * Object.create(null).toString // undefined
   */
  let parsed = Object.create(null);
  if (!headers) return parsed;
  headers.split("\r\n").forEach(line => {
    let [key, val] = line.split(":");
    key = key.trim().toLowerCase();
    if (!key) return;
    if (val) val = val.trim();
    parsed[key] = val;
  })
  return parsed;
}
