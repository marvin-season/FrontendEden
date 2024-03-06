import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useState} from "react";
import mathPDF from '/math.pdf';


const hls = [
    "在导数这一章中的极限不会直接给出极限，而是会给出导数或函数的相关 定义，来求极限，再根据导数定义转换为导数。同时要注意这里不止会有导数定 义，还会有函数等性质。",
    "求高阶导数基本上使用归纳法或莱布尼茨公式。"
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
                    <PDFViewer searchText={searchText} file={file || '/math.pdf'}/>
                </div>
            </div>
        </>
    )
}

export default App
