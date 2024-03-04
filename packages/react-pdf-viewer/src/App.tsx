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
            <PDFViewer file={file}/>
        </>
    )
}

export default App
