module.exports = {
    match(node){
        if (
            node.type === 'Property' &&
            node.key.name === 'model' &&
            node.value.type === 'ObjectExpression'
        ) {
            return true
        }
    },
    transform(node){
        const propNode = node.value.properties.find(p => p.key.name === 'prop');
        const propValue = propNode.value.value; // 获取 prop 的值

        // 使用新的 defineModel 写法替代
        return {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: propValue },
                    init: {
                        type: 'CallExpression',
                        callee: { type: 'Identifier', name: 'defineModel' },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: { type: 'Identifier', name: 'type' },
                                        value: { type: 'Identifier', name: 'String' },
                                        kind: 'init'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            kind: 'const',
            trailingComma: false
        };

    }
}