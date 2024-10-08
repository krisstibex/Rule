# Surge概述

Surge是一个为开发者设计的网络开发和代理工具，因此需要专业的知识来使用。

Surge的核心工作流程包括四个主要功能：

* 接管：Surge允许用户接管设备所发送的网络连接。同时支持代理服务和虚拟网卡的接管。

* 处理：该软件使用户能够修改已被接管的网络请求和响应。这包括URL重定向、本地文件映射、使用JavaScript的自定义修改，以及许多其他方法。

* 转发：网络请求，一旦被接管，用户可以转发到其他代理服务器。转发可以是全局的，也可以使用灵活的规则系统来确定出站策略。

* 拦截：来自网络请求和响应的特定数据可以被拦截并由用户保存。此外，用户还可以用MITM解密HTTPS流量。

## 功能

* 高性能、稳定性和效率：Surge可以利用最小的系统资源，以工业级的稳定性平稳地处理所有网络流量。
* 灵活的规则系统：你可以根据域名、IP CIDR、GeoIP等编写转发规则。Surge可以自动代理请求到其他使用HTTP/HTTPS/SOCKS5/SOCKS5-TLS/Shadowosocks协议的服务器。
* HTTPS解密：  通过中间人攻击解密HTTPS流量。证书生成器将帮助你生成一个由你的操作系统信任的CA证书，用于调试。
* 本地DNS映射：Surge支持本地定制的DNS映射。它的多种功能模块，包括通配符、别名和自定义DNS服务器，将能够满足各种需求。
* 代理人组：你可以把几个代理归类为一个组，并根据分组情况采用相应的策略。代理人组可以配置为Auto Speed Test（根据基准URL访问速度选择策略），SSID（根据Wi-Fi SSID选择策略），以及手动选择。
* HTTP重写：您可以使用自定义规则将HTTP/HTTPS请求重写到另一个URL，或者阻止这些请求；
* 远程仪表板：Surge Dashboard可以通过USB或网络连接到远程Surge iOS或Surge Mac实例。
* 完全支持IPv6：所有功能都在IPv6环境下工作。


### Surge Mac独家功能

* 增强模式：Surge可以设置一个虚拟的网络接口来处理所有的网络流量，用于那些没有明确支持网络代理的应用程序。
* 计量的网络模式：你可以控制哪些应用程序/进程被允许访问互联网，这在计量连接（如蜂窝网络）上很有用。
* 网关模式：Surge Mac可以被配置为第三层网关，为同一网络中的其他设备处理网络流量。


### Surge iOS独家功能

* 所有功能都在蜂窝网络上工作。
* 捕获来自你设备上任何应用程序的所有HTTP/HTTPS/TCP流量，并按照高度可配置的规则重定向到HTTP/HTTPS/SOCKS5/Shadowosocks代理服务器，即使该应用程序不遵循系统代理设置。
* 即使在蜂窝网络上也能覆盖系统DNS设置，并通过同时查询所有DNS服务器提高性能。
* 通过Wi-Fi或USB电缆将Surge Dashboard连接到Surge iOS，监测和分析iOS设备的网络请求。当通过USB电缆连接时，你甚至可以检查蜂窝网络请求。

### 了解Surge

我们已经出版了一本官方指南，帮助你了解Surge。

* 英文版本：https://manual.nssurge.com/book/understanding-surge/en/

* 中文版本：https://manual.nssurge.com/book/understanding-surge/cn/