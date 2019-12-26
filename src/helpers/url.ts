import {isDate, isObject} from './util';
/* 对url进行编码，并对特殊字符进行处理(不进行编码)
 * 对于字符 `@`、`:`、`$`、`,`、` `、`[`、`]`，我们是允许出现在 `url` 中的，不希望被 encode。
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')   // 将空格转化为"+"
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

/* 构建url,处理参数 */
export function buildURl(url: string, params?: any): string {
  if (!params) return url;
  // 定义string类型数组常量---const变量的内部状态是可修改的，而引用的值不可修改
  const parts: string[] = [];  // 存储url上的参数
  Object.keys(params).forEach((key) => {
    let val = params[key];
    if (val === null || typeof(val) === "undefined") {
      return;  //  跳出当前循环，进行下一此循环
    }
    /* 将对象值全部转化为数组 */
    let values: string[] = [];
    // 如果参数val是数组---foo: ['bar', 'baz']对应的url上的结构是foo[]=bar&foo[]=baz
    if (Array.isArray(val)) {
      values = val;
      key += "[]";
    } else {
      values = [val];
    }
    /* 组装url中的参数，key=val&key=val形式 */
    values.forEach((v) => {
      if (isDate(v)) {
        /* Date类型要转化成2019-04-01T05:55:39.030Z */
        v = v.toISOString();
      } else if (isObject(v)) {
        /* JSON.stringify()的作用是将js对象转换为JSON字符串，而JSON.parse()可以将JSON字符串转为一个对象。 */
        v = JSON.stringify(v);
      }
      parts.push(`${encode(key)}=${encode(v)}`);
    })
  })
  let serializedParams = parts.join("&");
  if (serializedParams) {
    /* 丢弃 url 中的哈希标记"#" */
    let markIndex = url.indexOf("#");
    if (markIndex !== -1) {
      // 截取字符串从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
