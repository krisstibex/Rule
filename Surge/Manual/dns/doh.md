# 加密 DNS

如果配置了加密DNS，那么传统DNS只会用来测试连通性，解析加密DNS URL中的域。

支持的协议：

- 通过 HTTPS 的 DNS: https://example.com
- 通过 HTTP/3 的 DNS: h3://example.com
- 通过 QUIC 的 DNS: quic://example.com

### 对所有域使用加密 DNS

```
[General]
encrypted-dns-server = https://8.8.8.8/dns-query
```

您可以在此处指定多个加密服务器，以逗号分隔。


### 对指定域使用加密 DNS

```
[Host]
example.com = server:https://cloudflare-dns.com/dns-query
```

### 将加密的 DNS 与代理一起使用

如果要通过代理查询 DoH 服务器，可以将 encrypted-dns-follow-outbound-mode 设置为 true。

```
[General]
encrypted-dns-follow-outbound-mode=true
```

所有加密的 DNS 连接都将遵循出站模式设置。 然后为 DoH 主机名配置规则以使用代理。

或者，使用 `PROTOCOL,DOH`、`PROTOCOL,DOH3` 或 `PROTOCOL,DOQ` 规则来匹配所有加密的 DNS 连接。