# Snell协议 

Snell是一个由我们团队开发的精简的加密代理协议。这里有一些亮点：

- 极高的性能。
- 支持UDP over TCP relay。
- 单一二进制，零依赖性。(除了glibc)
- 一个向导帮助你开始。
- 如果遇到错误，代理服务器会向客户端报告远程错误。客户端可以针对不同情况选择对策。

> Snell协议只为Surge用户准备。请不要对协议进行反向分析，并使其成为一个兼容的客户端。我们希望保持用户群尽可能的小，谢谢你的理解。

你可以从这里下载独立的服务器二进制文件：

https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-amd64.zip

https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-i386.zip

https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-aarch64.zip

https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-armv7l.zip


最新的版本是v4，它不像以前那样与以前的版本兼容。请同时升级客户端（Surge iOS & Surge Mac）和服务器二进制。

```
[Proxy]
Proxy = snell, 1.2.3.4, 6333, psk=RANDOM_KEY_HERE, version=4
```

## 发布说明

### v4.0.1

修正了一个UDP数据包不能转发到IPv6地址的错误。

## Surge Mac作为Snell代理服务器

你也可以使用Surge Mac作为Snell代理服务器（从3.1.0版本开始）。  在你的配置文件中添加以下几行。

```
[Snell Server]
interface = 0.0.0.0
port = 6160
psk = RANDOM_KEY_HERE
```

Surge中的嵌入式Snell服务器使用Snell V1协议。
