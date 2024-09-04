# 本地 DNS 映射

Surge 支持本地自定义 DNS 映射。 它相当于 /etc/hosts，但具有更强大的功能，包括通配符、别名和分配 DNS 服务器。

```
[Host]
abc.com = 1.2.3.4
*.dev = 6.7.8.9
foo.com = bar.com
bar.com = server:8.8.8.8
```

## 通配符

您可以使用 \* 前缀通配所有子域。 请注意，Surge 使用简单的字符串匹配。 例如，\*google.com 将匹配 google.com、foo.google.com 和 bargoogle.com。 \*.google.com 将**不**匹配 google.com。

```
[Host]
*.dev = 6.7.8.9
```

## 别名

它就像一个 CNAME 记录。

```
[Host]
foo.com = bar.com
```

## 分配 DNS 服务器

您可以将指定的 DNS 服务器分配给一个或多个域。

```
[Host]
bar.com = server:8.8.8.8
```

由于 Surge 有自己的 DNS 客户端实现，一些主机名可能无法解析。 您可以使用“server:system”让系统处理查找。

```
[Host]
Macbook = server:system
```

默认情况下，系统将解析所有后缀为“.local”的主机名。


## 即使是代理也使用本地 DNS 项

```
[General]
use-local-host-item-for-proxy=true
```

默认情况下，DNS 解析总是发生在远程代理服务器上，因为 Surge 总是发送带有域的代理请求。

启用此选项后，对于匹配本地 DNS 映射记录的请求，Surge 将使用本地 IP 地址而不是原始域发送代理请求。

它仅适用于使用 IP 地址的本地 DNS 映射记录。