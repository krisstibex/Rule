# 网址重写

Surge 可以使用 2 种不同的方法重写请求的 URL 或通过 URL 拒绝某些请求。

例子：

```
[URL Rewrite]
^http://www\.google\.cn http://www.google.com header
^http://yachen\.com https://yach.me 302
^http://ad\.com/ad\.png _ reject
```

重写规则由正则表达式、替换和类型三部分组成。

### 请求头模式
Surge 会修改请求头并在必要时将请求重定向到另一台主机。客户端不会注意到这个重写动作。

请求标头中的“主机”字段将被修改以匹配新的 URL。

```
[URL Rewrite]
^http://www\.google\.cn http://www.google.com header
```


### 302重定向模式
Surge 只会返回 302 重定向响应。如果启用主机名的 MitM，则可以重定向 HTTPS 请求。

```
[URL Rewrite]
^http://yachen\.com https://yach.me 302
```


### 拒绝模式
如果模式匹配，则拒绝请求。替换参数将被忽略。如果为主机名启用 MitM，HTTPS 请求将被拒绝。

```
[URL Rewrite]
^http://ad\.com/ad\.png _ reject
```