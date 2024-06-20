import {useState} from "react";
import MarkdownPreview from '@uiw/react-markdown-preview'
import {remarkText} from "@/pages/MarkdownPanel/plugins/remarkText.tsx";
import {HLInfoType} from "@/pages/MarkdownPanel/types.ts";
import {MarkdownContainer} from "@/pages/MarkdownPanel/components/MarkdownContainer.tsx";

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
