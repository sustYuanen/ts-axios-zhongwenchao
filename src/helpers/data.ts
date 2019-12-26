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

import {isObject} from './util';

export function transformRequest(val: any): any {
  if (isObject(val)) {
    return JSON.stringify(val);
  }
  return val;
}
