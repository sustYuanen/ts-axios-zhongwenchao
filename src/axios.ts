import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import {buildURl} from './helpers/url';
import {transformRequest, transformResponse} from './helpers/data';
import {processHeaders} from './helpers/headers';
import xhr from './xhr';


function axios(config: AxiosRequestConfig) : AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    // Promise多个then连续使用: 方案一:直接返回值  方案二:返回promise作为结果
    return transformResponseData(res);  // 此处使用方案一
  });
}

/* 处理响应数据 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}

/* 处理请求数据 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  /* 处理 `header` 的时候依赖了 `data`，所以要在处理请求 `body` 数据之前处理请求 `header`。 */
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

/* 转换请求 `body` 的数据 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}
/* 转换请求的url */
function transformUrl(config: AxiosRequestConfig): string {
  const {url, params} = config;
  return buildURl(url, params);
}
/* 转换请求的headers */
function transformHeaders(config: AxiosRequestConfig): any {
  const {data,headers={}} = config;
  return processHeaders(headers, data);
}



export default axios;
