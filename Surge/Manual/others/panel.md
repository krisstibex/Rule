# 信息小组

Surge iOS 4.9.3增加了一个实验性功能，使用户能够定制一个或多个信息面板，以显示相关信息。

要访问这个功能，用户需要有一个活跃的订阅，并在2021年9月22日之后到期。如果订阅过期，并且仍然配置有面板配置文件部分，那么面板将不会被显示，但不会影响其他功能的正常使用。
例如：

```
[Panel]
PanelA = title="Panel Title",content="Panel Content\nSecondLine",style=info
```

支持的样式参数有good, info, alert, error。

PanelA是信息面板的名称，这个参数将在脚本模式下传递给脚本。

### 静态模式

上述配置产生的面板是静态的，它可以与管理的配置文件或企业配置文件一起使用，在更新配置文件时更新面板内容，为终端用户提供操作指南。

### 动态模式

面板的内容可以通过脚本来更新。

```
[Panel]
PanelB = title="Panel Title",content="Panel Content\nSecondLine",style=info,script-name=panel

[Script]
panel = script-path=panel.js,type=generic
```

新版本还引入了通用类型的脚本。当用户点击刷新按钮时，该脚本将被评估，参数为

$input : {
    purpose: "panel"、
    position: "policy-selection"、
    panelName："PanelB"
},
$trigger："button" // 或 "auto-interva"

该脚本应该在$done()中返回标题、内容和样式字段。

在脚本第一次被评估之前，面板使用定义行中的静态内容。运行后，Surge会自动缓存最后一个脚本的返回结果，并在执行刷新前始终显示最后一个脚本的结果。

一个示例脚本：

```
$httpClient.get("https://api.my-ip.io/ip", function(error, response, data){
	$done({
		title: "External IP Address",
		content: data,
	});
});
```

此外，你可以指定 "更新-间隔 "参数，使面板自动更新。

```
[Panel]
PanelB = title="Panel Title",content="Panel Content\nSecondLine",style=info,script-name=panel,update-interval=6060
```

自动更新只发生在用户切换到策略选择视图时。所以你可以在这里指定一个小的时间（比如1）来使面板每次都自动更新。

## 更多定制
- 当样式字段没有被传递时，卡片将不显示图标，只显示文本。
- 当样式字段没有被传入时，可以传入图标字段，用任何有效的SF符号名称来定制图标，如bolt.horizontal.circle.fill
- 当使用图标字段时，传入icon-color字段来控制图标的颜色，其值是颜色的HEX代码。
