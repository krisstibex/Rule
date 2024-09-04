# 杂项规则

#### DEST-PORT

如果请求的目标端口匹配，则规则匹配。

```
DEST-PORT,80,DIRECT
```

#### SRC-IP

如果请求的客户端IP地址匹配，则规则匹配。只适用于远程机器。

```
SRC-IP,192.168.20.100,DIRECT
```


#### IN-PORT

如果请求的传入端口匹配，则规则匹配。在Surge监听多个端口时很有用。

```
in-port,6152,direct
```


#### PROTOCOL

如果请求的协议匹配，则规则匹配。可能的值是HTTP, HTTPS, TCP, UDP, DOH, DOH3, DOQ。

```
PROTOCOL,HTTP,DIRECT
```

#### SCRIPT

使用一个Javascript脚本来确定是否匹配。

```
SCRIPT,ScriptName,DIRECT
```


#### CELLULAR-RADIO (仅限iOS)

如果当前网络的蜂窝状无线电技术符合，则规则匹配。可能的值是GPRS, Edge, WCDMA, HSDPA, HSUPA, CDMA1x, CDMAEVDORev0, CDMAEVDORevA, CDMAEVDORevB, eHRPD, HRPD, LTE, NRNSA, NR

```
CELLULAR-RADIO,LTE,DIRECT
```


#### CELLULAR-CARRIER (仅限iOS)

如果当前网络的蜂窝电话运营商匹配，则规则匹配。该值应该是MCC-MNC代码风格。

```
CELLULAR-CARRIER,289-67,DIRECT
```