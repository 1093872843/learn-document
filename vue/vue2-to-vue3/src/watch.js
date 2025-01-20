module.exports = {
    match(node){
        if (
            node.type === 'Property' &&
            node.key.name === 'watch' &&
            node.value.type === 'ObjectExpression'
        ) {
            return true
        }
    },
    transform(node,parent){
        node.value.properties.forEach((property) => {
            if (
                property.value.type === 'ObjectExpression' &&
                property.value.properties.some(p => p.key.name === 'handler')
            ) {
                const handlerProp = property.value.properties.find(p => p.key.name === 'handler');

                // 创建 Vue 3 的 watch 语法
                const newWatchNode = {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: { type: 'Identifier', name: 'watch' },
                        arguments: [
                            {
                                type: 'ArrowFunctionExpression',
                                params: [],
                                body: {
                                    type: 'Identifier',
                                    name: property.key.name
                                }
                            },
                            {
                                type: 'ArrowFunctionExpression',
                                params: handlerProp.value.params,
                                body: handlerProp.value.body
                            }
                        ]
                    }
                };
                parent.properties.push(newWatchNode);
            }
        });

        const index = parent.properties.findIndex(this.match);
        parent.properties.splice(index, 1); 
    }
}