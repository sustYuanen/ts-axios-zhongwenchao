/* 项目中公用的类型定义文件 */

/* 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。  */
export interface AxiosRequestConfig {
  url: string
  // ? 表示是接口中的可选属性
  method?: Method
  // params是添加到url的请求字符串中的，用于get请求。
  params?: any
  // data是添加到请求体（body）中的， 用于post请求。
  data?: any,
  // 设置请求头
  headers?: any,
  // 设置响应类型
  // 对于一个 AJAX 请求的 `response`，我们是可以指定它的响应的数据类型的，通过设置 `XMLHttpRequest` 对象的responseType属性
  // `responseType` 的类型是一个 `XMLHttpRequestResponseType` 类型，它的定义是 `"" | "arraybuffer" | "blob" | "document" | "json" | "text"` 字符串字面量类型。
  responseType?: XMLHttpRequestResponseType,
  // 设置请求超时时间
  timeout?: number
}

/* 为了让 `method` 只能传入合法的字符串，我们定义一种字符串字面量类型 `Method`： */
export type Method = "get" | "GET"
      | "delete" | "DELETE"
      | "post"   | "POST"
// OPTIONS方法用来描述了目标资源的通信选项，会返回服务器支持预定义URL的HTTP策略。
      | "options"| "OPTIONS"
      | "patch"  | "PATCH"
      | "head"   | "HEAD"
      | "put"    | "PUT";


/* 响应数据格式 */
export interface AxiosResponse {
  // 服务端返回的数据
  data: any,
  // HTTP状态码
  status: number,
  // 状态消息
  statusText: string,
  // 响应头
  headers: any,
  // 请求配置对象
  config: AxiosRequestConfig,
  // 请求的 `XMLHttpRequest` 对象实例 `request`
  request: any
}

/*
 * `axios` 函数返回的是一个 `Promise` 对象，我们可以定义一个 `AxiosPromise` 接口，它继承于 `Promise<AxiosResponse>` 这个泛型接口：
 *  这样的话，当 `axios` 返回的是 `AxiosPromise` 类型，那么 `resolve` 函数中的参数就是一个 `AxiosResponse` 类型。
 */
export interface AxiosPromise extends Promise<AxiosResponse>{
}

/*
 * 定义错误响应的数据格式
 */
export interface AxiosError extends Error{
  config: AxiosRequestConfig,
  code?: string,
  request?: any,
  response?: AxiosResponse,
  isAxiosError: boolean
}
