# 内置策略

有几个内置策略，其中最重要的是DIRECT和REJECT。DIRECT表示请求应该被直接发送到主机，而REJECT表示请求应该被拒绝。

### 内置策略

#### DIRECT

直接向主机发送请求。

#### REJECT

拒绝请求并在连接类型为HTTP时返回一个错误页面。(这个行为可以由show-error-page-for-reject参数控制）。

#### REJECT-DROP

拒绝该请求。与REJECT不同，这个策略将默默地丢弃连接。因为有些应用程序有非常暴力的重试逻辑，它们会在连接失败后立即重试，导致请求的风暴。

#### REJECT-NO-DROP

如果在很短的时间内，对一个主机名的大量请求触发了REJECT/REJECT-TINYGIF策略（当前版本的阈值是30秒内10次），Surge会自动将该策略升级为REJECT-DROP，以避免浪费大量的资源。

你可以使用REJECT-NO-DROP策略来避免这种行为。

#### REJECT-TINYGIF

当连接类型为HTTP时，拒绝该请求并返回一个错误页面。(这个行为可以通过show-error-page-for-reject参数来控制）。

#### CELLULAR (仅限iOS)

优先使用蜂窝网络而不是Wi-Fi网络。

#### CELLULAR-ONLY (仅限iOS)

只使用蜂窝网络。如果蜂窝网络不可用，则失败。

#### HYBRID (仅限iOS)

尝试同时建立与Wi-Fi和蜂窝网络的连接。只有在所有混合选项未打开时才有意义。

#### NO-HYBRID (仅限iOS)

如果有Wi-Fi可用，不要尝试建立与蜂窝网络的连接。只有在启用了All Hybrid或Wi-Fi Assist选项时才有意义。

### 别名

内置策略可以直接在规则和策略组中使用。你也可以在代理部分定义一个别名。

```
[Proxy]
On = direct
Off = reject
```

然后你可以在规则和策略组中使用'On'和'Off'作为策略名称。