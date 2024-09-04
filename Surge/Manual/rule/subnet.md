# 子网规则

### 子网表达式

子网表达式可以是以下的一种：
  - 使用`SSID:value`来匹配Wi-Fi SSID，允许使用通配符。
  - 使用`BSSID:value`来匹配Wi-Fi BSSID，允许使用通配符。
  - 使用`ROUTER:value`来匹配路由器的IP地址。
  - 使用`TYPE:WIFI`匹配所有Wi-Fi网络。
  - 使用`TYPE:WIRED`匹配所有有线网络。
  - 使用`TYPE:CELLULAR`来匹配所有蜂窝网络。
  - 如果没有提供前缀，它会尝试匹配SSID/BSSID/路由器的传统版本兼容性。



#### SUBNET

如果子网表达式匹配，则规则匹配。

```
SUBNET,TYPE:WIRED,DIRECT
SUBNET,SSID:MyHome,Proxy
```