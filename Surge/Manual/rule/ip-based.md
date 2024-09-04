# 基于IP的规则

有3种基于IP的规则类型。基于IP的规则将触发DNS查询，如果请求的主机名是一个域。如果DNS查询失败，Surge将中止规则测试，并报告一个错误。

#### IP-CIDR

```
IP-CIDR,192.168.0.0/16,DIRECT
ip-cidr,10.0.0.8,direct
IP-CIDR,172.16.0.0/12,DIRECT
IP-CIDR,127.0.0.1/8,DIRECT
```

如果请求的IP地址与指定范围相匹配，则规则匹配。

#### IP-CIDR6

```
IP-CIDR6,2001:db8:abcd:8000::/50,DIRECT
```

如果请求的IPv6地址与指定范围相匹配，则规则匹配。


#### GEOIP

`geoip,us,direct`。

如果GeoIP测试结果与指定的国家代码相符，则规则匹配。

### 基于IP的规则选项
#### 选项: no-resolve

```
GEOIP,US,DIRECT,no-resolve
IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
```

当遇到GEOIP或IP-CIDR规则时，Surge将发送一个DNS查询，以检查请求的主机名是否是一个域名。你可以选择'no-resolve'选项来跳过这个规则，对于有域名的请求。

> 注意：如果某些域名不能被本地的DNS服务器解析，请确保在该规则前面没有基于IP的规则与该域名匹配。否则，规则测试将因DNS错误而失败。你也可以使用 "no-resolve "来解决这个问题。