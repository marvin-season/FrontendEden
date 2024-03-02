import React, {useEffect} from "react";
import './index.css'
import 'react-pdf/dist/Page/TextLayer.css';
import {Document, Page, pdfjs} from "react-pdf";
import DocumentHighLight from "@/components/DocumentHighLight.tsx";

export type PDFProps = {
    file: string | Blob | ArrayBuffer | undefined;
    searchText?: string
};
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();




const PDFViewer: React.FC<PDFProps> = ({
                                           file,
                                           searchText
                                       }) => {

    return <>
        <DocumentHighLight file={file} searchText={searchText} onHighLight={(res) => {
            console.log(res)
        }}/>
        <Document file={file}>
            <Page renderAnnotationLayer={false} width={800} pageNumber={1}></Page>
        </Document>
    </>
}

export default PDFViewer
