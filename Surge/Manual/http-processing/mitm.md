# HTTPS 解密（中间人攻击，MitM）

Surge 可能会通过 MitM 解密 HTTPS 流量。请参阅 [维基百科文章](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) 了解更多信息。

证书生成器可以帮助您生成一个新的CA证书用于调试，并使该证书被系统信任。它在 Surge Dashboard（Mac 版）和 Surge iOS Config Editor 中可用。此证书在本地生成，仅保存在您的配置文件和系统钥匙串中。新证书的密钥是使用 OpenSSL 随机生成的。

您还可以使用现有的 CA 证书。使用密码将证书导出为 PKCS#12 格式 (.p12)。请注意，由于系统限制，密码不能为空。使用“base64”命令在 base64 字符串中进行编码，并将下面的这些设置附加到您的配置文件中。


```
[MITM]
enable = true
ca-p12 = MIIJtQ.........
ca-passphrase = password
hostname = *google.com
h2 = true
```

Surge 仅解密到此处声明的主机的流量。

- 通配符 * 和 ?得到支持。
- 使用前缀 - 排除主机名。
- 默认情况下，只有对端口 443 的请求被解密。
  - 使用后缀 :port 允许其他端口。
  - 使用后缀 :0 允许所有端口。

例子：
- `-*.apple.com`：排除在端口 443 上发送到 *.apple.com 的所有请求。
- `www.google.com`：允许 www.google.com 在端口 443 上使用 MitM。
- `www.google.com:8080`：允许在端口 8080 上对 www.google.com 进行中间人攻击。
- `www.google.com:0`：允许在所有端口上对 www.google.com 使用 MitM。
- `*:0`：允许所有端口上的所有主机名使用 MitM。

一般的配置可能是这样的：

`hostname = -*.apple.com, -*.icloud.com, *`

> 某些应用程序具有使用固定证书或 CA 的严格安全策略。启用对这些主机的解密可能会导致问题。


## 选项

### tcp 连接

默认情况下，只有通过 Surge HTTP 代理的连接才会被 MITM 解密。启用该选项以告知 Surge 在通过 Surge VIF（增强模式）的原始 TCP 连接上执行 MITM。请注意，您仍然需要填写列表中的主机名。

### 跳过服务器证书验证

执行 MITM 时不要验证远程主机的证书。

### h2

MITM over HTTP/2：使用 MITM over HTTP/2 协议解密 HTTPS 流量，可以提高并发请求的性能。

### 客户端源地址

使用此参数仅在某些设备上启用 MITM 功能。

  - 这是一个使用逗号作为分隔符的列表参数。
  - 您可以指定单个 IP 地址或使用 CIDR 块。支持 IPv4 和 IPv6。
  - 您可以使用“-”前缀来排除某些客户端，例如，“client-source-address = -192.168.1.2, 0.0.0.0/0”
  - 如果未设置该参数，则为所有客户端启用 MITM。相当于 `client-source-address = 0.0.0.0/0, ::/0`
  - 如果您想为当前设备启用 MITM，则应包含“127.0.0.1”。