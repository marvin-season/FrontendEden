import {visit} from 'unist-util-visit';


export const remarkText = ({startIndex, endIndex}: { startIndex: number; endIndex: number }) => {

    return function (tree: any) {
        visit(tree, 'text', (node, index, parent) => {
            const startOffset = node.position.start.offset;
            const endOffset = node.position.end.offset;

            if (startIndex >= startOffset && startIndex <= endOffset) {
                node.value = `<mark>${node.value}</mark>`
                parent.children.splice(index, 1, {
                    type: 'html',
                    value: node.value
                })
            }
        })
    }
}
