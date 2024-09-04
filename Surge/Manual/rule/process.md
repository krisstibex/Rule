# 流进程规则

你可以为一个指定的进程指定一个策略。进程规则仅适用于Surge Mac，Surge iOS忽略了这些规则。

#### PROCESS-NAME

```
PROCESS-NAME,Telegram,Proxy
```

如果请求的进程名称匹配，则规则匹配。支持通配符*和?。

> 你可以指定文件名或可执行文件的完整路径。对于macOS应用程序包，它的路径是.app/Contents/MacOS。