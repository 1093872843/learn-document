# 搭建私有 docker 仓库

Docker Registry 是 Docker 官方提供的私有仓库，简单易用，适合小型团队或个人项目。

## 搭建 docker 仓库

搭建 Docker 私有仓库（Registry）可以通过官方的 Docker Registry 镜像来实现。

1. 确保 [docker 已安装](/docker/1安装.md)
2. 安装

   ```linux
       docker pull registry:2
       docker run -d -p 5000:5000 --name registry registry:2
   ```

3. 此时已经创建完成，可以访问 `http://<主机 ip>:5000/v2/_catalog` 查看已经上传的镜像

## 上传镜像

1. 假设本地已经存在镜像 `hello-world`
2. 对镜像进行 tag 标记

   ```linux
    docker tag hello-world:latest localhost:5000/hello-world:latest
   ```

3. 推送镜像到仓库

   ```linux
   docker push localhost:5000/hello-world:latest
   ```

## 下载镜像

1. 拉取镜像

   ```linux
   docker pull localhost:5000/hello-world:latest
   ```
