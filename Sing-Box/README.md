# 基于[Sub-Store](https://github.com/sub-store-org/Sub-Store)的[Sing-box](https://github.com/SagerNet/sing-box)配置生成器

## 简易教程
### 确保你已经正确安装Sub-Store
### 新添加一个“文件” 然后将`https://raw.githubusercontent.com/xishang0128/sub-store-template/main/sing-box.json` 填入远程文件 并在脚本操作内加入`https://raw.githubusercontent.com/xishang0128/sub-store-template/main/sing-box.js#type=1&name=name`
### type代表订阅格式 填入1为组合订阅 填入其他为单条订阅；name为订阅的“名称” 注意不是“显示名称”
### 此时保存即可预览配置 可在稍后同步到gist 方便其他设备使用

## 客制化你的策略组
### 将脚本操作改为 `https://raw.githubusercontent.com/xream/scripts/main/surge/modules/sub-store-scripts/sing-box/template.js#type=组合订阅&name=机场&outbound=🕳ℹ️all|all-auto🕳ℹ️hk|hk-auto🏷ℹ️港|hk|hongkong|kong kong|🇭🇰`
### type为“组合订阅”时 会选用组合订阅 单条订阅不需要填写type参数
### name为单条订阅或组合订阅的名称 
### outbound 后的 🕳ℹ️all|all-auto 意为将订阅内的所有节点置于all和all-auto两个策略组中；🕳ℹ️hk|hk-auto🏷ℹ️港|hk|hongkong|kong kong|🇭🇰 意为将被“ℹ️港|hk|hongkong|kong kong|🇭🇰”正则匹配到的节点置于hk和hk-auto策略组中 后面可以用相同格式匹配不同区域的节点

## 其他
### 本订阅模版修改自 https://github.com/xishang0128/sub-store-template 在此向作者表示感谢
### Sing-Box相关文档 https://sing-box.sagernet.org 可配合修改sing-box.js内的地区正则来生成自己的配置
