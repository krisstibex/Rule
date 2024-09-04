# HTTP API

从 Surge iOS 4.4.0 和 Surge Mac 4.0.0 开始。 您可以使用 HTTP API 来控制 Surge。

## 配置

```
[General]
http-api = examplekey@0.0.0.0:6171
```

## 验证

API 密钥必须填写在所有请求的“X-Key”标头中。

```
GET /v1/events
X-Key: examplekey
Accept: */*
```

## 基本约束

目前仅支持不带 TLS 的 HTTP。 Surge 仅使用 GET 和 POST 方法。

* 对于 GET 方法，您应该使用 URL 查询来发送参数。
* 对于 POST 方法，您应该使用 JSON body 发送参数。

Surge 总是会返回一个 JSON 正文作为响应。

## 路径

### 切换功能

* GET /v1/features/mitm
* POST /v1/features/mitm
* GET /v1/features/capture
* POST /v1/features/capture
* GET /v1/features/rewrite
* POST /v1/features/rewrite
* GET/v1/features/scripting
* POST /v1/features/scripting
* GET /v1/features/system_proxy（仅限 Surge Mac）
* POST /v1/features/system_proxy（仅限 Surge Mac）
* GET /v1/features/enhanced_mode（仅限 Surge Mac）
* POST /v1/features/enhanced_mode（仅限 Surge Mac）

使用 GET 方法获取功能的状态。

GET 响应示例：

```
{"enabled":true}
```

使用 POST 方法调整功能的状态。

POST请求示例：

```
{"enabled":true}
```

### 出站模式

* GET /v1/出站
* POST /v1/出站

使用GET获取出站方式，使用POST更改。

GET 响应示例：

```
{"mode":"rule"}
```
POST请求示例：

```
{"mode":"rule"}
```

可能的模式：直接、代理、规则

* GET /v1/outbound/global
* POST /v1/outbound/global

获取或更改全局出站模式的默认策略。

GET 响应示例：

```
{"policy":"ProxyA"}
```
POST请求示例：

```
{"policy":"ProxyB"}
```

### 代理政策

* 获取/v1/策略

列出所有政策。

* GET /v1/policies/detail?policy_name=ProxyNameHere

获取政策详情。

* POST /v1/策略/测试

使用 URL 测试策略。

请求示例：

```
{"policy_names": ["ProxyA", "ProxyB"], "url": "http://bing.com"}
```

* GET /v1/policy_groups

列出所有策略组及其选项。

* GET /v1/policy_groups/test_results

获取url-test/fallback/load-balance组的测试结果。

* GET /v1/policy_groups/select?group_name=GroupNameHere

获取选择组的选项。

响应示例：

```
{"policy": "ProxyA"}
```

* POST /v1/policy_groups/选择

更改选择组的选项。

请求示例：

```
{"group_name": "GroupA", "policy": "ProxyA"}
```

* POST /v1/policy_groups/测试

立即测试一组。

请求示例：

```
{"group_name": "GroupA"}
```

响应示例：

```
{
    "available": [
        "ProxyA",
        "ProxyB"
    ],
}
```

### 要求

* GET /v1/请求/最近

列出最近的请求。

* GET /v1/请求/活动

列出所有活动请求。

* POST /v1/请求/杀死

杀死一个活跃的请求。

请求示例：

```
{“id”：100}
```


### 个人资料

* GET /v1/profiles/current?sensitive=0

获取当前配置文件的文本内容。 如果 'sensitive' 为 false，所有密码字段将被屏蔽。

* POST /v1/配置文件/重新加载

立即执行配置文件重新加载。

* POST /v1/profiles/switch（仅限 Surge Mac）

请求示例：

```
{"name": "Profile2"}
```

切换到另一个配置文件。

* GET /v1/profiles（仅限 Surge Mac，从版本 4.0.6 开始）

获取所有可用的配置文件名称。

* POST /v1/profiles/check（仅限 Surge Mac，从版本 4.0.6 开始）

请求示例：

```
{"name": "Profile2"}
```

检查个人资料。 如果配置文件无效，将返回错误。 否则“错误”字段将为空。


### 域名解析

* POST /v1/dns/flush

刷新 DNS 缓存。

* 获取/v1/dns

获取当前的 DNS 缓存内容。

* POST /v1/test/dns_delay

测试 DNS 延迟。

## 模块

* 获取/v1/模块

列出可用和启用的模块。

响应示例：

```
{
    "enabled": [
        "router.com"
    ],
    "available": [
        "Game Console SNAT",
        "Google Home Devices",
        "router.com",
        "MitM All Hostnames"
    ]
}
```

* 发布/v1/模块

启用或禁用模块。

请求示例：

```
{
	"router.com": false,
	"Google Home Devices": true
}
```

### 脚本


* 获取/v1/脚本

列出所有脚本。

* POST /v1/脚本/评估

使用模拟环境评估脚本。

请求示例：

```
{
    "script_text": "The content of JS script",
    "mock_type": "cron",
    "timeout": 5
}
```

* POST /v1/scripting/cron/评估

立即评估 cron 脚本。

请求示例：

```
{
    "script_name": "script1",
}
```

### 设备管理（仅限 Surge Mac，从 v4.0.6 开始）

* 获取/v1/设备

获取当前活动和保存的设备列表。

* GET /v1/devices/icon?id={iconID}

获取设备图标。 您可以从 device.dhcpDevice.icon 中获取 iconID。

* POST /v1/设备

更改设备属性。 `physicalAddress` 字段是必需的。 您可以调整 `name`、`address` 和 `shouldHandledBySurge` 中的多个或一个属性。

请求示例：
```
{
	"physicalAddress":"F0:9F:C2:00:00:00",
	"name": "Computer",
	"address": "192.168.1.200",
	"shouldHandledBySurge": true
}
```

### 杂项

* 发布/v1/停止

关闭浪涌引擎。 如果在 Surge iOS 上启用了 Always On，Surge 引擎将重新启动。

* 获取/v1/事件

获取事件中心的内容。

* 获取/v1/规则

获取规则列表。

* 获取/v1/交通

获取路况信息。

* POST /v1/日志/级别

更改当前会话的日志级别。

请求示例：

```
{"level": "verbose"}
```