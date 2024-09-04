# [General] 部分中的其他选项

由于选项经常更改，您可以在应用程序中查找有关 [常规] 部分选项的最新说明。

- Surge Mac：主窗口菜单 -> 帮助 -> 配置文件语法
- Surge iOS：更多选项卡 -> 帮助 -> 配置文件语法


```
[General]
ipv6 = false
loglevel = notify
skip-proxy = 127.0.0.1, 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, 100.64.0.0/10, localhost, *.local
tun-excluded-routes = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12
tun-included-routes = 192.168.1.12/32
```

### 日志级别

日志级别。 详细、信息、通知或警告之一。 不建议在日常使用中启用详细，因为这会显着降低性能。

### ipv6

启用完整的 IPv6 支持。


### ipv6-vif

通过 Surge VIF 允许 IPv6。 当您希望 Surge 处理连接到 IPv6 地址的原始 TCP 连接时很有用。

- `off`：永远不要使用 IPv6 设置 Surge VIF。
- `auto`：如果本地网络具有有效的 IPv6 网络，则仅使用 IPv6 设置 Surge VIF。
- `always`：始终使用 IPv6 设置 Surge VIF。

### dns 服务器

上游 DNS 服务器的 IP 地址。

### 跳过代理

在 iOS 版本中，此选项强制连接到这些域/IP 范围由 Surge VIF 而不是 Surge 代理处理。 在 macOS 版本中，当启用“设置为系统代理”时，这些设置将应用于系统。 此选项用于修复某些应用程序的兼容性问题。

   - 要指定单个域，请输入域名 - 例如，apple.com。

   - 要指定域中的所有网站，请在域名前使用星号 - 例如，\*apple.com。

   - 要指定域的特定部分，请指定每个部分 - 例如，store.apple.com。

   - 要通过 IP 地址指定主机或网络，请输入特定的 IP 地址，例如 192.168.2.11 或地址范围，例如 192.168.2.\* 或 192.168.2.0/24。

注意：如果输入 IP 地址或地址范围，则只有在使用该地址连接到该主机时才能绕过代理，而不能通过解析为该地址的域名连接到主机时绕过代理。

### 排除简单主机名

就像 skip-proxy 参数一样。 此选项允许请求使用由 Surge VIF 而不是 Surge 代理处理的简单主机名（没有点）。

### 外部控制器访问

此选项允许外部控制器控制 Surge，例如 Surge Dashboard (macOS) 和 Surge iOS Remote Controller (iOS)。 例如：key@0.0.0.0:6165

### http-api

此选项允许使用 HTTP API 来控制 Surge。 例如：key@0.0.0.0:6166

### http-api-tls

使用 HTTPS 协议而不是 HTTP。 必须首先配置 MitM CA 证书。 您需要在客户端设备上手动安装证书。

### http-api-web-dashboard

启用后，您可以通过网络浏览器控制 Surge。

### show-error-page-for-reject

如果请求是纯 HTTP 请求，则显示 REJECT 策略的错误网页。

### tun-excluded-routes

Surge VIF 只能处理 TCP 和 UDP 协议。 使用此选项绕过特定 IP 范围以允许所有流量通过。

注意：此选项仅适用于 Surge VIF。 由 Surge Proxy Server 处理的请求不受影响。 结合“skip-proxy”和“tun-excluded-routes”以确保特定的 HTTP 流量绕过 Surge。

### tun-included-routes

默认情况下，Surge VIF 接口将自己声明为默认路由。 但是，由于 Wi-Fi 接口的路由较小，部分流量可能不会通过 Surge VIF 接口。 使用此选项可添加较小的路线。

### internet-test-url

Internet 连接测试的 URL。 此外，还有 DIRECT 策略的测试 URL。

### proxy-test-url

代理策略的默认测试 URL。

### 测试超时

连通性测试超时。

### always-real-ip

当 Surge VIF 处理 DNS 问题时，此选项要求 Surge 返回真实的 IP 地址而不是虚假的 IP 地址。

DNS 数据包将被转发到上游 DNS 服务器。

### hijack-dns

默认情况下，Surge 只会为发送到 Surge DNS 地址 (198.18.0.2) 的 DNS 查询返回假 IP 地址。 发送到标准 DNS 的查询将被转发。

某些设备或软件总是使用硬编码的 DNS 服务器。 （例如，Google Speakers 始终使用 8.8.8.8）。 您可以使用此选项来劫持查询以获取虚假地址。

您可以使用 `hijack-dns = \*:53` 来劫持所有 DNS 查询。

