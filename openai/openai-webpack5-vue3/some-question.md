## @vue/compiler-sfc, vue-template-compiler, vue-loader-plugin

- vue-template-compiler
    </br> 此软件包可用于将Vue 2.0模板预编译为渲染函数，以避免运行时编译开销和CSP限制。需要独立安装依赖，在大多数情况下，应该与vue-loader一起使用它，只有当您编写具有非常特定需求的构建工具时，才需要单独使用它。
- @vue/compiler-sfc
  </br>在 Vue 3.x 中，模板编译的方式发生了变化，不需要安装预编译模板vue-template-compiler，而是引入新的编译器@vue/compiler-sfc 提供了一种更灵活的方法来处理 Vue 单文件组件中的模板。它允许你在运行时编译和解析模板， 3.2.13+后，@vue/compiler-sfc被内置到vue核心依赖中。
- VueLoaderPlugin
  </br>VueLoaderPlugin 插件是必须的，但是不用额外安装，vue-loader内置，他的职责是将其他定义的loader规则复制应用到.vue文件里相应语言的块。

  ```js
  const { VueLoaderPlugin } = require('vue-loader')
  ```
  