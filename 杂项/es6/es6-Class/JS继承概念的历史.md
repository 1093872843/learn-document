# 传统的类

虽然ES6出来了Class取代了传统的继承模式，但是就目前来看，ES6的类仅仅是封装了ES5的构造函数加原型继承的语法糖。

我们看看之前如何继承。

这里假设我们需要一个方法，能够让我们产出我们指定属性内容的对象，仅仅是值得不同，我们会怎么做? 如下

### 如何创建一个制造对象的函数。

```javascript
function createPerson(name,age){
  let o = new Object();
  o.name = name;
  o.age = age
  o.getName = function (){
    return this.name;
  }
  return o;
}

let p = createPerson("wang",18)
console.log(p);//{ name: 'wang', age: 18, getName: [Function] }
```

这种方式的确可以解决创建了多个类似对象的问题，但是有个缺陷，返回的对象都是Object，这样我们就不能通过实例明确知道这个对象具体是一个什么类型的抽象。

### 构造函数模式

`构造函数模式`：ES中用来创建指定类型对象的方式。

`构造函数`：ES中凡是通过new 使用的函数，都能够被称作构造函数，否则是普通函数。

`构造器（constructor）`：由构造函数创建的每个实例都有一个constructor属性指向它的**创建函数**。下面的例子是Person。

每个创建的实例都是新建的，完全独立的，即a.getName!=b.getName;

~~~javascript
//上述内容可以修改为下
/*
相比之前的代码，你可能会产生少许疑惑
this: js的this指代当前作用域，并且是随着上下文范围改变的。当我们使用new 时，构造模式会返回一个
      实例对象,这时this的指向其实是这个实例对象本身.
new Object():在构造函数模式下，new 操作的创建了一个对象，所以我们就不需要显示创建了。new操作也会执行构造、函数内部的操  
             作，比如给新对象添加属性。如果函数内部没有任何代码，则返回空对象。


*/
function Person(name,age){
    this.name=name;
    this.age=age;
    this.getName=function (){
      return this.name
    }
}

let p = new Person("wang",18);
console.log(p);//Person { name: 'wang', age: 18, getName: [Function] }
console.log(p.constructor); //[Function: Person]
console.log(Person==p.constructor); //true
console.log(p instanceof Person); //true
console.log(p instanceof Object); //true

~~~

### 原型模式

`原型（prototype）`：每个**函数**都会创建一个prototype属性，这个属性是一个对象，即我们常说的原型。原型的特性在于，内部的所有属性和方法可以被实例共享,所以我们原本应当写在函数中的内容，也可以通过操作这个对象（原型）来实现。

~~~javascript
let person =function() {
  this.name="wang";
}

let a = new person();
console.log(a)  //person { name: 'wang' }
console.log(person.prototype);// person {}
~~~

原型内部也有一个`constructor`属性，指回与之关联的构造函数。

!!!!!!!!!!!!!!!!!!注意：!!!!!!!!!!!!!!!!

而通过原型新增的属性数据是共享的，是共享的，共享的，一个实例修改会影响其他实例。

我们之前说过，通过构造函数创建的实例是完全独立的，这就意味着每一次创建都会重新定义一边函数中的所有内容。这对于内部属性来说自然没什么问题。但是对于构造函数中的函数来说，就显得没那么必要了，反而会有点消耗性能。

那么我们只需要将函数定义使用原型模式创建即可。

`__proto__`: prototype是函数上指向原型的关键字，而__proto__是对象指向原型的关键字。即`p.__proto__ == Person.prototype`；实际上ES并没有这个__proto__的标准，但是FireFox,Safari和Chrome都暴露了这个属性,如果没有，则可以通过Object.getPrototyOf()获取原型。每次自定义构造函数并且创建实例时，实例内部的__proto__的属性被赋值为构造函数的prototype。

