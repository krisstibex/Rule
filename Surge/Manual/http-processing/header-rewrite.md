# 标题重写

Surge 可以在客户端转发给服务器之前重写客户端发送的请求或响应头。

例子：

```
[Header Rewrite]
http-request ^http://example.com header-add DNT 1
http-request ^http://example.com header-del Cookie
http-request ^http://example.com header-replace User-Agent Unknown
http-response ^http://example.com header-replace-regex Date 2022 2023
```

重写规则由几部分组成：
1. HTTP 方向：`http-request` 或 `http-response`。 老版本只支持修改请求，这部分可以省略，像这样：

     ```
     [Header Rewrite]
     ^http://example.com header-add DNT 1
     ```

2. 网址正则表达式
3.动作类型
4. 头部域
5. Value（header-del不可用）
6.替换模板（仅用于header-replace-regex）


### 标题添加

将新的标题行附加到标题，即使标题字段已经存在。

例子：

```
[Header Rewrite]
http-request ^http://example.com header-add DNT 1

Before:
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30
Accept-Language: en-us
Accept-Encoding: gzip, deflate

After:
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30
Accept-Language: en-us
Accept-Encoding: gzip, deflate
DNT: 1
```

### 标题删除

从标题中删除标题行。

例子：

```
[Header Rewrite]
http-request ^http://example.com header-del DNT

修改前:
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30
Accept-Language: en-us
Accept-Encoding: gzip, deflate
DNT: 1

修改后:
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30
Accept-Language: en-us
Accept-Encoding: gzip, deflate
```

### 标题替换

替换标头中的标头值。 如果标头字段不存在，则什么也不会发生。

例子：

```
[Header Rewrite]
http-request ^http://example.com header-replace DNT 1

修改前:
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30
Accept-Language: en-us
Accept-Encoding: gzip, deflate
DNT: 0

修改后:
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30
Accept-Language: en-us
Accept-Encoding: gzip, deflate
DNT: 1
```

如果您想在字段存在时添加或替换标题行。 您可以同时使用 header-add 和 header-del。

```
[Header Rewrite]
^http://example.com header-del DNT
^http://example.com header-add DNT 1
```

### 标题替换正则表达式

用正则表达式和模板替换标头中的标头值。 如果标头字段不存在，则什么也不会发生。

```
[Header Rewrite]
http-request ^http://example.com header-replace-regex User-Agent Safari Chrome

修改前:
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30
Accept-Language: en-us
Accept-Encoding: gzip, deflate
DNT: 0

修改后:
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Chrome/603.1.30
Accept-Language: en-us
Accept-Encoding: gzip, deflate
DNT: 0
```