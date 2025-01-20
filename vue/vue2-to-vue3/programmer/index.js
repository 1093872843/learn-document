const emitRule = require('./emit.js');
const modelRule = require('./model.js');
const computedRule = require('./computed.js');
const createdRule = require('./created.js');
const dataRule = require('./data.js');
const methodsRule = require('./methods.js');
const propsRule = require('./props.js');
const watchRule = require('./watch.js');

const estraverse = require('estraverse');
module.exports = {
    start: function (ast) {
        estraverse.replace(ast, {
            enter(node, parent) {
                if (emitRule.match(node)) {
                    return emitRule.transform(node)
                } else if (modelRule.match(node)) {
                    return modelRule.transform(node)
                } else if (propsRule.match(node)) {
                    return propsRule.transform(node)
                } else if (dataRule.match(node)) {
                    return dataRule.transform(node, parent)
                } else if (computedRule.match(node)) {
                    return computedRule.transform(node, parent)
                } else if (methodsRule.match(node)) {
                    return methodsRule.transform(node, parent)
                } else if (watchRule.match(node)) {
                    return watchRule.transform(node, parent)
                } else if (createdRule.match(node)) {
                    return createdRule.transform(node, parent)
                } else {
                    propsRule.everyAfter(node)
                    dataRule.everyAfter(node)
                }
                // 去除export default
            }
        })
        emitRule.after(ast)


        return ast
    },
    afterFormat:function(content){
        content=content.trim()
        content = content.replace(/([\)|\}]);,?/g, '$1');
        content = content.replace(/([\)|\}]);,/g, '$1');
        content = content.replace(/export\s+default\s+{([\s\S]+)}/, '$1');
        return content
    }
}

