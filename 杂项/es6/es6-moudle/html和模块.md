Html 中使用ES6模块

* es6模块本身受限于同源策略的，默认会发起cors跨域请求,跨域请求仅仅支持http, data, chrome, chrome-extension, chrome-untrusted, https。**所以本地直接调用html引入module使用的是file协议，因此就会跨域，为了本地测试没有问题，需要启动本地服务器。**
* 传统脚本支持跨域。
* es6模块默认是defer加载，等到页面渲染完后才会执行脚本，
* es6模块具有范围性，不像传统脚本那样全局引入，因此，只能在当前的script标签下使用，即使在html标签纸直接使用函数也是不可以的。
