module.exports = {
    match(node){
        if (node.type === 'Property' && node.key.name === 'created') {
            return true
        }
    },
    transform(node,parent){
        const newCode = {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: 'init' },
                init: {
                    type: 'ArrowFunctionExpression',
                    params: node.value.params,
                    body: node.value.body
                }
            }],
            kind: 'const'
        };
        const callStatement={
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: { type: 'Identifier', name: 'init' },
                arguments: []
            }
        }
        const index = parent.properties.findIndex(this.match);
        parent.properties.splice(index, 1);  
        parent.properties.push(newCode)
        parent.properties.push(callStatement)

     
    }
}