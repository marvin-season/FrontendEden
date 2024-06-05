import {useEffect} from "react";
import MarkdownPreview from '@uiw/react-markdown-preview'
import {visit} from 'unist-util-visit';
import {source} from "@/pages/MarkdownPanel/mocks/markdown-source.ts";
import {getHighlightInfo, getIntersection} from "@/pages/MarkdownPanel/utils";


export const remarkText = ({startIndex, endIndex}: { startIndex: number; endIndex: number }) => {
    console.log("🚀  startIndex, endIndex", startIndex, endIndex)
    debugger
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


export const UiwMarkdownByPlugin = () => {

    const handle = () => {
        getHighlightInfo(source, "我们支持哪些任务").then(([startIndex, endIndex]) => {
            console.log("🚀  ", startIndex, endIndex)
        })
    }

    useEffect(() => {
        handle();
    }, []);
    return <MarkdownPreview
        source={source}
        remarkPlugins={[[remarkText, {startIndex: 218, endIndex: 226}]]}>
    </MarkdownPreview>
}
