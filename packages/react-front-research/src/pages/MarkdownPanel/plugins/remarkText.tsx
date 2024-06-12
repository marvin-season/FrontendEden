import {visit} from "unist-util-visit";
import {getIntersection} from "@/pages/MarkdownPanel/algorithm";
import {HLInfoType} from "@/pages/MarkdownPanel/types.ts";

export const remarkText = ({startIndex, endIndex}: HLInfoType) => {
    console.log("🚀  startIndex, endIndex", startIndex, endIndex)
    return function (tree: any) {
        visit(tree, 'text', (node, index, parent) => {
            const startOffset = node.position.start.offset;
            const endOffset = node.position.end.offset;
            const intersection = getIntersection([startIndex, endIndex], [startOffset, endOffset])

            if (intersection[0] != intersection[1]) {
                const relativeStart = intersection[0] - startOffset;
                const relativeEnd = intersection[1] - startOffset;
                node.value = `${node.value.substring(0, relativeStart)}<mark>${node.value.substring(relativeStart, relativeEnd)}</mark>${node.value.substring(relativeEnd)}`
                parent.children.splice(index, 1, {
                    type: 'html',
                    value: node.value
                })
            }
        })
    }
}
