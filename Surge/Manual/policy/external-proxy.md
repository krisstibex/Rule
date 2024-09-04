# 外部代理

Surge Mac支持外部代理策略，这使得Surge可以更容易地与其他代理软件一起工作。

下面是一个ssh的例子。

首先，策略的关键词类型是 "外部"。

```
[Proxy]
external = external, exec = "/usr/bin/ssh", args = "11.22.33.44", args = "-D", args = "127.0.0.1:1080", local-port = 1080, addresses = 11.22.33.44
```

`args`和`addresses`参数是可选的，`exec`和`local-port`是必须的。`args`和`addresses`字段可以重复使用，用于追加。

Surge将做以下工作。

1.当使用该策略时，Surge会用exec和args参数启动外部进程，随后将请求转发给SOCKS5 127.0.0.1:[local-port]。

2.如果外部进程被终止，在使用该策略时，它将自动重新启动。

3.当增强模式开启时，Surge自动将地址参数中的地址从VIF路由中排除。(所以请在此栏中填写代理服务器的IP地址。不支持主机名和域名）。

4.Surge对于来自外部进程的请求总是使用DIRECT策略。(为了处理像obfs-local这样的插件程序，外部进程的子程序也被类似地处理)

5.当Surge退出时，自动关闭所有的外部进程，并在增强模式关闭时自动清理路由表项目。

一些注意事项：

1.上述3和4的功能是重叠的，请使用地址声明排除VIF处理，这样可以减少处理开销，4的功能是为了额外保护。

2.外部进程的stdout和stderr被重定向到/tmp/Surge-External-xxxxxx.log，以便排除故障。

3.由于外部进程可能需要一点时间来启动。如果在转发127.0.0.1:[local-port]时遇到连接拒绝错误，Surge会在500ms后自动重试，每个请求最多重试6次。

4.Surge iOS将被视为外部策略为REJECT，因为它不被支持。