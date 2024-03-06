import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useState} from "react";

const hls = [
    "有很强的学习能力和适应能力，有较",
    "提出了公网移动通信系统的漏泄电缆与专网漏泄电缆间距及定向壁\n" +
    "挂天线间距要求。"
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
