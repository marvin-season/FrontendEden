import {Tabs, TabsProps} from "antd";
import BaseFlow from "@/pages/ReactFlowPanel/components/BaseFlow.tsx";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'BaseFlow',
        children: <BaseFlow/>
    }
]

export default function () {
    return <>
        <Tabs defaultActiveKey={'4'} items={items}>
        </Tabs>
    </>
}


