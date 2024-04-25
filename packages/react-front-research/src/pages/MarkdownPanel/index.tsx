import Markdown from "@/components/markdown";
import {Button, Flex} from "antd";
import {useState} from "react";

const MarkdownPanel = () => {
    const [markdown, setMarkdown] = useState("")

    return <Flex>
        <Button onClick={() => {
            const blob = new Blob([markdown], {type: 'text/markdown'});
            const link = document.createElement('a');

            // Set the href attribute of the link to the Blob object
            link.href = window.URL.createObjectURL(blob);

            // Set the download attribute of the link to specify the filename
            link.download = 'new_file.md';

            // Append the link to the body
            document.body.appendChild(link);

            // Trigger a click event on the link to start the download
            link.click();

            // Remove the link from the body
            document.body.removeChild(link);
        }}>导出</Button>
        <Markdown onChange={setMarkdown} markdown={markdown} />
    </Flex>
}

export default MarkdownPanel
