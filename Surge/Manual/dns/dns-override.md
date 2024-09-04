# DNS

Surge 使用定制的 DNS 客户端来支持高级功能。 它的行为可能与您操作系统的 DNS 客户端不同。

### 上游 DNS 服务器

Surge 默认使用操作系统的 DNS 服务器地址。 您可以使用 `dns-server` 参数覆盖它们。

```
[General]
dns-server = 8.8.8.8, 8.8.4.4
```

使用关键字 `system` 将额外的 DNS 服务器附加到系统的设置中。 （重复的服务器将被忽略）

```
[General]
dns-server = system, 8.8.8.8, 8.8.4.4
```


### 技术细节

Surge 同时查询所有 DNS 服务器以提高性能，类似于带有“--all-servers”参数的 dnsmasq。 将使用来自服务器的第一个答案。 Surge iOS 应用程序和 Surge Dashboard 将显示哪个服务器首先响应。 如果 Surge 在 2 秒内没有收到任何答复，它将再次查询所有服务器。 重试四次后，Surge 会放弃并报告 DNS 错误。

某些域名可能具有性能不佳的权威名称服务器，导致上游 DNS 服务器由于服务器端超时或其他连接问题而返回空答案。 如果**所有**上游 DNS 服务器明确返回空 DNS 答案，或者如果某些服务器返回空答案而其他服务器未能在 2 秒内响应，Surge 将报告空 DNS 错误。

当 IPv6 可用并启用时，Surge DNS 客户端将同时向上游 DNS 服务器发送 A 和 AAAA 问题。 将使用返回的第一个 A 或 AAAA 答案。