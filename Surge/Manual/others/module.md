# 模块

模块是一组用于覆盖当前配置文件的设置。您可以使用模块来：

- 调整不可编辑配置文件中的设置，例如托管配置文件和企业配置文件。
- 一键更改部分设置。例如，您可以使用一个模块为所有主机名启用 MitM 并临时调整过滤器。
- 使用他人编写的模块来完成特定任务。例如，您的同事可能会与您共享一个将 API 请求重写到测试服务器的模块。
- 当您在设备之间共享一个配置文件时，某些设置可能需要针对不同的场景进行修改。模块的启用状态不会同步到其他设备，所以可以使用模块来实现。

### 基本概念

模块就像是当前配置文件的补丁。模块的设置比配置文件的设置具有更高的优先级。

有3种类型的模块：

- 内部模块：由 Surge 自行提供。
- 本地模块：.sgmodule 文件放置在配置文件目录中。
- 已安装的模块：使用 URL 安装的模块。

### 写一个模块

模块的语法与配置文件相同。您可以覆盖这些部分：

* 一般、副本、MITM
  * 覆盖：`key = value`
  * 附加到原始值：`key = %APPEND% value`
  * 在原值前面插入：`key = %INSERT% value`

您只能在 MITM 部分中操作“主机名”、“skip-server-cert-verify”和“tcp-connection”字段。


* 规则、脚本、URL 重写、标头重写、主机

新行将插入到原始内容的顶部。

模块中的规则只能使用内部策略：DIRECT、REJECT 和 REJECT-TINYGIF。

* 元数据

您可以在模块文件中添加元数据：

```
#!name=在这里命名
#!desc=此处描述
```

您可以将模块限制为指定平台。（可选）

```
#!system=mac
```

### 例子：

```
#!name=MitM 所有主机名
#!desc=对端口为 443 的所有主机名执行 MitM，Apple 和其他无法检查的常见站点除外。您仍然需要配置 CA 证书并启用 MitM 的主开关。

[MITM]
hostname = -*.apple.com, -*.icloud.com, -*.mzstatic.com, -*.crashlytics.com, -*.facebook.com, -*.instagram.com, *
```

```
#!name=游戏机SNAT
#!desc=让 Surge 正确处理 PlayStation、Xbox 和 Nintendo Switch 的 SNAT 对话。仅当 Surge Mac 作为这些设备的路由器时才有用。
#!system=mac
[Genera]
always-real-ip = %APPEND% *.srv.nintendo.net, *.stun.playstation.net, xbox.*.microsoft.com, *.xboxlive.com
```