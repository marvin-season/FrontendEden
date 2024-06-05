import {Tabs, TabsProps} from "antd";

import {EditableMD} from './EditableMD.tsx'
import {HighlightMDShit, UiwMarkdownByPlugin} from "@/pages/MarkdownPanel/uiw-markdown/index.tsx";
import {HLMarked} from "@/pages/MarkdownPanel/marked/HLMarked.tsx";
import {ReactRemarkMD} from "@/pages/MarkdownPanel/react-remark-md";

const items: TabsProps['items'] = [
    {
        key: '3',
        label: 'marked 高亮',
        children: <HLMarked/>,
    },
    {
        key: '1',
        label: 'SHIT HL_MD',
        children: <HighlightMDShit/>,
    },
    {
        key: '4',
        label: 'UiwMarkdownByPlugin',
        children: <UiwMarkdownByPlugin/>,
    },
    {
        key: '5',
        label: 'react-mark',
        children: <ReactRemarkMD/>,
    },
    {
        key: '2',
        label: '可编辑MD',
        children: <EditableMD/>,
    },
];
const MarkdownPanel = () => {
    return <>
        <Tabs defaultActiveKey={'4'} items={items}>
        </Tabs>
    </>
}

export default MarkdownPanel
