### 规则

使用一个脚本作为规则。值域将被用作名称。

`rule ssid-rule script-path=ssid-rule.js`。

然后在[规则]部分添加一行：

`SCRIPT,sid-rule,DIRECT`。

脚本应该返回一个属性为'match'<Boolean>的对象，表示是否匹配。

传入的参数是

* `$request.hostname<String>`。
* `$request.destPort<Number>`。
* `$request.processPath<String>`。
* `$request.userAgent<String>`。
* `$request.url<String>`。
* `$request.sourceIP<String>`。
* `$request.listenPort<Number>`。
* `$request.dnsResult<Object>`。

默认情况下，SCRIPT规则不会触发DNS查询。你可以使用'request-resolve'选项来改变它。

`SCRIPT,sid-rule,DIRECT,requires-resolve`。

DNS结果呈现在$request.dnsResult中。

一个简单的例子：

```
var hostnameMatched = ($request.hostname =='home.com')；
var ssidMatched = ($network.wifi.sid =='My Home')；

$done({matched: (hostnameMatched && ssidMatched)})；
```