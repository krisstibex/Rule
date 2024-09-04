### http-request

使用一个脚本来修改HTTP请求。值域是一个正则表达式，用于匹配请求的URL。

传入的参数是$request：

* `$request.url<String>`：请求的URL。
* `$request.method<String>`：请求的HTTP方法。
* `$request.headers<Object>`：Request HTTP Headers。
* `$request.body<String or Uint8Array>`：Request body。只有在 requires-body = true 时才有效。
* `$request.id<String>`：一个唯一的ID，以便在脚本之间保持连续性。

脚本必须用一个对象来调用$done()。该对象可以包含：
* `url<String>`：使用新的URL来覆盖旧的。请注意，它不会像URL Rewrite那样更新头中的'Host'字段。如果有必要，你需要通过返回一个修改的头文件对象来手动改变它。
* `headers<Object>`：使用新的头文件来覆盖所有旧的头文件。请注意，有些字段可能不会被修改，比如'Content-Length'。
* `body<String or Uint8Array>`：使用新的body来覆盖旧的body。只在 requires-body = true 时起作用。

* `response<Object>`：如果这个对象存在，Surge直接返回一个HTTP响应，而不进行真正的网络操作。该对象可能包含：
    * `status<Number>`：响应的HTTP状态代码。(可选。默认：200)
    * `headers<Object>`：响应的HTTP头信息。(可选)
    * `body<String or Uint8Array>`：响应的HTTP主体。(可选)

你可以使用$done();来终止请求而不返回任何东西。或者使用$done({});来保持请求不被触动。

当前版本中的一些限制：
* 当使用chunked编码时，请求主体可能不会被覆盖。
* 当头信息中存在'Expect: 100-continue'时，请求正文可能不会被覆盖。

一个简单的例子：

```
让 headers = $request.headers；
headers['X-Modified-By'] = 'Surge'；

$done({headers})；
```