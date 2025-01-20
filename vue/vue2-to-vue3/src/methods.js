module.exports = {
    match(node){
        if (node.type === 'Property' && node.key.name === 'methods') {
            return true
        }
    },
    transform(node,parent){
        node.value.properties.forEach(method => {
            const arrowFunction = {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: method.key.name },
                    init: {
                        type: 'ArrowFunctionExpression',
                        params: method.value.params,
                        body: method.value.body
                    }
                }],
                kind: 'const'
            };
            parent.properties.push(arrowFunction);
        });
        const index = parent.properties.findIndex(this.match);
        parent.properties.splice(index, 1);  
    }
}