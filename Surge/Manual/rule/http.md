# HTTP规则

有两种HTTP规则类型。HTTP规则是针对HTTP请求或HTTPS请求。它不会影响TCP连接。

#### USER-AGENT

```
USER-AGENT,Instagram*,DIRECT
```

如果请求的用户代理匹配，则规则匹配。支持通配符*和?。

#### URL-REGEX

`URL-REGEX,^http://google\.com,DIRECT`。

如果URL与正则表达式匹配，则规则匹配。