### force-http-engine-hosts

让 Surge 将 TCP 连接视为 HTTP 请求。 Surge HTTP 引擎将处理请求，所有高级功能都将可用，例如捕获、重写和脚本。

通配符 \* 和 ? 得到支持。

   - 使用前缀 - 排除主机名。

   - 默认情况下，只有对端口 80 的请求被解密。

   - 使用后缀：端口允许其他端口。

   - 使用后缀：0 允许所有端口。

例子：

   - -\*.apple.com：排除在端口 80 上发送到 \*.apple.com 的所有请求。

   - www.google.com：对 www.g 使用强制 HTTP 处理80 端口上的 oogle.com。

   - www.google.com:8080：在端口 8080 上对 www.google.com 使用强制 HTTP 处理。

   - www.google.com:0：在所有端口上对 www.google.com 使用强制 HTTP 处理。

   - \*:0：对所有端口上的所有主机名使用强制 HTTP 处理。

### debug-cpu-usage

启用 CPU 调试模式。 这可能会降低性能。

### debug-memory-usage

启用内存调试模式。 这可能会降低性能。

### doh-follow-outbound-mode

默认情况下，DOH 查找使用直接出站。 启用该选项会使 DOH 遵循出站模式设置和规则。

### doh server

DNS-over-HTTPS 服务器的 URL。

### use-local-host-item-for-proxy

默认情况下，如果使用代理策略，则始终在远程服务器上执行 DNS 查找。 启用此选项后，如果目标域的本地 DNS 映射结果存在，Surge 将使用 IP 地址而不是域来建立代理连接。

### geoip-maxmind-url

用于更新的 GeoIP 数据库的 URL。

### disable-geoip-db-自动更新

禁用 GeoIP 数据库的自动更新。

### allow-dns-svcb

iOS 系统可能会执行 SVCB 记录 DNS 查找，而不是标准的 A 记录查找。 这会导致 Surge 无法返回虚拟 IP 地址。 所以默认禁止SVCB记录查找，强制系统进行A记录查找。

### udp-policy-not-supported-behaviour

UDP 流量匹配不支持 UDP 中继的策略时的回退行为。 可能的值：直接、拒绝。

### proxy-test-udp

### 兼容模式（仅限 iOS）

### allow-wifi-access（仅限 iOS）

允许 LAN 中的其他设备访问 Surge 代理服务。

### wifi-access-http-端口（仅限 iOS）

Surge HTTP 代理服务的端口号。

### wifi-access-socks5-port（仅限 iOS）

Surge SOCKS5 代理服务的端口号。

### wifi-access-http-auth（仅限 iOS）

要求对 Surge HTTP 代理服务进行身份验证。 例如：用户名：密码

### include-all-networks（仅限 iOS）

默认情况下，某些请求可能不会被 Surge 接管。 例如，应用程序可以绑定到物理网络接口以绕过 Surge VIF。 启用 Include All Networks 选项以确保所有请求都由 Surge 处理而不会泄漏。 当您将 Surge 用作防火墙时，此选项很有用。 (需要 iOS 14.0 或以上版本)

启用此选项可能会导致 AirDrop 和 Xcode 调试问题、通过 USB 的 Surge Dashboard 无法正常工作以及其他意外副作用。 谨慎使用。

### include-local-networks（仅限 iOS）

启用此选项可使 Surge VIF 处理发送到 LAN 的请求。 (需要 iOS 14.2 或以上版本)

启用此选项可能会导致 AirDrop 和 Xcode 调试问题、通过 USB 的 Surge Dashboard 无法正常工作以及其他意外副作用。 谨慎使用。

### wifi-assist（仅限 iOS）

启用wifi助理

### hide-vpn-icon（仅限 iOS）

隐藏状态栏中的 VPN 图标。

### all-hybrid（仅限 iOS）


### allow-hotspot-access（仅限 iOS）

在个人热点打开时允许从其他设备访问 Surge 代理服务。

### use-default-policy-if-wifi-not-primary（仅限 macOS）

如果禁用，即使 Wi-Fi 不是主要网络接口，SSID/BSSID 模式仍然可以匹配。

### read-etc-hosts（仅限 macOS）

遵循 /etc/hosts 中的本地 DNS 映射项。

### http-listen（仅限 macOS）

HTTP 代理服务监听参数。 例如：0.0.0.0:6152

### socks5-listen（仅限 macOS）

SOCKS5 代理服务监听参数。 例如：0.0.0.0:6153