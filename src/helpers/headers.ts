/**
 * 1.我们做请求数据的处理，把 `data` 转换成了 JSON 字符串，但是数据发送到服务端的时候，服务端并不能正常解析我们发送的数据，
 * 因为我们并没有给请求 `header` 设置正确的 `Content-Type `。
 * 2.发现 `/base/buffer` 的请求是可以拿到数据，但是 `base/post` 请求的 response 里却返回的是一个空对象，
 * 3.实际上是因为我们虽然执行 `send` 方法的时候把普通对象 `data` 转换成一个 `JSON` 字符串，
 * 但是我们请求`header` 的 `Content-Type` 是 `text/plain;charset=UTF-8`，导致了服务端接受到请求并不能正确解析请求 `body` 的数据。
 * 4.所以首先我们要支持发送请求的时候，可以支持配置 `headers` 属性，如下：
 * headers: {
 *   'content-type': 'application/json;charset=utf-8'
 * }
 * 并且在当我们传入的 `data` 为普通对象的时候，`headers` 如果没有配置 `Content-Type` 属性，
 * 需要自动设置请求 `header` 的 `Content-Type` 字段为：`application/json;charset=utf-8`。
 */
