# v 1.0.0
## 引子
基于 [Error Tracking Product][url-blog-error-tracking] 的分析，开始进行第一个版本相关功能说明。

## 功能概述
第一版的主要是打通一个基本的使用流程，包含管理端和用户端。

### 管理端
- 登录模块
- 项目模块
- 异常模块
- 设置模块

### 用户端
- 异常收集上报

## 管理端
### 登录模块
管理端需要账号和密码登录才能使用，暂不支持注册，只支持管理员邀请的邮箱账号登录，邀请时会生成初始默认密码。

每一个账号都有权限区分，目前简单分为管理员和成员两种角色。所拥有的详细权限暂不细分。

### 项目模块
异常聚合的一个维度，每一个异常必须要有一个所属的项目。初次进入系统时，目前默认会初始化一个项目。

可以新建项目，新建时必填的字段有：
- 项目名称
- 平台

### 异常模块
所有异常展示的地方，以列表的形式展示，展示的字段有：
- 错误信息：展示主要的错误信息。
- 所属项目：所属项目名称。
- 环境：线上和测试，根据上报规则可能会调整。
- 所属人：下拉选择框，所有的成员可选。
- 状态：激活、解决、延期，根据上报规则可能会调整。
- 级别：根据上报规则可能会调整。

列表支持搜索，目前只提供所属项目搜索，支持分页，列表显示的顺序是按时间，最新的异常靠前。

### 设置模块
设置模块分为用户个人设置和所拥有的项目设置，目前暂定所有的项目只能是管理员角色才能创建，项目的创建者才有项目相关的设置。
个人设置先不做，先做项目的设置。项目的设置，暂只做邀请成员。

## 数据库设计
根据上面功能描述，涉及的表有：user-用户表、project-项目表、issues-异常表、setting-用户设置表

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



[url-blog-error-tracking]:https://github.com/XXHolic/blog/blob/master/draft/n.Error%20Tracking%20Product.n.md#index