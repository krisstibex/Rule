### dns

使用一个脚本作为DNS解析器。值域将被用作名称。

`dns dnspod script-path=dnspod.js`。

然后在[Host]部分添加一行：

```
[Host]
example.com = script:dnspod
*.example.com = script:dnspod
```

传入的参数是$domain。

脚本应该返回**个**，包括以下内容：

* `address<String>`：使用这个IP地址作为结果。它必须是一个有效的IPv4/IPv6地址的字符串。
* `addresses<Array>`：使用多个IP地址作为一个结果。
* `server<String>`：要求Surge通过指定的上游DNS服务器查询该域名。它必须是一个有效的IPv4/IPv6地址的字符串。
* `servers<Array>`：要求Surge通过多个指定的上游DNS服务器查询域名。

当返回`address<String>`或`addresses<Array>`时，也可以返回一个额外的'ttl'，以便将结果添加到缓存中，避免重复查询。单位是秒。

下面是一个例子，它使用 DNSPod 的公共 HTTP DNS API 作为 Surge 的解析器：

```
$httpClient.get('http://119.29.29.29/d?dn=' + $domain, function(error, response, data){
  if（error） {
    $done({}); // 返回到标准的DND查询。
  } else {
    $done({addresses: data.split('; '), ttl: 600})；
  }
});
```