const toString = Object.prototype.toString;
/* 判断是否是Date类型 */
// is可以用来判断一个变量属于某个接口|类型,isDate(val)返回true则断定参数val为Date类型
export function isDate(val: any): val is Date {
  return toString.call(val) === "[object Date]";
}
/* 判断是否是Object类型 */
export function isObject(val: any): val is Object {
  return toString.call(val) === "[object Object]";
}
