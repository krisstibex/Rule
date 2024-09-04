# 组件

Surge包括几个组件。

### Surge代理服务器

这是Surge的核心部分。它是一个全功能的HTTP/SOCKS5代理服务器，具有很高的性能和稳定性，用Objective-C编写，并针对macOS和iOS进行了优化。

### Surge 虚拟网络接口 (Surge VIF)

一些应用程序不服从系统代理设置（如Mail.app），因为它们需要使用原始TCP套接字。这种流量可以由Surge VIF来处理。

Surge VIF在Surge iOS中是默认启用的。你可以通过打开增强模式在Surge Mac上启用Surge VIF。

这就是Surge iOS的架构：
![](../Surge-Architecture.png)


### Surge Dashboard (仅Mac版)
Surge Dashboard是一个图形用户界面，用于审查和检查请求和列出DNS缓存。它可以连接到本地Surge实例，或者在设置了外部控制器访问的情况下连接到远程实例。