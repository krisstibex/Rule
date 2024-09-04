### 策略组

使用一个脚本作为一个策略组。值字段将被用作名称。

`policy-group jsgroup script-path=group.js`。

然后在[Proxy Group]部分添加一行：

```
[Proxy Group］
sgroup = script, policyA, policyB, policyC, script-name=jsgroup
```

传入的参数是$policyNames<Array>，它是一个可用策略名称的数组。

脚本应该像这样返回一个策略名称：{selected："policy-name"}