import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from './types';
import {parseHeaders} from './helpers/headers';

export default function xhr(config: AxiosRequestConfig) : AxiosPromise {
  return new Promise((resolve, reject) => {
    const {url, method = "get", data = null, headers, responseType, timeout} = config;
    /* 初始化XMLHttpRequest对象 */
    let request = new XMLHttpRequest();
    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) request.timeout = timeout;
    /* 初始化一个请求
     * async：一个可选的布尔参数，默认为true，表示要不要异步执行操作。如果值为false，send()方法直到收到答复前不会返回。
     * 如果true，已完成事务的通知可供事件监听器使用。如果multipart属性为true则这个必须为true，否则将引发异常。
     */
    request.open(method.toUpperCase(), url, true);  // get请求参数直接拼在url上

    /*
     * onreadystatechange 事件:当请求被发送到服务器时，我们需要执行一些基于响应的任务。每当 readyState 改变时，就会触发 onreadystatechange 事件。
     * readyState存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
     * 0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收 3: 请求处理中 4: 请求已完成，且响应已就绪
     * status 200: "OK" 404: 未找到页面
     * 当 readyState 等于 4 且状态为 200 时，表示响应已就绪：
     */
    request.onreadystatechange = function handleLoad() {
      // 如果请求的响应结果未就绪，则不作处理
      if (request.readyState !== 4) return;
      // 如果发生超时或者网络错误，则status为0
      if (request.status === 0) return;
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType && responseType !== "text" ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }


    /* 处理响应 */
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(new Error(`Request failed with status code${response.status}`));
      }
    }


    /* 处理网络异常错误 */
    request.onerror = function handleError() {
      reject(new Error("Network Error"));
    }

    /* 处理超时错误 */
    request.ontimeout = function handleTimeOut() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }


    /* 设置请求头 */
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === "content-type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    })
    /* 发送请求 */
    request.send(data);  // send()传入的是post请求参数，通过该方法的参数设置请求 `body` 数据
  })
}
