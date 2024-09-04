# 基于域名的规则

有三种基于域的规则类型。

#### DOMAIN

`DOMAIN,www.apple.com,Proxy`

如果请求的域完全匹配，则规则匹配。

#### DOMAIN-SUFFIX

`DOMAIN-SUFFIX,apple.com,Proxy`。

如果请求的域名与后缀相匹配，则规则匹配。例如：'google.com'匹配'www.google.com'、'mail.google.com'和'google.com'，但不***匹配'content-google.com'。

#### domain-keyword

`DOMAIN-KEYWORD,google,Proxy`。

如果请求的域包含关键字，则规则匹配。


#### DOMAIN-SET

为大量的域名而设计，支持快速搜索成千上万的记录。文件中的每一行都是一个域名，如果一行以.开头，则匹配所有子域名和域名本身。这可用于广告过滤。

> 由于性能优化，DOMAIN-SET规则不支持包括eTLD后缀。
>
> 例如：.github.io不会匹配 example.github.io
>
> 以下是完整的eTLD列表： https://publicsuffix.org/list/
>
> 如果你想使用eTLD作为后缀，请使用RULE-SET代替。