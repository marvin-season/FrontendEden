import {useEffect, useState} from "react";
import MarkdownPreview from '@uiw/react-markdown-preview'
import {source} from "@/pages/MarkdownPanel/mocks/markdown-source.ts";
import {getHighlightInfo} from "@/pages/MarkdownPanel/utils";
import {remarkText} from "@/pages/MarkdownPanel/plugins/remarkText.tsx";
import {HLInfoType} from "@/pages/MarkdownPanel/types.ts";

export const UiwMarkdownByPlugin = () => {

    const [highlightInfo, setHighlightInfo] = useState<HLInfoType>({
        startIndex: -1,
        endIndex: -1
    });
    const handle = () => {
        getHighlightInfo(source, "哪些任务").then(([startIndex, endIndex]) => {
            console.log("🚀  ", startIndex, endIndex)
            setHighlightInfo({
                startIndex,
                endIndex
            })
        })
    }

    useEffect(() => {
        handle();
    }, []);
    return <MarkdownPreview
        source={source}
        remarkPlugins={[[remarkText, highlightInfo]]}>
    </MarkdownPreview>
}
