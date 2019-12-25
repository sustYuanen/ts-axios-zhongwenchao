import {AxiosRequestConfig} from './types/index';

export default function xhr(config: AxiosRequestConfig) : void {
  const {url, method = "get", data = null} = config;
  let request = new XMLHttpRequest();
  request.open(method.toUpperCase(), url, true);
  request.send(data);
}