```javascript
function Person(name){
  this.name = name;
  this.getName=function (){
     return this.name;
  }
}
//可以修改为
function Person(){} //let Person = function(){}; 也成立
Person.prototype.name = "wang";
Person.prototype.getName = function (){
     return this.name;
  }

let p = new Person();
console.log(p);//{}
console.log(p.name);//wang
console.log(p.getName());//wang


//但这么写有点麻烦，还要一行一行的改，我们可以这样
function Person(){} 
Person.prototype = {
  name:"wang",
  getName:function (){
    return this.name;
  },
  //constructor:Person
}
/*但是这种写法会覆盖构造函数默认创建的Person.prototype，这会导致默认Person.prototype中的constructor的指向消失。
当然我们可以手动加上,不过constructor在枚举中属于不可枚举，而这个操作会导致它变为可枚举。
如果我们通过ES6兼容的浏览器，那可以加上以下代码解决这个问题*/
Object.defineProperty(Person.prototype,"constructor",{
  enumerable:false,
  value:Person
})


//原型链关系
console.log(Person.prototype);//Person { name: 'wang', getName: [Function] }
console.log(Person.prototype == p.__proto__);//true
console.log(Person.prototype.__proto__ == Object.prototype);//true
console.log(Person.prototype.__proto__);//{}
console.log(Person.prototype.__proto__ == p.__proto__.__proto__);//ture
//这样一层一层向上查找原型其实就是我们所说的原型链。
//instanceOf 实际上就是检查原型链中是否存在指定构造函数的原型。

```

`__proto__`: prototype是函数上指向原型的关键字，而__proto__是对象指向原型的关键字。

即`p.__proto__ == Person.prototype`；实际上ES并没有这个__proto__的标准，但是FireFox,Safari和Chrome都暴露了这个属性,如果没有，则可以通过Object.getPrototyOf()获取原型。每次自定义构造函数并且创建实例时，实例内部的__proto__的属性被赋值为构造函数的prototype。

~~~javascript
function Person(name){
  this.name = name;
  this.getName=function (){
     return this.name;
  }
}
let p = new Person();

//原型链关系
console.log(Person.prototype);//Person { name: 'wang', getName: [Function] }
console.log(Person.prototype == p.__proto__);//true
console.log(Person.prototype.__proto__ == Object.prototype);//true
console.log(Person.prototype.__proto__);//{}
console.log(Person.prototype.__proto__ == p.__proto__.__proto__);//ture
//这样一层一层向上查找原型其实就是我们所说的原型链。
//instanceOf 实际上就是检查原型链中是否存在指定构造函数原型。
~~~

## 继承

所谓继承，本质上是修改构造函数A的原型为另一个函数B的原型，并通过其他手段，完善所有属性和方法的继承，使得通过A的实例既能访问A的内容，又能访问B的内容。

但是js的继承和Java的类不同，它主要关注的是继承能够实现的数据传递和共享功能，而不是和java那样实现一个类的引用类型继承。组合式和寄生时组合继承最贴近Java的类继承

##### 组合式继承

~~~javascript
//原理: 原型链+盗用构造函数，实现了完整的继承
function Father(name) {
  this.name = name;
  this.fatherParams = "我是父亲的元素"
  this.say = function () {
    console.log("father "+this.name);
  }
  
}

function Son(name) {
  Father.call(this, name)//必须放在首位，以免同名属性覆盖子属性
  this.sonParams = "我是儿子的元素"
  this.say = function () {
    console.log("son "+this.name);
  }
}

Son.prototype = new Father();
Son.prototype.addF = function () {
  console.log("为儿子新增方法");
}

let sonPer = new Son("wang");
console.log(sonPer);
sonPer.say()//判断儿子是否遮蔽父亲同名方法且是否继承了父亲的构造函数参数
delete sonPer.say;sonPer.say()//判断父亲的同名方法是否在儿子原型上0
console.log(sonPer.fatherParams); //判断儿子是否继承父亲属性
console.log(sonPer.sonParams); //判断儿子属性是否正常
sonPer.addF()//儿子是否正常新增方法

~~~

原型式继承

~~~javascript
//只继承了原型，不继承构造函数属性。
//这种继承主要用于共享数据。
let person={
  name:"hi",
  friend:["a","b","v"],
}

let aPerson = Object.create(person);
aPerson.friend.push("aa");
let bPerson = Object.create(person);
bPerson.friend.push("bb");

console.log(bPerson.friend);
~~~

寄生式继承

~~~javascript
//主要关注功能的增强，原型继承反而不是必须的，
let person={
  name:"hi",
  friend:["a","b","v"],
}

function createAnthor(orignal){
  let clone = Object.create(orignal);
  clone.sayHi= function (){
    console.log("增强函数");
  };
  return clone
}

let newPerson = createAnthor(person)
newPerson.sayHi();
~~~

寄生式组合继承

~~~javascript
//解决了组合继承的效率问题，组合继承的父类构造函数始终会被调用两次。
//盗用构造函数+寄生式继承
//重写原型，补完原型constructor，
function Father(name) {
  this.name = name;
  this.fatherParams = "我是父亲的元素"
  this.say = function () {
    console.log(this.constructor);
  }
  
}

