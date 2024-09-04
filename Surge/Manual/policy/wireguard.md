# WireGuard

你可以使用Surge作为WireGuard客户端，将L3 VPN转换为一个出站代理策略。

```
[Proxy]
wireguard-home = wireguard, section-name = HomeServer

[WireGuard HomeServer]
private-key = sDEZLACT3zgNCS0CyClgcBC2eYROqYrwLT4wdtAJj3s=
self-ip = 10.0.2.2
self-ip-v6 = fd00:1111::11
dns-server = 8.8.8.8, 2606:4700:4700::1001
prefer-ipv6 = false
mtu = 1280
peer = (public-key = fWO8XS9/nwUQcqnkfBpKeqIqbzclQ6EKP20Pgvzwclg=, allowed-ips = 0.0.0.0/0, endpoint = 192.168.20.6:51820)
```

配置的注意事项：

* 所有密钥可以是base64或HEX形式。
* 你可以同时配置`self-ip`和`self-ip-v6`来使用IPv4和IPv6双栈，或者只配置其中一个来使用单栈。
* 请注意，每个设备的`self-ip`和`self-ip-v6`必须不同，否则可能导致IP抢占。
* 如果`prefer-ipv6`为真，在启用IPv4和IPv6双栈时，如果一个域同时配置了A和AAAA记录，则优先使用IPv6。
* peer字段可以配置多个节点，用逗号隔开，用（）表示一个节点。
* `preshared-key`和`keepalive`是对等体的可选参数。
* 对等体的端点可以使用一个域。请注意，端点的解析是由[常规]部分配置的DNS解析器完成的，与本段中的`dns-server`参数无关。
* `allowed-ips`为0.0.0.0/0，意味着该策略可以用来访问任何地址，也可以为一个特定的内网地址配置。
* 如果你需要通过此策略访问使用域名的主机，你必须配置`dns-server`，Surge将通过WireGuard的VPN隧道执行DNS解析到该服务器。可以配置多个DNS地址，用逗号分隔。
* `[WireGuard NAME]`部分可以分割成一个独立的配置文件部分文件。
* 可以配置多个Wireguard实例，并同时使用。

使用说明：

* WireGuard是一个L3 VPN，所以处理过程中的开销明显高于其他一般代理协议。它适用于对带宽要求不高的场景。
* 该隧道只支持TCP和UDP协议。此外，还提供一个非常简单的ICMP/ICMPv6响应机制。当WireGuard握手成功时，你可以从服务器端ping客户端隧道的IP来测试连接性。
* 由于WireGuard协议没有错误报告机制，在大多数情况下，WireGuard策略错误是超时（例如，错误的密钥、防火墙阻断、没有配置服务器端NAT等），所以请通过自己抓包分析原因。


#### 自定义保留位

从Surge iOS 5.3.1和Surge Mac 4.10.3开始，Surge现在支持自定义WireGuard的保留位。它可能被用作某些实现的客户端ID或路由ID，例如Cloudflare WARP。

例子：

`peer = (public-key = <key>, allowed-ips = "0.0.0.0/0, :/0", endpoint = example.com:51820, client-id = 83/12/235)`.