# 搭建企业级 docker 仓库

## Docker Registry 存在的问题

虽然 Docker Registry 是一个非常有用的工具，但在使用过程中可能会遇到一些常见的问题和挑战。

1. 缺乏认证和权限控制

   默认情况下，Docker Registry 并没有启用任何认证或权限控制，这意味着任何人都可以将镜像推送到你的私有仓库，也可以从中拉取镜像。这在公共或企业环境中可能导致安全风险。

2. 没有内置的 Web UI

   Docker Registry 本身没有内置的用户界面，这使得用户难以浏览仓库中的镜像、查看镜像的标签或管理镜像。

3. 镜像垃圾回收

   Docker Registry 默认不会自动删除不再使用的镜像，导致磁盘空间可能会迅速耗尽。长期运行的私有仓库中，旧的或未使用的镜像会占用大量存储空间。

4. HTTP 使用导致的不安全传输

   默认情况下，Docker Registry 使用 HTTP 进行通信，这可能导致敏感数据（如镜像）被窃取。尤其是在多主机环境中，未经加密的 HTTP 通信容易受到中间人攻击。

等等问题，虽然上述问题都有单独的解决方案，但是 docker 私有仓库工具已经集成解决了上述问题，这里我们使用 Harbor 进行 docker 私有仓库的搭建

## Harbor 搭建私有仓库

Harbor 推荐使用 docker-compose 管理容器，确保安装了 docker-compose

1. 安装前提条件

   ```linux
   # 存在docker
   docker --version
   # 存在docker-compose
   docker-compose --version
   ```

2. 下载 Harbor 压缩包并解压

   ```linux
   # 下载压缩包
   wget https://github.com/goharbor/harbor/releases/download/v2.8.0/harbor-online-installer-v2.8.0.tgz
   # 解压
   tar -zxvf harbor-online-installer-v2.8.0.tgz
   ```

3. 修改配置文件

   ```linux
   cd harbor
   cp harbor.yml.tmpl  harbor.yml
   vim harbor.yml
   ```

   - `hostname`设置为 Harbor 服务器主机名或者 IP 地址

     ```yaml
     hostname: your.harbor.domain
     ```

   - http 和 https 配置：
     默认是启用 https，你可以在配置中设置证书路径。如果你只想使用 http，可以取消 https 配置，启用 http 监听。

     ```yaml
     http:
       port: 80
     # https:
     #   port: 443
     #   certificate: /path/to/your/cert
     #   private_key: /path/to/your/key
     ```

   - harbor_admin_password: 设置管理员的初始密码：

     ```yaml
     harbor_admin_password: YourStrongPassword
     ```

4. 执行脚本安装并启动 Harbor，Harbor 会拉取所需的 Docker 镜像并启动相应的服务。安装完成后，你可以通过浏览器访问 `http://<Harbor 服务器主机名>`：

   ```linux
      sudo ./prepare
      sudo ./install.sh
   ```

5. 登录并使用 Harbor,默认账户 `admin`,密码为 harbor.yml 中设置的 `harbor_admin_password`内容

6. 创建项目
   在 Harbor 中，你可以创建不同的项目（即镜像库）。每个项目可以设置公开或私有。

## 修改 harbor 配置并重启 harbor

1. 修改配置文件

   ```linux
   cd harbor
   vim harbor.yml
   ```

2. 每次修改 harbor.yml 文件后，需要执行以下命令更新 harbor 的 compose 文件后，重启 harbor 才能生效

   ```linux
   ./prepare
   sudo docker-compose down
   sudo docker-compose up -d
   ```

## 上传镜像

1. 假设本地已经存在镜像 `hello-world`,Harbor 中存在项目`conaco-test`,Harbor 仓库地址为`http://harbor.com`
2. 登录 docker 私有仓库

   ```linux
      docker login harbor.com
   ```

3. 对镜像进行 tag 标记

   ```linux
    docker tag hello-world:latest harbor.com/conaco-test/hello-world:latest
   ```

4. 推送镜像到仓库

   ```linux
   docker push harbor.com/conaco-test/hello-world:latest
   ```

## 下载镜像

1. 拉取镜像

   ```linux
   docker pull harbor.com/conaco-test/hello-world:latest
   ```

## 卸载 harbor

```linux
cd /etc/harbor
# 停用harbor容器
sudo docker-compose down
# 删除所有与 Harbor 相关的容器
sudo docker rm $(sudo docker ps -a -q --filter "name=harbor")
# 删除所有与 Harbor 相关的镜像
sudo docker rmi $(sudo docker images -q --filter "reference=harbor*")
# 删除文件
sudo rm -rf /etc/harbor
```
