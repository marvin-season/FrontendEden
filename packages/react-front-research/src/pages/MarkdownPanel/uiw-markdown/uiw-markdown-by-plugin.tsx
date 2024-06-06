import {useEffect, useState} from "react";
import MarkdownPreview from '@uiw/react-markdown-preview'
import {getHighlightInfo} from "@/pages/MarkdownPanel/utils";
import {remarkText} from "@/pages/MarkdownPanel/plugins/remarkText.tsx";
import {HLInfoType} from "@/pages/MarkdownPanel/types.ts";
import {Flex, Input} from "antd";
import {useDownload} from "@/hook/useDownload.ts";

export const UiwMarkdownByPlugin = () => {

    const [highlightInfo, setHighlightInfo] = useState<HLInfoType>({
        startIndex: -1,
        endIndex: -1
    });

    const [source, setSource] = useState('')

    const [inputValue, setInputValue] = useState('');
    const {download} = useDownload(console.log, async blob => {
        setSource(await blob.text())
    });
    useEffect(() => {
        download('/example.md').then(console.log)
    }, []);

    return <Flex style={{whiteSpace: "none", overflow: 'auto', height: '500px', position: "relative"}} vertical>
        <Flex style={{position: 'sticky', top: '0', width: '100%'}}>
            <Input.TextArea value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button onClick={event => {
                getHighlightInfo(source, inputValue).then(([startIndex, endIndex]) => {
                    console.log("🚀  ", startIndex, endIndex)
                    setHighlightInfo({
                        startIndex,
                        endIndex
                    })
                })
            }}>search
            </button>
        </Flex>
        <MarkdownPreview
            source={source}
            remarkPlugins={[[remarkText, highlightInfo]]}>
        </MarkdownPreview>
    </Flex>
}
