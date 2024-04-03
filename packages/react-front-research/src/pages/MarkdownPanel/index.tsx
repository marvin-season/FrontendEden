import ReactMarkdown from '@uiw/react-markdown-preview'
import {useEffect, useState} from "react";
import {readLines} from '@/utils/file.ts';
const demo = "你好这是一段文字\n\n```c\n#include <stdio.h>```"
const MarkdownPanel = () => {
    const [source, setSource] = useState('')
    useEffect(() => {
        readLines('/kspx', (data) => {
            if (data) {
                setSource(prevState => prevState.concat(data))
            }
        })
    }, []);


    return <div style={{width: '600px', backgroundColor: 'lightcyan', padding: '20px'}}>
        <ReactMarkdown style={{
            background: 'lightcyan',
            fontSize: '12px'
        }} source={source}></ReactMarkdown>
    </div>
}

export default MarkdownPanel
