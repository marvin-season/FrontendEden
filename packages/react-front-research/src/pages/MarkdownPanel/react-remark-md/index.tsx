import {useRemarkHighlight} from "@/pages/MarkdownPanel/hooks/useRemarkHighlight.ts";
import {source} from "@/pages/MarkdownPanel/mocks/markdown-source.ts";
import {Flex, Input} from "antd";
import {useState} from "react";

export const ReactRemarkMD = () => {
    const [inputValue, setInputValue] = useState('')
    const [s, setS] = useState('')
    const {reactContent, highlight} = useRemarkHighlight(source, s)

    return <Flex style={{whiteSpace: "none", overflow: 'auto', height: '500px'}} vertical>
        <Flex>
            <Input.TextArea value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button onClick={event => {
                setS(inputValue);
                highlight()
            }}>search
            </button>
        </Flex>
        {reactContent}
    </Flex>
};

