import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useState} from "react";

const hls = [
    "有很强的学习能力和适应能力，有较",
    "提出了公网移动通信系统的漏泄电缆与专网漏泄电缆间距及定向壁\n" +
    "挂天线间距要求。",
    "引入建筑物地下室的管道伸出外墙时不应小于 2.0m,并应向室外人\n" +
    "(手)孔方向倾斜，防水坡度不应小于 0.5%。直接引入建筑物地下室\n" +
    "的弱电终端设备用户管宜采用多 根公称口径为 25mm～50mm 的热浸\n" +
    "镀锌焊接钢导管"
]

function App() {
    const [file, setFile] = useState<Blob>();
    const [searchText, setSearchText] = useState<string>()
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let file: File | undefined = e.currentTarget.files?.[0];
        if (!file) {
            return
        }
        setFile(file)
    }
    return (
        <>
            <div style={{display: 'flex', justifyContent: "space-between"}}>
                <div style={{
                    overflow: 'auto',
                    width: '500px'
                }}>
                    <input type={'file'} onChange={handleFileChange}/>
                    {searchText}
                    {
                        hls.map(item => <div
                            onClick={() => {
                                setSearchText(item)
                            }}
                            key={item}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                border: "1px black dashed"
                            }}>
                            {item}
                        </div>)
                    }
                </div>

                <div style={{
                    height: '800px',
                    overflow: 'auto'
                }}>
                    <PDFViewer searchText={searchText} file={file}/>
                </div>
            </div>
        </>
    )
}

export default App
