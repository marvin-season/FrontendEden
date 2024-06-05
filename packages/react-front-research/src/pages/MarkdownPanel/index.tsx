import {Tabs, TabsProps} from "antd";

import {EditableMD} from './EditableMD.tsx'
import {HighlightMD} from './HighlightMD.tsx'
import {HLMarked} from "@/pages/MarkdownPanel/HLMarked.tsx";
import UiwMarkdown from "@/pages/MarkdownPanel/uiw-markdown";

const items: TabsProps['items'] = [
    {
        key: '3',
        label: 'marked 高亮',
        children: <HLMarked/>,
    },
    {
        key: '1',
        label: 'SHIT HL_MD',
        children: <HighlightMD/>,
    },
    {
        key: '4',
        label: 'UiwMarkdown',
        children: <UiwMarkdown/>,
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
