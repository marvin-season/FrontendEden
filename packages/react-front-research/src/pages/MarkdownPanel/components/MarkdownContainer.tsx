import {Flex, Input} from "antd";
import {FC, ReactElement, useEffect, useState} from "react";
import {HLInfoType} from "@/pages/MarkdownPanel/types.ts";
import {getHighlightInfo, getHighlightInfoV2, getHighlightInfoV3} from "@/pages/MarkdownPanel/algorithm";
import {useDownload} from "@/hook/useDownload.ts";

type MarkdownContainerProps = {
    children: ReactElement,
    onHL: (params: HLInfoType) => void,
    onSource: (source: string) => void
    onSearch?: (value: string) => void
};
export const MarkdownContainer:
    FC<MarkdownContainerProps>
    = ({children, onHL, onSource, onSearch}) => {

    const [source, setSource] = useState('')
    const [inputValue, setInputValue] = useState('');
    const {download} = useDownload(console.log, async blob => {
        const text = await blob.text();
        setSource(text)
        onSource(text)
    });
    useEffect(() => {
        download('markdown_hl.md').then(console.log)
    }, []);


    return <>
        <Flex style={{whiteSpace: "none", overflow: 'auto', height: '500px', position: "relative"}} vertical>
            <Flex style={{position: 'sticky', top: '0', width: '100%'}}>
                <Input.TextArea value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                <button onClick={event => {
                    if (onSearch) {
                        onSearch(inputValue);
                    } else {
                        getHighlightInfoV3(source, inputValue).then(([startIndex, endIndex]) => {
                            console.log("🚀  ", startIndex, endIndex)
                            onHL({
                                startIndex,
                                endIndex
                            })
                        })
                    }

                }}>search
                </button>
            </Flex>
            {children}
        </Flex>
    </>
}
