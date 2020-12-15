# database

## v1.0.0 数据库设计
涉及的表有：project-项目表、issues-异常表、issueDetail-异常详情表

### project
项目表

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
name | CHAR | 项目名称 | 否 | 是
createTime | DATETIME | 创建时间 | 否 | 是
creatorId | INT | 创建人 id | 否 | 否
platform | INTEXT | 平台 | 否 | 是
updateTime | DATETIME | 更新时间 | 否 | 是

其中 creatorId 为外键

### issue
异常表

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
eventId | String | 前端自己生成的 uuid | 否 | 否
message | CHAR |  主要错误信息 | 否 | 是
projectId | INT | 所属项目 id | 否 | 是
ownerId | INT | 处理人 id | 否 | 否
status | CHAR |  异常状态 | 否 | 是
count | INT |  事件总数 | 否 | 否
createTime | DATETIME | 创建时间 | 否 | 是
updateTime | DATETIME | 更新时间 | 否 | 是

其中 projectId、ownerId 为外键

### issueDetail
异常详情表

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
eventId | String | 前端自己生成的 uuid | 否 | 否
exception | String | 异常所有信息 | 否 | 否
location | Object | 页面位置信息 | 否 | 否
timeStamp | Arr | 前端传的时间戳 | 否 | 否
sdk | Arr | 使用插件版本信息 | 否 | 否
request | Object | http 请求相关信息 | 否 | 否
networkType | Object | （小程序）请求相关信息 | 否 | 否
currentPage | Object | （小程序）当前页面路径信息 | 否 | 否
lifeCycle | Arr | 生命周期 | 否 | 否
createTime | DATETIME | 创建时间 | 否 | 是


## v1.1.0 数据库设计
涉及的表有：user-用户表、setting-用户设置表、log-日志
### user
用户表

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
name | CHAR | 用户名 | 否 | 是
nickname | CHAR | 昵称 | 否 | 否
password | VARCHAR |  密码 | 否 | 是
email | CHAR | 邮箱 | 否 | 是
createTime | DATETIME | 创建时间 | 否 | 是

name、email 需要建=检验唯一性，目前可作为登录的用户名。

### setting

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
userId | INT |  用户 id | 否 | 是
setting | TEXT | 用户设置 json 字符串 | 否 | 否
updateTime | DATETIME | 创建时间 | 否 | 是

### log
记录每个用户的操作，在异常详情里面会显示一个异常生命周期，操作都存在这个表里面


字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
issueId | INT |  异常 id | 否 | 否
userId | INT |  用户 id | 否 | 是
name | TEXT | 用户名 | 否 | 是
operateType | TEXT |  操作类型 | 否 | 否
operateDescription | TEXT | 操作描述 | 否 | 否
updateTime | DATETIME | 创建时间 | 否 | 是

其中 issueId、userId 为外键

- [Best practices for building secure API Keys](https://ramesh-lingappan.medium.com/best-practices-for-building-api-keys-97c26eabfea9)
- [How to Improve the Security of API Keys](https://hackernoon.com/improve-the-security-of-api-keys-v5kp3wdu)
- [API Key Best Practices](https://developers.google.com/maps/api-key-best-practices)
- [API Keys: API Authentication Methods & Examples](https://stoplight.io/blog/api-keys-best-practices-to-authenticate-apis/)
- [API Keys ≠ Security: Why API Keys Are Not Enough](https://nordicapis.com/why-api-keys-are-not-enough/)
