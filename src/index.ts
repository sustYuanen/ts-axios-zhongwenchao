import {AxiosRequestConfig} from './types';
import {buildURl} from './helpers/url';
import {transformRequest} from './helpers/data';
import xhr from './xhr';


function axios(config: AxiosRequestConfig) : void {
  processConfig(config);
  xhr(config);
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
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


export default axios;
