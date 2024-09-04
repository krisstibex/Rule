## 突发事件iOS的URL方案

Surge iOS支持4个动作和一个选项。

行动：

* surge:///start

  用选定的配置开始。
  
* surge:///stop

  停止当前会话。
  
* surge:///toggle

  用选定的配置开始或停止。
  
* surge:///install-config?url=x

  安装一个URL形式的配置。该URL应以百分比编码。

选项：

* autoclose=true

  动作完成后自动关闭Surge。(不能与install-config一起使用)

  例如：surge:///toggle?autoclose=true
  
  
## x-callback-url

Surge从v3.4开始支持x-callback-url规范。URL方案是 "surge"，可用的动作是 "开始"、"停止 "和 "切换"。