# 最终规则

FINAL规则必须写在所有其他规则之后。它定义了没有被任何其他规则匹配的请求的默认策略。

例如：

```
[Rule]
DOMAIN-SUFFIX,company.com,ProxyA
DOMAIN-KEYWORD,google,DIRECT
GEOIP,US,DIRECT
IP-CIDR,192.168.0.0/16,DIRECT
FINAL,ProxyB
```

### 选项
#### 选项: dns-failed

如果在规则评估期间DNS查询失败，则使用FINAL规则。这个选项只有在与非DIRECT策略一起使用时才有意义。