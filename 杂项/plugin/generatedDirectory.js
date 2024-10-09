/*
 * @Author: xue yunlong
 * @Date: 2021-05-06 10:02:32
 * @LastEditTime: 2021-05-07 10:13:45
 * @LastEditors: Please set LastEditors
 * @Description: 读取文件，node
 * @FilePath: \html\plugin\generatedDirectory.js
 */



const fs = require("fs");


/**
 * @description: 暴露API，生成指定目录下的文件目录结构。
 * @param {*} fileDir
 * @param {*} blackList
 * @return {*}
 */

function generateData(fileDir,blackList) {
    try {
        if (!fs.existsSync(fileDir)) {
            throw new Error(fileDir + "不存在该目录")
        } else {
            return readDir(fileDir,blackList)
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description: 暴露API，生成指定目录下的文件目录简易结构。
 * @param {*} fileDir
 * @return {*}
 */
function generateSimpleData(fileDir) {
    try {
        let result = generateData(fileDir)
        let simple=
        function(data){
            return data.map((item) => {
                if (!item.isFile) {
                    let value={
                        name: item.name,
                        children: item.children
                    }
                    return simple(value.children);
                } else {
                    return item.name
                }
            })
        }
        return simple(result);
      
    } catch (error) {
        console.error(error);
    }
}

/**
 * @description: 读取文件目录结构
 * @param {*} fileDir
 * @param {*} blackList
 * @return {*}
 */
function readDir(fileDir,blackList) {
    let result = fs.readdirSync(fileDir).map((fileName) => {
        {
            return {
                path: fileDir + "/" + fileName,
                name: fileName,
                isFile: fs.statSync(fileDir + "/" + fileName).isFile()
            }
        }
    }).filter((item)=>{
        return blackList.indexOf(item.name)==-1
    })
    for (let i = 0; i < result.length; i++) {
        let item = result[i];
        if (item.isFile) {
            continue;
        } else {
            item.children = readDir(item.path,blackList)
        }
    }
    return result;
}





module.exports = {
    generateData,
    generateSimpleData
}