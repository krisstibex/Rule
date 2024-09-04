# 策略组

一个策略组可以包含多个策略。它可以是一个代理策略，另一个策略组，或一个内置策略（DIRECT和REJECT）。

有几种组的类型：`select`, `url-test`, `fallback`, `load-balance`, 和`subnet`。政策组应该在[Proxy Group\]部分进行声明。

## 手动选择组

选择哪个策略将在用户界面上使用。

`SelectGroup = select, ProxyHTTP, ProxyHTTPS, DIRECT, REJECT`。

在Surge iOS中。你可以使用Today Widget来快速切换第一个 "选择 "组的策略。<br />在Surge Mac中。你可以在menubar菜单中切换策略。


## 自动测试组

通过对测试URL的延迟进行基准测试，自动选择将使用哪个策略。你可以在一般设置中改变测试URL，或者覆盖某个策略的测试URL。

`AutoTestGroup = url-test, ProxySOCKS5, ProxySOCKS5TLS`。

### 参数

#### interval：Optional, second （默认：600s\）。

间隔时间过后，基准结果将被丢弃。如果使用策略组，则会发生重新测试。

#### tolerance：可选的，millisecond（默认：100ms/）。

只有当新赢家的分数高于旧赢家的分数加上公差时，才会改变策略。

这个选项可以防止分数相似的策略不断交替出现。

#### timeout：Optional, second （默认：5s\）。

如果在超时时间内没有完成，就放弃一个策略。

## Fallback Group

通过优先级和可用性选择一个可用的策略。可用性是通过访问一个URL来测试的，就像一个自动URL测试组。前面定义的策略有很高的优先级。

`FallbackGroup = fallback, ProxySOCKS5, ProxySOCKS5TLS`。

### 参数

#### interval：Optional, s （默认：600s\）。

决定基准结果将被丢弃多长时间。

#### timeout：Optional, s （默认：5s\）。

如果一个策略在超时前没有完成，就放弃它。

## 负载平衡组

负载平衡组从可用的子政策中随机选择一个政策来使用。

### 参数

#### persistent：可选的

当persistent=true时，相同的策略将被用于相同的目标主机名。避免因出口IP不同而触发目标站点的风险控制。然而，当可用性改变时，可能会发生策略改变。


## 子网组

从Surge iOS 4.12.0 & Surge Mac 4.5.0开始。SSID组现在被重新命名为子网组。你可以使用 [subnet expression](../rule/subnet.md) 作为条件。

`子网组=子网，默认=ProxyHTTP，TYPE:WIFI=ProxyHTTP，SSID:MyHome=ProxySOCKS5`。

仍然支持SSID组的传统语法。你可以使用组类型关键字`subnet'或`ssid'来兼容。

### 参数

#### `default`：必须的

没有子网表达式匹配时的策略。

#### `cellular`：可选的（已废弃，使用`TYPE:CELLULAR`代替）。

蜂窝网络的策略。如果不提供，将使用默认策略。

## 外部组

一个策略组可以导入在外部文件中定义的策略，或者从一个URL中导入。

`egroup = select, policy-path=proxies.txt`。

这个文件包含一个策略列表，就像主配置文件中的定义行。

```
Proxy-A = https, example1.com, 443
Proxy-B = https, example2.com, 443
```

#### update-interval：可选的，第二次

如果路径是一个URL，则更新间隔。

#### policy-regex-filter：可选的

只使用与策略名称相吻合的重词的策略。

## 其他常用参数

#### no-alert

不显示该组的政策变化通知。

#### 隐藏

不在菜单（Surge Mac）和策略选择视图（Surge iOS）中显示该组。


## Policy Including

从Surge iOS 4.12.0和Surge Mac 4.5.0开始，你可以使用`include-all-proxy`和`include-other-group`来包括所有代理或重新使用另一组的定义。

#### includee-all-proxies

参数`include-all-proxies=true`包括所有在[Proxy]部分定义的代理策略，可以与`policy-regex-filter`参数一起使用，进行过滤。

#### include-other-group

参数`include-other-group="group1,group2"`包括另一个策略组的策略，并且可以包括由逗号分隔的多个策略组。它也可以与`policy-regex-filter`参数一起使用，用于过滤。

一些注意事项：
* `包括所有代理'、`包括其他组'和`政策路径'参数允许同时在一个政策组中使用。`policy-regex-filter`参数适用于所有三个参数。
* "包括其他组 "参数在策略组之间有一个优先顺序，但 "包括所有代理"、"包括其他组 "和 "政策路径 "参数之间没有优先顺序。对于子政策的顺序有意义的情况（例如，回退组），使用政策组与`include-other-group`嵌套。