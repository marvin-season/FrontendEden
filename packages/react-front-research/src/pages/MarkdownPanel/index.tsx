import {Tabs, TabsProps} from "antd";

import {EditableMD} from './EditableMD.tsx'
import {HighlightMD} from './HighlightMD.tsx'
import {HLMarked} from "@/pages/MarkdownPanel/HLMarked.tsx";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tab 1',
        children: <HighlightMD/>,
    },
    {
        key: '2',
        label: 'Tab 2',
        children: <EditableMD/>,
    },
    {
        key: '3',
        label: 'Tab 3',
        children: <HLMarked/>,
    },
];
const MarkdownPanel = () => {
    return <>
        <Tabs items={items}>
        </Tabs>
    </>
}

export default MarkdownPanel
