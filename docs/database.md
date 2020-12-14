# database

## 数据库设计
根据上面功能描述，涉及的表有：user-用户表、project-项目表、issues-异常表、setting-用户设置表、log-日志

### user

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
name | CHAR | 用户名 | 否 | 是
nickname | CHAR | 昵称 | 否 | 否
password | VARCHAR |  密码 | 否 | 是
email | CHAR | 邮箱 | 否 | 是
createTime | DATETIME | 创建时间 | 否 | 是

name、email 需要建=检验唯一性，目前可作为登录的用户名。

### project

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
name | CHAR | 项目名称 | 否 | 是
createTime | DATETIME | 创建时间 | 否 | 是
ownerId | INT | 所属人 id | 否 | 是
setting | TEXT | 项目相关设置 JSON 字符串 | 否 | 是
updateTime | DATETIME | 更新时间 | 否 | 是

其中 ownerId 为外键

### issue

字段 | 数据类型 | 功能描述 | 主键 | 非空
--- | --- | --- | --- | ---
id | INT | 序号 | 是 | 是
message | CHAR |  主要错误信息 | 否 | 是
message | LONGTEXT | 接收数据具体内容信息 | 否 | 否
projectId | INT | 所属项目 id | 否 | 是
ownerId | INT | 处理人 id | 否 | 是
status | CHAR |  异常装填 | 否 | 是
level | CHAR |  级别 | 否 | 是
lifeCycle | Arr | 生命周期 | 否 | 否
createTime | DATETIME | 创建时间 | 否 | 是
updateTime | DATETIME | 更新时间 | 否 | 是

其中 projectId、ownerId 为外键

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