function Son(name) {
  Father.call(this, name)//必须放在首位，以免同名属性覆盖子属性
  this.sonParams = "我是儿子的元素"

}
function extendfunc(subFun,superFun){
    let clone = Object.create(superFun.prototype);
    clone.constructor = subFun;
    subFun.prototy = clone;
}

extendfunc(Son,Father);
let son = new Son("wang")
son.say();
~~~

`原型层级：`在通过对象访问属性时，访问会开始于对象实例本身，如果这个实例上存在给定属性，则返回对应的值，如果不存在，则在原型对象上查找值。这也是原型用于在多个实例间共享属性和方法的原理。

当实例和原型存在同名属性时，根据上述的访问规律，实例中的属性`遮蔽`原型中的属性，只返回示例中的属性。不过可以通过`delete`操作符可以删除实例上的属性。`hasOwnProperty()`会确定某个属性是来自实例，还是来自原型。

# ES6新增Class

#### 声明

~~~javascript
//类定义,类定义属于块作用域限制，类似let
//类本身是一个特殊的函数，console.log((typeof Person) == "function");
class Person{
}

//表达式声明
const Animal = class {};

//和普遍的表达式声明一样，如果类表达式声明，声明会被提升，但是类声明，则不会提升。
//这里我理解的声明和ES6文档上的不一致，类表达式声明和类声明
console.log(Person);//Cannot access 'Person' before initialization
class Person{}
console.log(Person);
//------------分割线----------------------
console.log(Person);//undefined
var Person = class {}
console.log(Person);//[class person]
~~~

#### 构成

类的构成包括构造函数方法，实例方法，获取函数，设置函数和静态类方法，但是这些都不必须的

~~~javascript
class Foo{
   
    //#[属性]为私有属性，外部禁止访问
    #name="wang"

    /*如果想实现共享属性，那么可以在constructor中使用 Person.prototype.[属性]
    并且添加相应的getter和setter*/

   //构造函数，当使用new操作上时，本质上时调用这个函数进行实例化。
   //constructor内部定义的属性和方法 在实例上独立。
   //例外的是，类块中定义的属性，即使不在constructor内部，也属于实例属性。

  constructor(){
    this.age=18;
     this.nickName = ["1","2","3"]
   }

  //在类块中定义的方法，，建立在原型prototype上，在实例之间共享。
//setter和getter除外
   getAge(){
        return this.age;
    }

  //类方法等同于对象属性，因此可以使用表达式
  //get [synbolKey]()
  //get ["computed"+ "key"](){}
   get name(){}
   set name(){}


  //每个类上面只能有一个，不要求必须通过实例或者原型调用，可以直接通过类调用
  //非常适合做实例工厂，
   static myQux(){}

   //返回生成器方法
   //使得该类创建的实例可以使用for of 方法去遍历this.nickName
  *[Symbol.iterator](){
      yield *this.nickName.entries();
  }
   //返回迭代器
    [Symbol.iterator](){
      return  this.nickName.entries();
  }
}
~~~

类-构造函数

本质上依旧是构造函数，但是必须通过new 去调用。

> 实际执行的过程。
>
> * 在内存中创建一个对象。
> * 新对象的内部的[[Prototype]]指针被赋值为构造函数的prototype。
> * 构造函数内部的this被复制为这个新对象。
> * 执行构造函数内部的代码。
> * 如果函数返回非空对象，则返回对象(注意此时返回的对象并不是类实例)，否则返回新建的对象this。

### ES6继承

ES6支持单继承，不支持接口实现，使用extends关键字，可以继承任何拥有[[Construct]]和原型的对象。这意味着类也可以继承普通的构造函数。

~~~javascript
class B{}//或者 function B(){}
class A extends B{
   //A的实现,
//如果实现了constructor()，就必须写上super或者返回一个指定对象,
/如果不实现constructor，js会自动实现并调用super
    constructor(){
       super()
    }
}

//使用super关键字可以调用超类的内容，eg:
//super() === super,constructor()
//super.[方法]();
~~~

抽象基类

虽然ES6不支持接口实现，但是可以通过手段达到这样的效果。

`new.target`: 该关键字在类中使用，new.target可以判断当前类是通过new 哪个具体类实现的。

~~~javascript
class Person {
  constructor(){
      console.log(new.target);
      if (new.target == Person) {
          throw new Error("Person不能被直接初始化，他是个抽象基类")
      }
      //要求必须事先某个方法，因为在子类实例化之前，Person内部已经有了原型，可以通过this访问
      if (!this.foo) {
        throw new Error("必须实现foo方法")
      }
  }
}

~~~
