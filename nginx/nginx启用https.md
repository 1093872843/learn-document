# 申请并启用 HTTPS

## 获取 SSL 证书

- 阿里云购买免费 SSL 证书（方式一）

  1. 进入 SSL 证书管理。
  2. 点击立即购买，购买个人测试证书并填写相关信息。
  3. 购买个人测试证书后，点击创建证书，填写相关信息。
  4. 等待 CA 中心的验证签发我们创建的证书。

- 利用 Let's Encrypt 获取免费证书（方式二）

  TODO

## nginx 启用 https

- 安装 SSL 证书至服务器（Nginx Web 服务器）

  1. 证书通过 CA 中心验证成功后，下载 Nginx 服务器类型的证书并将其上传到我们需要启用的服务器并解压,这里我们上传至目录`/etc/nginx/cert`，可以获得以下两个文件`conaco.cn.key`和`conaco.cn.pem`
  2. 根据 nginx 的配置推荐，进入`/etc/nginx/sites-available`并创建文件`conaco.cn`,编辑内容如下

     ```HOCON

      server {
         listen 80;
         server_name conaco.cn;
         return 301 https://$host$request_uri;  # 强制重定向到 HTTPS
      }
      server {
         #HTTPS的默认访问端口443。
         #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
         listen 443 ssl;
         #填写证书绑定的域名
         server_name conaco.cn;
         #填写证书文件绝对路径
         ssl_certificate /etc/nginx/cert/conaco.cn.pem;
         #填写证书私钥文件绝对路径
         ssl_certificate_key /etc/nginx/cert/conaco.cn.key;
         ssl_session_cache shared:SSL:1m;
         ssl_session_timeout 5m;
         #自定义设置使用的TLS协议的类型以及加密套件（以下为配置示例，请您自行评估是否需要配置）
         #TLS协议版本越高，HTTPS通信的安全性越高，但是相较于低版本TLS协议，高版本TLS协议对浏览器的兼容性较差。
         ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
         ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
         #表示优先使用服务端加密套件。默认开启
         ssl_prefer_server_ciphers on;

         location / {
               root html;
               index index.html index.htm;
         }
      }

     ```

  3. 执行将配置文件软连接到`/etc/nginx/sites-enabled`启动配置。

     `ln -s /etc/nginx/sites-available/conaco.cn /etc/nginx/sites-enabled/conaco.cn`

  4. 重启 nginx 使配置生效。

     `nginx -s reload`

## SSL 证书自动续期

TODO
