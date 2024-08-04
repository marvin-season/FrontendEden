import {Tabs, TabsProps} from 'antd';
import Lexical from './lexical';
import TTS from './tts';

const items: TabsProps['items'] = [
  {
    label: 'lexical',
    children: <Lexical/>,
    key: '1'
  },
  {
    label: 'tts',
    children: <TTS/>,
    key: '2'
  }
]

export default function () {
  return <Tabs defaultActiveKey={'2'} items={items}></Tabs>
}
