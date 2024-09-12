import React, {memo} from "react";
import Markdown from "@uiw/react-markdown-preview";

const MarkdownContent = memo<{ source: string }>(({source}) => {
    return <>
        <Markdown style={{background: "none"}}  source={source}></Markdown>
    </>
}, (prevProps, nextProps) => prevProps.source === nextProps.source);

export default MarkdownContent
