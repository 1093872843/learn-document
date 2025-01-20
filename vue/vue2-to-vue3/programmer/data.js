const estraverse = require('estraverse');
module.exports = {
    data:[],
    match(node){
        if (
            node.type === 'Property' &&
            node.key.name === 'data' &&
            node.value.type === 'FunctionExpression'
        ) {
            return true
        }
    },
    transform(node,parent){
        const that =this
        that.data=[]
        let dataVar = []
        estraverse.traverse(node, {
            enter(childrenNode) {
                if (
                    childrenNode.type === 'Property' &&
                    childrenNode.key.type === 'Identifier'
                ) {
                    that.data.push(childrenNode.key.name)
                    dataVar.push({
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                id: { type: 'Identifier', name: childrenNode.key.name },
                                init: {
                                    type: 'CallExpression',
                                    callee: { type: 'Identifier', name: 'ref' },
                                    arguments: [childrenNode.value]
                                }
                            }
                        ],
                        kind: 'const'
                    })
                  
                }
            }
        })
        const index = parent.properties.findIndex(this.match);
        parent.properties.splice(index, 1,...dataVar);  
    
    },
    everyAfter(node){
  
            // 替换为 a.value
            // console.log(`${node.name}  ${node.type}  ${node.object?.type}  ${ node.parent?.type}`);
            if (node.type === 'MemberExpression' && node.object.type === 'ThisExpression' &&this.data.includes(node.property.name)) {
                // 替换为 A.value
                node.object = { type: 'Identifier', name: node.property.name };
                node.property = { type: 'Identifier', name: 'value' };
            }
        
    },
}