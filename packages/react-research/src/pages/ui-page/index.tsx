import {Tabs, TabsProps} from 'antd';
import {HeadlessUI} from '@/pages/ui-page/components/HeadlessUI.tsx';

const items: TabsProps['items'] = [
  {
    key: '1',
    children: <HeadlessUI/>,
    label: 'HeadlessUI'
  }
]

const UIPage = () => {

  return <>
    <Tabs defaultActiveKey={'1'} items={items}></Tabs>
  </>
}


export default UIPage
