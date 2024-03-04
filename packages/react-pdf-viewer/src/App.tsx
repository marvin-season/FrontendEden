import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useState} from "react";

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
            <PDFViewer searchText={'什么是 Java 中的 OpenCSV 库？其作用是什么'} file={file}/>
        </>
    )
}

export default App
