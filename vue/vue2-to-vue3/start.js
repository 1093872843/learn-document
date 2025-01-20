const fs = require('fs-extra')
const path = require('path')
let source = fs.readFileSync("./demo/demo.vue").toString()
// 获取script文件
const regex = /<script>([\s\S]*?)<\/script>/gi;
const scriptTemplate = [...source.matchAll(regex)]
let content = null
scriptTemplate.forEach((match, index) => {
    content = match[1].trim()
});
// 生成ast
var esprima = require('esprima');
let ast = esprima.parseModule(content, { range: true });
// ast修改
const transform = require("./src/index.js")
ast=transform.start(ast)
// 转换为源代码
const escodegen = require('escodegen');
let transformedCode = escodegen.generate(ast,{
    semicolons: false 
});
// 处理错误格式
transformedCode=`<script setup>\n\r${transform.afterFormat(transformedCode)}\n\r<\/script>`
// 写入新文件
const newFile = path.resolve(__dirname, './demo/demoGenerate.vue')
fs.ensureFile(newFile)
source=source.replace(regex,()=>{
    return transformedCode
})
fs.writeFileSync(newFile, source)
