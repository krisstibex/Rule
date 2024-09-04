### 事件

在指定的事件发生时评估一个脚本。其值是事件的名称。目前只支持一个事件：network-changed。

请调用$done()来完成。


#### 事件类型

- `network-changed`：当系统网络发生变化时触发。

```
// network-changed = script-path=network-changed.js,type=event,event-name=network-changed

$notification.post('DNS Update', $network.dns.join(', '))；

$done()；
```

- `notification`：当Surge显示一个通知时被触发。即使通知的类别是关闭的，脚本仍然可以得到消息。

```
// notification = script-path=notification.js,type=event,event-name=notification

console.log($event.data)；

$done()；
```