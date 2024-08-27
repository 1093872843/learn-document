- "@babel/core": "^7.22.10",
- "@babel/eslint-parser": "^7.22.10",
- "@babel/preset-env": "^7.22.10",
- "babel-loader": "^9.1.3",

- "css-loader": "^6.8.1",
     用于处理 CSS 文件中的 @import 和 url() 导入。它能够将这些导入解析为模块，并生成一个包含解析后 CSS 代码的JavaScript 模块

- "style-loader": "^3.3.3",
    用于将 JavaScript 中的 CSS 模块转换为内联的 style 标签，然后插入到 HTML 文档的 head 部分

- "eslint": "^8.47.0",
   eslint核心内容，只能识别检查js，jsx代码

- "eslint-config-prettier"
    用于关闭那些与 Prettier 冲突的 ESLint 规则，以确保代码格式化后仍然保持一致

- "eslint-plugin-prettier"
    将prettier的校验规则应用于eslint进行代码检查，eslint规则只校验代码正确性。

- "eslint-plugin-vue": "^9.17.0",
    eslint插件，帮助识别检查和规范vue文件

- "eslint-webpack-plugin": "^4.0.1",
    使得webpack在构建过程中运行eslint插件,检查和识别代码问题

- "html-webpack-plugin": "^5.5.3",
  将webpack生成的bundle.js文件自动插入html中

- "husky": "^8.0.3",
  git钩子,对git操作提供钩子处理

- "lint-staged": "^14.0.0",
    对git暂存区的文件进行脚本操作，通常与husky一起使用

- "prettier": "^3.0.2",
    prettier核心

- "prettier-webpack-plugin": "^1.2.0",
  使得prettier在webpack构建过程中可以检查和识别代码

- "sass": "^1.64.2",
  sass核心内容

- "sass-loader": "^13.3.2",
  帮助webpack解析sass文件

- "vue": "^3.3.4",
    vue核心文件

- "vue-loader": "^17.2.2",
   帮助webpack正确解析vue文件转化为js，css,html模块

- "webpack": "^5.88.2",
  webpack核心文件

- "webpack-cli": "^5.1.4",
    提供了在终端中运行 Webpack 命令的能力

- "webpack-dev-server": "^4.15.1",
    提供了一个基于Express的本地开发服务器，进行实时预览和调试程序，监听文件变化并自动重新编译。

- "webpack-merge": "^5.9.0"
   webpack多坏境配置融合工具
