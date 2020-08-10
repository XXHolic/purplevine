# v 1.0.0
## 引子
基于 [Error Tracking Product][url-blog-error-tracking] 的分析，开始进行第一个版本相关功能说明。

## 功能概述


### 数据库设计
数据库表：log

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
time | DATETIME | 接收时时间 | 否 | 是
ip | CHAR | 接收的请求 IP | 否 | 否
message | LONGTEXT | 接收数据具体内容信息 | 否 | 否



[url-blog-error-tracking]:https://github.com/XXHolic/blog/blob/master/draft/n.Error%20Tracking%20Product.n.md#index