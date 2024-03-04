import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useEffect, useRef, useState} from "react";
import {useScroll} from "react-use";

function App() {
    const [file, setFile] = useState<Blob>();
    const r = useRef<HTMLDivElement>(null);
    const o = useScroll(r)
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let file: File | undefined = e.currentTarget.files?.[0];
        if (!file) {
            return
        }
        setFile(file)
    }
    useEffect(() => {
        console.log('o', o)
    }, [o]);
    return (
        <>
            <input type={'file'} onChange={handleFileChange}/>
            <div ref={r} style={{
                height: '800px',
                overflow: 'auto'
            }}>
                <PDFViewer searchText={'什么是 Java 中的 OpenCSV 库？其作用是什么'} file={file}/>
            </div>
        </>
    )
}

export default App
