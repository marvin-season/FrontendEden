import {useEffect} from "react";
import MarkdownPreview from '@uiw/react-markdown-preview'
import {source} from "@/pages/MarkdownPanel/mocks/markdown-source.ts";
import {getHighlightInfo, getIntersection} from "@/pages/MarkdownPanel/utils";
import {remarkText} from "@/pages/MarkdownPanel/plugins/remarkText.tsx";

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
