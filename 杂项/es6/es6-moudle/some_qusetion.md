### 1.模块中的变量在多个的实例之间否共享?

* 模块中的属性都局部属性，不会影响全局属性。
* 模块中顶级作用域this指向undefined，顶级函数内部的this指向module本身，
* 经测试，无论是ES6模块还是commonJs模块，共享是根据环境决定的，node中实现模块实例采用单例模式，内部设置的属性在不同实例间是共享的，

但是要注意，模块内部this的使用，eg：**对于属性value, 函数内value++和this.value++效果是不同的。**

* ES6模块和commonJs模块是根据引用值创建单例模式，重复引用同一个位置的同一个文件，只会创建一个模块实例。

### 2.如何使得ES6和CommonJs混用？

一般来说，最好不要这么做，但实际上混用也很简单

* ES6模块中使用CommonJs文件:

因为import可以直接加载CommonJs模块，但是只能整体加载，因为CommonJs模块返回的是一个对象。无法被ES6模块静态解析

```javascript
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```

* CommonJs模块中使用ES6模块

需要注意的是CommonJs是同步模块，而ES6是异步模块，所以引入的时候要注意转换

```javascript
(async () => {
  await import('./my-app.mjs');
})();
```

## 下列代码输出的原因

~~~javascript

var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();//[Function: b]

/*原因：
在非匿名自执行函数中，函数变量优先于外部变量申明，且函数变量是只读状态
可以使用严格模式验证，b=20操作将会报错。
*/
~~~
