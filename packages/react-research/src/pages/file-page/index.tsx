import {Tabs, TabsProps} from 'antd';
import FileUploadProcess from '@/pages/file-page/components/file-upload-process.tsx';

const items: TabsProps['items'] = [
  {
    key: '1',
    children: <FileUploadProcess/>,
    label: '文件上传进度'
  }
]

const FilePage = () => {

  return <>
    <Tabs defaultActiveKey={'1'} items={items}></Tabs>
  </>
}


export default FilePage
