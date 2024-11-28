# 常用字段

- browser

  指定一个模块在浏览器环境下的替代版本,它的作用是是让打包工具知道在浏览器中如何替代某些 node.js 核心模块。比如`path`模块只能在`node`环境下使用，浏览器环境不支持，使用如下配置，可以让打包工具将`path`模块替换为`path-browserify`。

  这样可以提高构建的效率和兼容性。

  ```json
   "browser": {
        "path": "path-browserify"
    }
  ```
