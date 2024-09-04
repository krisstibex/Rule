### http-response

使用一个脚本来修改HTTP响应。值域是一个正则表达式，用于匹配请求的URL。

传入的参数是$request和$response：

* `$request.url<String>`：请求的URL。
* `$request.method<String>`：请求的HTTP方法。
* `$request.id<String>`：一个唯一的ID，以便在脚本之间保持连续性。
* `$request.headers<Object>`：Request HTTP headers。
* `$response.status<Number>`：响应的HTTP状态代码。
* `$response.headers<Object>`：响应的HTTP头信息。
* `$response.body<String or Uint8Array>`：响应的HTTP正文，如果没有设置二进制模式，则用UTF-8解码为字符串。只有在 requires-body = true 时才存在。

脚本必须用一个对象来调用$done()。该对象可以包含：

* `body<String or Uint8Array>`：使用新的body来覆盖旧的body。只有在 requires-body = true 时有效。
* `headers<Object>`：使用新的头文件覆盖所有旧的头文件。请注意，有些字段可能不会被修改，如'Content-Length'。
* `status<Number>`：使用新的状态码来覆盖旧的状态码。

你可以使用$done();来中止请求而不返回任何东西。或者使用$done({});来保持响应不被触动。

一个简单的例子：

```
let headers = $response.headers；
headers['X-Modified-By'] = 'Surge'；

$done({headers})；
```