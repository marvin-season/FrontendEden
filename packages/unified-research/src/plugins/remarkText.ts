import {visit} from 'unist-util-visit';


export const remarkText = (options?: any) => {
    console.log("🚀  options", options)

    return function (tree: any) {
        visit(tree, 'text', (node, index, parent) => {
            // console.log("🚀  ", node.value)
            // node.value = `<mark>${node.value}</mark>`
            // parent.children.splice(index, 1, {
            //     type: 'html',
            //     value: node.value
            // })
        })
    }
}
