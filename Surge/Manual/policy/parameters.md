# 共同政策参数

### 出口参数

所有这些参数对内置和代理策略都是可用的。

#### `interface` (默认：自动)

强制使用一个指定的出站网络接口。

```
ProxyHTTP = http, 1.2.3.4, 443, username, password, interface = en2
```

直接策略别名像代理策略一样支持 "接口 "参数。

```
[Proxy]
Crop-VPN = direct, interface = utun0
WiFi = direct, interface = en2, allow-other-interface=true
```

请确保该接口对目标地址有一个有效的路由表。

#### `allow-other-interface`。

当该选项为真时，如果所需的接口不可用，Surge被允许使用默认接口来绑定连接。否则，连接会直接失败。

```
ProxyHTTP = http, 1.2.3.4, 443, username, password, interface = en2, allow-other-interface=true
```

### `no-error-alert`.

不显示此策略的错误警报。

#### `ip-version`

选择IPv4和IPv6协议之间的行为。该选项只是影响到与代理服务器的连接。因此，只有当代理服务器的主机名是一个域名时，它才有意义。如果配置了底层代理，该选项没有影响，因为DNS解析是在远程进行的。

- double (默认，使用最快的链接)
- v4-only
- v6-only
- prefer-v4
- prefer-v6

#### `hybrid` (布尔值，仅适用于iOS，默认为关闭)

同时设置蜂窝数据和Wi-Fi的连接，然后使用更快的链接。

#### `tfo` (布尔值, 默认: 关闭)

启用TCP快速打开。

#### `tos` (十进制或十六进制，默认值：0)

自定义IP TOS值。

### 测试

#### `test-url`。

例子：
`test-url=http://google.com`

覆盖全局测试的URL。该URL用于可用性和延时测试。通过对该URL进行HTTP HEAD请求，对代理进行浪涌测试和基准测试。


#### `test-timeout`(以秒为单位)
 
覆盖全局测试超时。

#### `test-udp`

例子：
`test-udp=google.com@1.1.1.1`

覆盖代理的全局`proxy-test-udp`设置。通过执行DNS查询，对UDP中继进行浪涌测试和基准测试。