/*
 * @Author: your name
 * @Date: 2021-05-08 17:54:31
 * @LastEditTime: 2021-05-13 14:48:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html\数据结构和设计模式\数组.js
 */


//数组扁平化
let arrayFlatten = function (value) {
    let value = [[1, "nihao", 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

    function funcOne(value) {
        let result = value.toString();
        return result;
    }

    function funcTwo(value) {
        let result = value.flat(Infinity);
        return result;
    }

    function funcThree(value) {
        function flatten(arr) {
            while (arr.some(item => Array.isArray(item))) {
                arr = [].concat(...arr);
            }
            return arr;
        }
        let result = flatten(value);
        return result;
    }

    function funcFour(value){
        const flatten = 
        array => 
        array.reduce((acc, cur) => (Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur]), []);
        return flatten(value)
    }

   
}

//排序
//Array的排序会自动将内容转换为字符串再进行排序







