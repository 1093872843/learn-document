module.exports = {
    match(node) {
        if (node.type === 'Property' 
        && node.key.name === 'computed' 
        && node.value.type === 'ObjectExpression') {
            return true
        }
    
    },
    transform(node,parent) {
        node.value.properties.forEach((property) => {
            if (property.value.type === 'FunctionExpression') {
                const newComputedNode = {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: property.key,
                        init: {
                            type: 'CallExpression',
                            callee: { type: 'Identifier', name: 'computed' },
                            arguments: [{
                                type: 'ArrowFunctionExpression',
                                params: property.value.params,
                                body: property.value.body,
                                async: property.value.async
                            }]
                        }
                    }],
                    kind: 'const'
                };
                parent.properties.push(newComputedNode);
            }
        });
        const index = parent.properties.findIndex(this.match);
        parent.properties.splice(index, 1);  
}
}