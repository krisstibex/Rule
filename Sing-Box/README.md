# 基于[Sub-Store](https://github.com/sub-store-org/Sub-Store)的[Sing-box](https://github.com/SagerNet/sing-box)配置生成器

## 简易教程
- 确保你已经正确安装Sub-Store
- 新添加一个“文件” 然后将下面的链接填入远程文件
```
https://raw.githubusercontent.com/xishang0128/sub-store-template/main/sing-box.json
```
- 并在脚本操作内加入
```
https://raw.githubusercontent.com/xishang0128/sub-store-template/main/sing-box.js#type=1&name=name
```
- type代表订阅格式 填入1为组合订阅 填入其他为单条订阅；name为订阅的“名称” 注意不是“显示名称”
- 此时保存即可预览配置 可在稍后同步到gist 方便其他设备使用

## 客制化你的策略组
将脚本操作改为
```
https://raw.githubusercontent.com/xream/scripts/main/surge/modules/sub-store-scripts/sing-box/template.js#name=SUB&outbound=🕳All🕳Hong Kong🏷ℹ️港|hk|hongkong|kong kong|🇭🇰🕳Taiwan🏷ℹ️台|tw|taiwan|🇹🇼🕳Japan🏷ℹ️日本|jp|东京|japan|🇯🇵🕳Singapore🏷ℹ️^(?!.*(?:us)).*(新|sg|singapore|🇸🇬)🕳USA🏷ℹ️美|unitedstates|united states|🇺🇸|洛杉矶
```
### 参数详解
- type为“组合订阅”时 会选用组合订阅 单条订阅不需要填写type参数
- name为单条订阅或组合订阅的名称 
- outbound 后的 🕳ℹ️all|all-auto 意为将订阅内的所有节点置于all和all-auto两个策略组中；🕳ℹ️hk|hk-auto🏷ℹ️港|hk|hongkong|hong kong|🇭🇰 意为将被“/港|hk|hongkong|kong kong|🇭🇰/i”正则匹配到的节点置于被“/hk|hk-auto/i”正则匹配到的策略组中 后面可以用相同格式匹配不同区域的节点
- outbound参数补充：一般以🕳开头 后跟匹配的策略组以及正则；正则前添加ℹ️意为忽略正则中的大小写；筛选策略组的正则与筛选组内节点之间的正则由🏷相连 不筛选节点则不需要添加
- 如果策略组内没有任何节点 将自动创建 COMPATIBLE(direct) 并插入 防止报错
- 可查看脚本日志了解脚本运行结果
- 详细说明请参考：https://t.me/cool_scripts/487

## 不是Sub-Store用户？
复制下面的Url并替换你的订阅链接
```
https://sub.sing.alone6713.eu.org/config/url=你的订阅链接&file=https://github.com/krisstibex/Rule/raw/main/Sing-Box/sing-box-template.json
```
- 需要保证订阅内包含港台美日新地区节点各至少一个
- 如果不放心也可以自己搭建[sing-box-subscribe](https://github.com/Toperlock/sing-box-subscribe)，请配合自己的域名使用 vercel.app 域名不保证联通性
- 更多使用方法请参考官方文档

## 其他
- 本订阅模版修改自 https://github.com/xishang0128/sub-store-template 在此向作者表示感谢
- Sing-Box相关文档 https://sing-box.sagernet.org 可修改sing-box.json来自定义自己的配置
- 策略组脚本作者为 https://github.com/xream 再次向作者表示感谢
- 规则集推荐 https://github.com/MetaCubeX/meta-rules-dat/tree/sing 也可自行编译 https://github.com/Toperlock/sing-box-geosite
