# 规则

Surge可以将请求转发到另一个代理服务器或直接连接到主机，这取决于定制的规则。

### 优先级
规则从第一条到最后一条，按照它们在配置文件中出现的顺序进行匹配。换句话说，列表顶部的规则比后面的规则有更高的优先级。

### 组成

每条规则由三部分组成：规则类型、流量匹配器（除FINAL规则外）和代理策略：
         类型、值、策略
例子：DOMAIN-SUFFIX,apple.com, DIRECT
         IP-CIDR, 192.168.0.0/16,ProxyA

Surge支持6种不同类型的规则：DOMAIN, DOMAIN-SUFFIX, DOMAIN-KEYWORD, GEOIP, IP-CIDR, 或 FINAL.代理政策必须以其中一个政策名称命名，包括 "一个代理"、"一个政策组"、"DIRECT "或 "REJECT"。规则必须以FINAL规则结束，以定义默认行为。

例子：

```
[Rule］
DOMAIN-SUFFIX,company.com,ProxyA
DOMAIN-KEYWORD,google,DIRECT
geoip,us,DIRECT
IP-CIDR,192.168.0.0/16,DIRECT
FINAL,ProxyB
```

DOMAIN、DOMAIN-SUFFIX和DOMAIN-KEYWORD是[基于域名的规则]（/rule/domain-based.md）。IP-CIDR和GEOIP是[基于IP的规则]（/rule/ip-based.md）。