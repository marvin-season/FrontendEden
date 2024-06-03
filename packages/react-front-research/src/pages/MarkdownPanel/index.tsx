import {Tabs, TabsProps} from "antd";

import {EditableMD} from './EditableMD.tsx'
import {HighlightMD} from './HighlightMD.tsx'
import {HLMarked} from "@/pages/MarkdownPanel/HLMarked.tsx";

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
        key: '2',
        label: 'Tab 2',
        children: <EditableMD/>,
    },
];
const MarkdownPanel = () => {
    return <>
        <Tabs defaultActiveKey={'3'} items={items}>
        </Tabs>
    </>
}

export default MarkdownPanel
