import React, {useEffect, useRef, useState} from "react";
import './index.css'
import 'react-pdf/dist/Page/TextLayer.css';
import {Document, Page, pdfjs} from "react-pdf";
import DocumentHighLight from "@/components/DocumentHighLight.tsx";
import {useScroll} from "react-use";


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

    const [numPages, setNumPages] = useState(0);
    const [hlSet, setHlSet] = useState<HighlightSet>(new Set([]));
    const [loadPDFDocument, setLoadPDFDocument] = useState(!searchText);
    const [pageRenderRange, setPageRenderRange] = useState<number[]>([])

    const renderPage = (pageNumber: number) => {
        return <Page key={pageNumber} customTextRenderer={searchText ? (textItem) => {
            const itemKey = `${textItem.pageIndex}-${textItem.itemIndex}`
            if (hlSet.has(itemKey)) {
                return `<mark>${textItem.str}</mark>`
            } else {
                return textItem.str
            }
        } : undefined} renderAnnotationLayer={false} width={800} pageNumber={pageNumber}></Page>
    }

    useEffect(() => {
        setLoadPDFDocument(false);
        // setPageRenderRange([])
    }, [file, searchText]);



    return <>
        {
            searchText && <DocumentHighLight file={file} searchText={searchText} onHighLight={(hlSet, hlPageIndex) => {
                setHlSet(hlSet);
                setLoadPDFDocument(true);
                setPageRenderRange(Array.from(hlPageIndex))
            }}/>
        }
        {
            loadPDFDocument && <Document file={file} onLoadSuccess={({numPages}) => {
                setNumPages(numPages)
            }}>
                {
                    pageRenderRange.map((pageIndex, index) => {
                        return <>
                            {renderPage(pageIndex + 1)}
                            {pageIndex + 1}
                        </>
                    })
                }

            </Document>

        }

    </>
}

export default PDFViewer
