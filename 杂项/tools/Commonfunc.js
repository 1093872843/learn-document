/*
 * @Author: your name
 * @Date: 2021-05-07 10:00:03
 * @LastEditTime: 2021-05-13 14:38:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\plugin\Commonfunc.js
 */
/**
 * @description: 节流,n秒内只会延迟执行一次
 * @param {*} func
 * @param {*} intervalTime
 * @return {*}
 */
function throttle(func, intervalTime) {
    let timer = null
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                func(this, arguments);
                clearTimeout(timer);
                timer = null;
            }, intervalTime)
        }
    }
}


/**
 * @description: 防抖,n秒内只会延迟执行一次，多次触发会刷新时间
 * @param {*} func
 * @param {*} intervalTime
 * @return {*}
 */
function debounce(func, intervalTime) {
    let timer = null
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, intervalTime)
    }
}


/**
 * @description: 日期格式化
 * @param {*} date
 * @param {*} format
 * @return {*}
 */
function formatDate(date, format) {

}

/**
 * @description: 深度拷贝 ,包括基础类型，数组,时间，Set,Map,普通{},
 * @param {*} obj
 * @return {*}
 */
function deepCopy(obj) {
    let result = null;
    if (obj != null && obj != undefined && typeof obj == "object") {
        //判断对象是否为引用类型
        if (typeof obj[Symbol.iterator] == "function") {
            //判断对象是否是可迭代对象,for of 可以遍历所有的迭代类型，他走的实际上是Symbol.iterator的实现。
            //Array（数组）, String（字符串）, Map（映射）, Set（集合）,TypedArray(类型化数组)、arguments、NodeList对象、Generator等可迭代的数据结构等
            //{}不是迭代类型
            if (obj instanceof Set) {
                result = new Set();
                for (item of obj) {
                    result.add(deepCopy(item));
                }
            } else if (obj instanceof Array) {
                result = [];
                for (item of obj) {
                    result.push(deepCopy(item));
                }
            } else if (obj instanceof Map) {
                result = new Map();
                for (item of obj) {
                    result.set(item[0], deepCopy(item[1]));
                }
            }
            else {
                throw new Error("包含无法处理的对象" + obj)
            }
        } else if (obj.__proto__ == Date.prototype) {
            //判断对象是否是时间
            result = new Date(obj.valueOf());
        } else {
            //类型是{}
            result = {}
            for (key in obj) {
                //for in 实际上是对对象的属性枚举，并不是一个真正的迭代
                result[key] = deepCopy(obj[key]);
            }
        }
    } else {
        result = obj;
    }
    return result;
}

/**
 * @description:  
 * @param {*} 指定对象或基础类型，结果为null或者undefined或者Nan 必返回 false
 * @param {*} 指定类型，字符串
 * @return {*} 
 */
function isType(obj, type) {
    if ((typeof type) == "string") {
        if (obj == null || obj == undefined || obj == NaN) return false
        if (Object.prototype.toString.call(obj) === `[object ${type.replace(/^\S/, s => s.toUpperCase())}]`) {
            return true;
        } else {
            return false;
        }
    } else {
        console.error("err function isType() : type must be String");
    }

}

/**
 * @description: [] {} "" NaN undefined Null 为空， 0不为空。
 * @param {*} obj
 * @return {*}
 */
function isEmity(obj) {
    let result = false;
    if (obj == null || obj == undefined || obj == NaN) return true
    if (typeof (obj[Symbol.iterator]) == "function" && (obj.length == 0 || obj.size == 0)) {
        return true
    } else {
        for (const key in obj) {
            result = false;
            break;
        }
    }
    return result;
}


/**
 * @description:切面函数，可以直接加载到原型上，让所有函数调用。
 * @param {*}
 * @return {*}
 */
 function aopElapsedTime() {
    /* 一下代码并不会返回，只会在控制台输出，除非调试，否则不建议在正式环境中使用。
     const sign = func.name+new Date().getTime();
     console.time(sign)  //开始
     func();
     console.timeEnd(sign) //结束
    */
    //正式代码
    const startTime = new Date().getTime();
    let result = this(...arguments);
    const endTime = new Date().getTime();
    return [result, endTime - startTime];
    //调用方式
    //Function.prototype.aopElapsedTime = aopElapsedTime;
    //fun.aopElapsedTime();
}

/**
 * @description: 休眠函数
 * @param {*} time/ms
 * @return {*}
 */
function sleep(time){
    //原理时利用setTimeOut函数和Promise的异步回调特性；
    //当time延时过后，返回Promise回调
    return Promise(resolve=>{setTimeout(resolve,time)});

    //使用方式
    // async function sleepAsync() {
    //     console.log('fuck the code')
    //     await sleep(1000)
    //     console.log('fuck the code again')
    //   }
}