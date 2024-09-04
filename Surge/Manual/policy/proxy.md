# 代理策略

代理策略指示将请求转发到另一个代理服务器。 Surge 支持 HTTP/HTTPS/SOCKS5/SOCKS5-TLS 等更多代理协议。

[Proxy] 部分声明了代理策略。 您可以为不同的规则创建多个代理。

配置行示例：

```
[Proxy]
ProxyHTTP = http, 1.2.3.4, 443, username, password
ProxyHTTPS = https, 1.2.3.4, 443, username, password
ProxySOCKS5 = socks5, 1.2.3.4, 443, username, password
ProxySOCKS5TLS = socks5-tls, 1.2.3.4, 443, username, password, skip-common-name-verify=true
```

## 代理类型

Surge 支持最常见的标准代理协议。

* HTTP 代理：`ProxyHTTP = http, 1.2.3.4, 443, username, password`
* HTTPS 代理（通过 TLS 的 HTTP 代理）：`ProxyHTTPS = https, 1.2.3.4, 443, username, password`
* SOCKS5: `ProxySOCKS5 = socks5, 1.2.3.4, 443, [Proxy]
ProxyHTTP = http, 1.2.3.4, 443, username, password
ProxyHTTPS = https, 1.2.3.4, 443, username, password
ProxySOCKS5 = socks5, 1.2.3.4, 443, username, password
ProxySOCKS5TLS = socks5-tls, 1.2.3.4, 443, username, password, skip-common-name-verify=true`
* SOCKS5 通过 TLS：`ProxySOCKS5TLS = socks5-tls, 1.2.3.4, 443, username, password`
* SSH
* WireGuard（L3 层 VPN 作为代理）

Surge 还支持多种非标准代理协议。

* Snell：`Proxy-Snell = snell, 1.2.3.4, 8000, psk=password, version=4`
* Shadowsocks: `Proxy-SS = ss, 1.2.3.4, 8000, encrypt-method=chacha20-ietf-poly1305, password=abcd1234`
* VMess：`Proxy-VMess = vmess, 1.2.3.4, 8000, username=0233d11c-15a4-47d3-ade3-48ffca0ce119`
* Trojan：`Proxy-Trojan = trojan, 192.168.20.6, 443, password=password1`
* TUIC：`Proxy-TUIC = tuic，192.168.20.6, 443, token=pwd, alpn=h3`

Surge 支持 Snell V3/V4、Shadowsocks、Trojan、WireGuard 和 TUIC 协议的 UDP 中继。 由于 shadowsocks 服务器可能不支持 UDP 中继，因此应通过添加参数 `udp-relay=true` 手动打开对 shadowsocks 代理的 UDP 中继支持。

## 参数

#### 代理链

* `underlying-proxy`

使用代理连接另一个代理，也称为代理链。


#### 通过 TLS 代理的参数（HTTP、SOCKS5-TLS、VMess、特洛伊木马、TUIC）

* `skip-cert-verify`：可选，“true”或“false”（默认值：false）。
  
     如果启用此选项，Surge 将不会验证服务器的证书。

* `sni`: 默认值是代理主机名

     您可以在 TLS 握手期间自定义服务器名称指示 (SNI)。 使用 sni=off 完全关闭 SNI。 默认情况下，Surge 像大多数浏览器一样使用主机名发送 SNI。

* `server-cert-fingerprint-sha256`: 可选

     使用固定的服务器证书而不是标准的 X.509 验证。

#### HTTP/HTTPS 协议参数

* `always-use-connect`：可选。

始终使用 HTTP CONNECT 方法来中继请求，即使对于普通 HTTP 请求也是如此。


#### 支持混淆的协议参数（Shadowsocks，Snell）

* `obfs`：可选。 `http` 或 `tls`
* `obfs-host`：可选。
* `obfs-uri`：可选。

#### Snell 协议参数

有关详细信息，请参阅 [Snell 协议](../others/snell.md)。

* `psk`：必需。
* `版本`：必填。
* `重用`：可选。 连接重用是 Snell V4 的可选功能。

#### Shadowsocks 协议的参数

* `udp-relay`：可选。 由于 UDP 中继对于 shadowsocks 服务器是可选的，因此您必须明确启用 UDP 中继。

#### VMess 协议参数

* `ws`：可选。 使用 Web Socket 传输层。
* `ws-path`：可选。
* `ws-headers`：可选。
* `加密方法`：可选。

#### Trojan协议参数

* `ws`：可选。 使用 Web Socket 传输层。
* `ws-path`：可选。
* `ws-headers`：可选。

#### TUIC 协议参数

* `token`：必填。
* `alpn`：可选。 它必须与服务器的 ALPN 设置相匹配。


## TLS 代理的客户端证书

Surge 支持对基于 TLS 的代理进行客户端证书验证。

例子：

```
[Proxy]
Proxy = https, example.com, 443, client-cert=cert1

[Keystore]
cert1 = base64=<P12 base64 string here>, password=123456
```

## SSH

从 Surge Mac 4.6.0 开始。 您现在可以使用 SSH 协议作为代理策略，相当于 `ssh -D`。

配置文件语法：

* 密码认证

```
[Proxy]
proxy = ssh, 1.2.3.4, 22, username=root, password=pw
```

* 公钥认证

```
[Proxy]
proxy = ssh, 1.2.3.4, 22, username=root, private-key=key1

[Keystore]
key1 = type=openssh-private-key, base64=[The base64 encoded content of the private key file]
```

* 请注意，即使私钥文件本身使用 base64 编码，您也必须再次使用 base64 对整个私钥文件进行编码。

* 支持所有四种类型的私钥，RSA/ECDSA/ED25519/DSA。
  
* Surge只支持`curve25519-sha256`作为kex算法和`aes128-gcm`作为加密算法。 这意味着 SSH 服务器必须使用 OpenSSH v7.3 或更高版本。 （这应该不是问题，因为 OpenSSH 7.3 于 2016-08-01 发布。）

* 您现在可以指定空闲超时参数。 默认值为 180 秒。

```
[Proxy]
proxy = ssh, 1.2.3.4, 22, username=root, password=pw, idle-timeout=180
```

## Shadow TLS

Shadow TLS 是一种代理混淆器，可用于任何基于 TCP 的代理。（https://github.com/ihciah/shadow-tls）

从 Surge iOS 5.2.0 和 Surge Mac 4.10.0 开始，Surge 支持 Shadow TLS V2 协议。 将 `shadow-tls-password` 附加到任何代理声明以使用它。

例子：

```
[Proxy]
STLS-SNELL = snell, 1.2.3.4, 443, psk=pwd1, version=4, reuse=true, shadow-tls-password=pwd22
```

#### 参数

* `shadow-tls-password`：必需。 它必须与服务器的设置相匹配。
* `shadow-tls-sni`：可选。 SNI 将在 TLS 握手期间以明文形式发送到服务器。 如果未设置，则不会发送 SNI。