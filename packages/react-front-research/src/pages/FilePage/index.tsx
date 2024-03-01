import {ChangeEventHandler, useEffect, useState} from "react";
import {Document, Page} from "react-pdf";
import * as pdfjsLib from 'pdfjs-dist';

const utf8Decoder = new TextDecoder("utf-8");

const blob = new Blob(['hello'], {type: 'text/plain'});
const FilePage = () => {
    const [file, setFile] = useState<File>();
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

    return <>
        <input type="file" onChange={handleFileChange}/>

        <Document file={file}>
            <Page width={800} pageNumber={1}></Page>
        </Document>

    </>
}


export default FilePage
