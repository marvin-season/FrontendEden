import React, {useState} from "react";
import './index.css'
import 'react-pdf/dist/Page/TextLayer.css';
import {Document, Page, pdfjs} from "react-pdf";
import DocumentHighLight from "@/components/DocumentHighLight.tsx";

export type PDFProps = {
    file: string | Blob | ArrayBuffer | undefined;
    searchText?: string
};

export type HighlightSet = Set<string>

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();


const PDFViewer: React.FC<PDFProps> = ({
                                           file,
                                           searchText
                                       }) => {

    const [numPages, setNumPages] = useState(0)
    const [hlSet, setHlSet] = useState<HighlightSet>(new Set([]))

    return <>
        {
            searchText && <DocumentHighLight file={file} searchText={searchText} onHighLight={(res) => {
                console.log('hlSet', res)
                setHlSet(res)
            }}/>
        }
        <Document file={file} onLoadSuccess={({numPages}) => {
            setNumPages(numPages)
        }}>
            {
                Array.from(new Array(numPages), (item, index) => {
                    return <Page key={index} customTextRenderer={(textItem) => {
                        const itemKey = `${textItem.pageIndex}-${textItem.itemIndex}`

                        if (hlSet.has(itemKey)) {
                            return `<mark>${textItem.str}</mark>`
                        } else {
                            return textItem.str
                        }
                    }} renderAnnotationLayer={false} width={800} pageNumber={index + 1}></Page>
                })
            }

        </Document>
    </>
}

export default PDFViewer
