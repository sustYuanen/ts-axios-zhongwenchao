/* 项目中公用的类型定义文件 */

/* 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。  */
export interface AxiosRequestConfig {
  url: string
  // ? 表示是接口中的可选属性
  method?: Method
  // params是添加到url的请求字符串中的，用于get请求。
  params?: any
  // data是添加到请求体（body）中的， 用于post请求。
  data?: any
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
