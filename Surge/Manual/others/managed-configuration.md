# 管理配置

Surge可以从一个URL自动更新一个配置文件。如果配置的开头是

`#！MANAGED-CONFIG http://test.com/surge.conf interval=60 strict=true`。

配置只能在Surge主程序运行时被更新。

> 注意：远程的新配置也应该包含#!MANAGED-CONFIG一行。否则，该配置将成为一个普通的配置。

### 参数
   
#### interval：可选，s（默认：86400s）。
决定多长时间更新一次配置。

#### strict：true或false（默认值：false）。

如果strict为true，Surge将要求在间隔时间到达后进行强制更新。否则，如果更新失败，用户仍然可以使用过期的配置。

> 注意：即使严格为真，用户仍然可以通过小工具或设置中的VPN开关启动Surge。