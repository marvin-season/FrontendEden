import {Flex, Input} from "antd";
import {FC, ReactElement, useState} from "react";
import {HLInfoType} from "@/pages/markdown-page/types.ts";
import {getHighlightInfo, getHighlightInfoV3} from "@/pages/markdown-page/algorithm";
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

    const [fileUrl, setFileUrl] = useState('')
    const [source, setSource] = useState('')
    const [inputValue, setInputValue] = useState('');
    const {download} = useDownload(console.log, async blob => {
        const text = await blob.text();
        setSource(text)
        onSource(text)
    });


    return <>
        <Flex style={{whiteSpace: "none", overflow: 'auto', height: '500px', position: "relative"}} vertical>
            <Flex style={{position: 'sticky', top: '0', width: '100%'}}>
                <Input.TextArea placeholder={'搜索内容'} value={inputValue}
                                onChange={e => setInputValue(e.target.value)}/>
                <Input placeholder={'文件地址'} value={fileUrl} onChange={(e) => {
                    setFileUrl(e.target.value)
                }}></Input>

                <button onClick={async event => {
                    if (onSearch) {
                        onSearch(inputValue);
                    } else {
                        await download(fileUrl).then(console.log)
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
