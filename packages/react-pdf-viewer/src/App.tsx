import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useEffect, useRef, useState} from "react";

function App() {
    const [file, setFile] = useState<Blob>();
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let file: File | undefined = e.currentTarget.files?.[0];
        if (!file) {
            return
        }
        setFile(file)
    }
    return (
        <>
            <input type={'file'} onChange={handleFileChange}/>
            <div style={{
                height: '800px',
                overflow: 'auto'
            }}>
                <PDFViewer searchText={'有很强的学习能力和适应能力，有较'} file={file}/>
            </div>
        </>
    )
}

export default App
