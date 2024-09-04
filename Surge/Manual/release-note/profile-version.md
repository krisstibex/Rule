# 简介版本

从Surge iOS 4.9.3 & Surge Mac 4.2.2开始。配置文件现在支持版本注释，以便更好地向后兼容。

比如说：
```
[Script]
panel = script-path=panel.js,type=generic 
```

旧版本的Surge不支持通用类型的脚本声明。那么这一行就会发生一个配置文件解析错误。

```
[Script]
#!PROFILE-VERSION-REQUIRED 10 panel = script-path=panel.js,type=generic 
```

通过添加配置文件版本要求的前缀，旧版本将把这一行视为注释而忽略它。

*请注意，该功能是针对配置文件的分发，如管理配置文件和企业配置文件。当配置文件被用户界面修改时，所有的版本注释将被删除。

## 配置文件版本变更说明

### 版本 0 (所有版本低于Surge iOS 4.9.3 & Surge Mac 4.2.2)

### 版本10 (从Surge iOS 4.9.3 & Surge Mac 4.2.2开始)

- 支持脚本类型 "通用"。
- 支持新的部分[面板]。(这不需要配置文件的版本要求，因为一个未知的部分不会被解析。)

### 版本11 (从Surge iOS 4.11.0 & Surge Mac 4.4.0开始)

- 支持WireGuard策略。