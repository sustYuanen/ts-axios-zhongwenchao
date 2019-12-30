/*
 * 之前我们的捕获的错误都仅仅是简单的 Error 实例，只有错误文本信息，
 * 并不包含是哪个请求、请求的配置、响应对象等其它信息。在此处对错误信息做增强。
 */

import {AxiosResponse, AxiosRequestConfig} from '../types';

export class AxiosError extends Error{
  isAxiosError: boolean
  config: AxiosRequestConfig
  response?: AxiosResponse
  code?: string | null
  request?: any

  constructor(message: string, config:AxiosRequestConfig, code?: string | null, request?: any, response?: AxiosResponse) {
    // 派生类包含了一个构造函数，它必须调用 super()，它会执行基类的构造函数。
    // 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。
    super(message);
    this.config = config;
    this.isAxiosError = true;
    this.response = response;
    this.code = code;
    this.request = request;
    // prototype 是构造函数的属性，所以直接设置是 ConstructorFunction.prototype = ......，相当于给类设置原型。
    // Object.setPrototypeOf() 是给对象设置原型，是为了让大量 obj.__proto__ = .... 这种写法更优雅，有更好的兼容性。
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/*
 * 对外暴露了一个 `createError` 的工厂方法。
 * 把实现同一事情的相同代码，放到一个函数中，以后如果再想实现这个功能，就不需要重新编写这些代码了，只要执行当前的函数即可，
 */
export function createError(message: string, config:AxiosRequestConfig, code?: string | null, request?: any, response?: AxiosResponse): AxiosError {
  return new AxiosError(message, config, code, request, response);
}
