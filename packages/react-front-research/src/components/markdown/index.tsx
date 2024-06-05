import React, {FC, useRef} from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import MarkdownPreview from '@uiw/react-markdown-preview'
import {useKey} from "react-use";
import {useGetState} from "ahooks";
import "./index.css"

const Markdown: FC<{
    markdown?: string;
    onChange?: (markdown: string) => void
}> = ({markdown = "", onChange}) => {
    console.log("markdown", markdown);
    const [toggle, setToggle, getToggle] = useGetState(false);

    useKey("@", event => {
        console.log(event)
        setToggle(!getToggle());
    })

    const container = useRef<HTMLDivElement>(null);


    return <div
        ref={container}
        className={"md-c"}
    >

        {toggle ? <MarkdownPreview className={"md-v"} source={markdown}/> :
            <MarkdownEditor
                toolbars={[]}
                theme={"dark"}
                autoFocus={true}
                className={"md-e"}
                enablePreview={false}
                value={markdown}
                onChange={onChange}
            />}
    </div>
}

export default Markdown;
