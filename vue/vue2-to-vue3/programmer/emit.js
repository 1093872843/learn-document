module.exports = {
    emits: new Set(),
    match(node) {
        if (node.type === 'CallExpression' &&
            node.callee.type === 'MemberExpression' &&
            node.callee.object.type === 'ThisExpression' &&
            node.callee.property.name === '$emit') {
            return true
        }

    },
    transform(node, parent) {
        this.emits.add(node.arguments[0].value)
        return {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'emits',  // 替换 this.emits 为 emits
            },
            arguments: node.arguments, // 保留参数
          };
    },
    after(root) {
        const nodeList = []
        this.emits.forEach((item) => {
            nodeList.push({ type: 'Literal', value: item })
        
        })
        console.log(nodeList);
        
        const defineEmitsNode = {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'emits' },
                    init: {
                        type: 'CallExpression',
                        callee: { type: 'Identifier', name: 'defineEmits' },
                        arguments: [
                            {
                                type: 'ArrayExpression',
                                elements: nodeList
                            }
                        ]
                    }
                }
            ],
            kind: 'const'
        }
        let propertiesNodes = []
        // 查找第一个变量声明
        root.body.forEach(node=>{

            if(node.type==='ExportDefaultDeclaration'){
                propertiesNodes = node.declaration.properties
            }
        })

        propertiesNodes?.unshift(defineEmitsNode); // 在 methods 部分前面插入
    },
}