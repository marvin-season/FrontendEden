import {useState} from "react";
import MarkdownPreview from '@uiw/react-markdown-preview'
import {remarkText} from "@/pages/markdown-page/plugins/remarkText.tsx";
import {HLInfoType} from "@/pages/markdown-page/types.ts";
import {MarkdownContainer} from "@/pages/markdown-page/components/MarkdownContainer.tsx";

export const UiwMarkdownByPlugin = () => {

    const [highlightInfo, setHighlightInfo] = useState<HLInfoType>({
        startIndex: -1,
        endIndex: -1
    });

    const [source, setSource] = useState('')

    return <MarkdownContainer onSource={setSource} onHL={setHighlightInfo}>
        <MarkdownPreview
            source={source}
            remarkPlugins={[[remarkText, highlightInfo]]}>
        </MarkdownPreview>
    </MarkdownContainer>
}
