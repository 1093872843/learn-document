```javascript
let a = 0
let b = async () => {
//这里不理解为什么a输出是10，不应该是11吗？
a = a + await 10
console.log('2', a) // -> '2' 10
}

b()
a++
console.log('1', a) // -> '1' 1
```
