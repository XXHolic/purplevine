# purplevine
local music player

## 简要说明
没有考虑浏览器兼容性，所以尽量在 webkit 内核的浏览器新版本上查看。

后端使用的是 Node，用 Nginx 配置后本地静态服务器后，针对特定的请求转到 Node 开启的服务上。以下为示例。
Nginx
```
server {
  listen 6677;
  server_name localhost;
  # 指向本地代码的位置
  location / {
    root /xx/xx/purplevine/src;
    index index.html;
  }
  # 针对后台的请求转给 Node 开启的服务
  location /api {
    proxy_pass http://127.0.0.1:6000;
  }
}
```


音乐文件元数据的修改，目前使用的是支持 Python3 的 mutagen 库。

