# 子网设置

你可以使用[子网表达式](../rule/subnet.md)来匹配指定的网络并应用特定的设置。

> 由于兼容性原因。配置文件中的子网设置名称为[SSID Setting]。

### 暂停

在指定的网络下暂时暂停Surge。

```
[SSID Setting]
SSID:MyHome suspend=true
```

### 手机回退(仅iOS)

控制指定Wi-Fi网络的Wi-Fi辅助和混合网络行为。

```
[SSID Setting]
SSID:MyHome cellular-fallback=off
```

- cellular-fallback=default
  使用全局Wi-Fi辅助和混合网络设置。
- cellular-fallback=off
  关闭该网络的Wi-Fi辅助和混合网络。
- cellular-fallback=hybrid
  为该网络打开混合网络。
- cellular-fallback=wifi-assist
  打开网络的Wi-Fi辅助。

### TCP快速打开行为

```
[SSID Setting]
SSID:MyHome tfo-behaviour=force-enabled
```

- tfo-behaviour=auto
使用默认的TFO行为。
- tfo-behaviour=force-disabled
完全禁用网络的TFO。
- tfo-behaviour=force-enabled
强制启用网络的TFO。这个选项将使Surge忽略系统的TFO黑洞检测机制。

### DNS Override

覆盖指定网络的DNS设置。

```
[SSID Setting]
SSID:MyHome dns-server=8.8.8.8,encrypted-dns-server=https://1.1.1.1/
```

如果在全局DNS设置中配置了加密的DNS。你必须在下面明确输入关键词'off'，才能使用传统的DNS。

```
[SSID Setting]
SSID:MyHome dns-server=8.8.8.8,encrypted-dns-server=off
```