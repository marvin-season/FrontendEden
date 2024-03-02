import PDFViewer from "@/components/PDFViewer.tsx";
import {ChangeEventHandler, useEffect, useState} from "react";
import * as pdfjsLib from "pdfjs-dist";

function App() {
    const [file, setFile] = useState<Blob>();
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        let file: File | undefined = e.currentTarget.files?.[0];
        if (!file) {
            return
        }
        setFile(file)
    }

    useEffect(() => {
        (async () => {
            if (file) {
                const pdf = await pdfjsLib.getDocument(await file.arrayBuffer()).promise;
                let page = await pdf.getPage(1);
                let textContent = await page.getTextContent();
                console.log('textContent', textContent)

            }
        })()
    }, [file]);
    return (
        <>
            <input type={'file'} onChange={handleFileChange}/>
            <PDFViewer file={file}/>
        </>
    )
}

export default App
