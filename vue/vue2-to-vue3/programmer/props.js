module.exports = {
    props:[],
    match(node){
        if (
            node.type === 'Property' &&
            node.key.name === 'props' &&
            node.value.type === 'ObjectExpression'
        ) {
            return true
        }
    },
    transform(node){
        this.props=[]
        // 获取变量
        node.value.properties.forEach(item => {
            this.props.push(item.key.name)
        });
        // 替换文本中使用的变量
        newNode = {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'props' },
                    init: {
                        type: 'CallExpression',
                        callee: { type: 'Identifier', name: 'defineProps' },
                        arguments: [node.value]
                    }
                }
            ],
            kind: 'const'
        };
        return newNode
    },
    everyAfter(node){
        if (node.type === 'MemberExpression' && node.object.type === 'ThisExpression' &&this.props.includes(node.property.name)) {
            // 替换为 A.value
            node.object = { type: 'Identifier', name: 'props' };
            node.property = { type: 'Identifier', name: node.property.name };
        }
    },
}