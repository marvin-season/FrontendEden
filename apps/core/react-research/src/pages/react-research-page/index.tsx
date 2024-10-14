import React, {memo} from "react";
import {Tabs, TabsProps} from 'antd';
import RaceCondition from './RaceCondition';
import CalendarPanel from './CalendarPanel';
import WorkerPanel from './WorkerPanel';
import ScrollPanel from './ScrollPanel';
import CompReRender from './CompReRender';
import UpdatePage from './UpdatePage';

const items: TabsProps['items'] = [
  {
    label: '竞态条件',
    children: <RaceCondition/>,
    key: '1'
  },
  {
    label: '日历组件',
    children: <CalendarPanel/>,
    key: '2'
  },
  {
    label: '性能Worker',
    children: <WorkerPanel/>,
    key: '3'
  },
  {
    label: 'scroll测试',
    children: <ScrollPanel/>,
    key: '4'
  },
  {
    label: '组件重渲染',
    children: <CompReRender/>,
    key: '5'
  },
  {
    label: '快速更新文本',
    children: <UpdatePage/>,
    key: '6'
  },
]
const ReactResearchPanel = memo(() => {

  return <>
    <Tabs defaultActiveKey={'1'} items={items}></Tabs>
  </>
})
export default ReactResearchPanel
