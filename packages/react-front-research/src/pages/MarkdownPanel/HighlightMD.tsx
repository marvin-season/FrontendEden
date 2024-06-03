import MarkdownPreview from '@uiw/react-markdown-preview'
import {Button, Flex, Input} from 'antd';
import {useEffect, useMemo, useState} from "react";

const regex = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;
const textSplitRegex = /\n+/;
const headerRegex = /^(#{0,5})\s*(.+)$/gm;

const rawText =
    "**调用示例**\n" +
    "\n" +
    "```python\n" +
    "from smartvision.pipline.pipline_process import pipeline\n" +
    "video_path = ['/data/video/demo.mp4']\n" +
    "func = pipeline(task=\"split-video\")\n" +
    "print(func(video_path))\n" +
    "```\n" +
    "\n" +
    "### text-to-image\n" +
    "**介绍**\n" +
    "\n" +
    "## 我们支持哪些任务？\n" +
    "\n" +
    "### split-video\n" +
    "\n" +
    "**介绍**\n" +
    "\n" +
    "入参为视频或音频，输出为台词内容以及起止时间段的json schema\n" +
    "\n" +
    "**参数列表**\n" +
    "\n" +
    "| pipline args | required | type | remarks                                   |\n" +
    "| ------------ | -------- | ---- | ----------------------------------------- |\n" +
    "| task         | true     | str  | 任务名称                                  |\n" +
    "| model        | false    | str  | 模型本地地址或仓库地址（用户名/仓库名称） |\n" +
    "| device       | false    | str  | cpu / gpu                                 |\n" +
    "\n" +
    "**调用示例**"


export const HighlightMD = () => {
    const [inputValue, setInputValue] = useState('')
    const [searchText, setSearchText] = useState('')
    const [source, setSource] = useState<string>('');

    const mdArr = useMemo(() => {
        return rawText.split(textSplitRegex)
    }, [rawText]);

    const [startIndex, endIndex] = useHighlightInfoMD(mdArr, searchText);

    useEffect(() => {
        console.log("🚀  startIndex, endIndex", startIndex, endIndex);
        if (startIndex != endIndex) {
            let isCodeFrame = false;
            const finalText = mdArr.map((text, index) => {
                if (index >= startIndex && index < endIndex) {
                    if (isMarkdownTableRow(text)) {
                        return text;
                    }
                    if (/^```.*$/.test(text)) {
                        isCodeFrame = !isCodeFrame;
                        return text;
                    }
                    return isCodeFrame ? text : text.replace(headerRegex, (match, hx, content) => {
                        console.log("🚀  matched", match)
                        return `${hx} <span style="color: blueviolet;">${content}</span>`;
                    })
                }
                return text
            }).join('\n');
            console.log("🚀  finalText", finalText);
            setSource(finalText)
        } else {
            setSource(rawText);
        }
    }, [startIndex, endIndex]);


    return <>
        <Flex style={{whiteSpace: "none"}} vertical>
            <Flex>
                <Input.TextArea value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                <Button onClick={event => {
                    setSearchText(inputValue || '视频或音频');
                }}>search
                </Button>
            </Flex>
            <MarkdownPreview source={source} components={{
                table: (props, context) => {
                    console.log("🚀  table", props, context)
                    return <table>{props.children}</table>
                }
            }}/>
        </Flex>

    </>
}


export const useHighlightInfoMD = (mdArr: string[], t: string) => {
    const searchText = t.replace(regex, "");
    const pTextArr = t.split(textSplitRegex);
    console.log("🚀  mdArr pTextArr", {mdArr, pTextArr})

    let mdEndIndex = 0;
    let accText = "";
    // left => right
    while (mdEndIndex < mdArr.length) {
        const text = mdArr[mdEndIndex];
        accText += text.replace(regex, "");
        const index = accText.indexOf(searchText);
        if (searchText.length > 0 && index > -1) {
            return [mdEndIndex - pTextArr.length + 1, mdEndIndex + 1]
        }
        mdEndIndex += 1;
    }
    return [0, 0]
}

function isMarkdownTableRow(text: string) {
    // 匹配表格头或内容行的正则表达式
    const tableRowRegex = /^\|(.+?)\|$/;
    // 匹配表格分隔行的正则表达式
    const tableSeparatorRegex = /^\|(?:\s*-+\s*\|)+$/;

    // 检查是否符合其中一种格式
    return tableRowRegex.test(text) || tableSeparatorRegex.test(text);
}
