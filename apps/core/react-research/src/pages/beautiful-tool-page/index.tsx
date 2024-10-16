import {Tabs, TabsProps} from 'antd';
import Lexical from './lexical';
import TTS from './tts';
import { ComplexInput } from "@/pages/beautiful-tool-page/complex-input";

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
  },
  {
    label: '3',
    children: <ComplexInput/>,
    key: '3'
  }
]

export default function () {
  return <Tabs defaultActiveKey={'3'} items={items}></Tabs>
}
