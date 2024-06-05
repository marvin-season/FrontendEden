import {useRemarkHighlight} from "@/pages/MarkdownPanel/hooks/useRemarkHighlight.ts";
import {source} from "@/pages/MarkdownPanel/mocks/markdown-source.ts";
import {Flex, Input} from "antd";
import {useState} from "react";

export const ReactRemarkMD = () => {
    const [inputValue, setInputValue] = useState('')
    const {reactContent, highlight} = useRemarkHighlight(source)

    return <Flex style={{whiteSpace: "none", overflow: 'auto', height: '500px'}} vertical>
        <Flex>
            <Input.TextArea value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button onClick={event => {
                highlight(inputValue)
            }}>search
            </button>
        </Flex>
        {reactContent}
    </Flex>
};

