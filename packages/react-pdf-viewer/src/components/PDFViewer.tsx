import React from "react";
import './index.css'
import 'react-pdf/dist/Page/TextLayer.css';
import {Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();
const PDFViewer: React.FC<{
    file: string | Blob | ArrayBuffer | undefined
}> = ({
          file
      }) => {
    return <>

        <Document file={file}>
            <Page renderAnnotationLayer={false} width={800} pageNumber={1}></Page>
        </Document>
    </>
}

export default PDFViewer
