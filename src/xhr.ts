import {AxiosRequestConfig} from './types';

export default function xhr(config: AxiosRequestConfig) : void {
  const {url, method = "get", data = null} = config;
  /* 初始化XMLHttpRequest对象 */
  let request = new XMLHttpRequest();
  /* 初始化一个请求
   * async：一个可选的布尔参数，默认为true，表示要不要异步执行操作。如果值为false，send()方法直到收到答复前不会返回。
   * 如果true，已完成事务的通知可供事件监听器使用。如果multipart属性为true则这个必须为true，否则将引发异常。
   */
  request.open(method.toUpperCase(), url, true);  // get请求参数直接拼在url上
  /* 发送请求 */
  request.send(data);  // send()传入的是post请求参数，通过该方法的参数设置请求 `body` 数据
}
