import {Tabs, TabsProps} from 'antd';
import Lexical from './lexical';

const items: TabsProps['items'] = [
  {
    label: 'lexical',
    children: <Lexical/>,
    key: '1'
  }
]

export default function () {
  return <Tabs defaultActiveKey={'1'} items={items}></Tabs>
}
