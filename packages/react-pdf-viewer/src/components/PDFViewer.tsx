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

    const [numPages, setNumPages] = useState(0);
    const [hlSet, setHlSet] = useState<HighlightSet>(new Set([]));
    const [renderTextLayer, setRenderTextLayer] = useState(false)

    const renderPage = (pageNumber: number) => {
        return <Page
            width={800} pageNumber={pageNumber}
            key={pageNumber}
            renderTextLayer={renderTextLayer}
            customTextRenderer={searchText ? (textItem) => {
                const itemKey = `${textItem.pageIndex}-${textItem.itemIndex}`
                if (hlSet.has(itemKey)) {
                    return `<mark>${textItem.str}</mark>`
                } else {
                    return textItem.str
                }
            } : undefined}
            renderAnnotationLayer={false}>
        </Page>
    }


    return <>
        {
            searchText && <DocumentHighLight file={file} searchText={searchText} onHighLight={(hlSet, hlPageIndex) => {
                setHlSet(hlSet);
                setRenderTextLayer(true)
            }}/>
        }
        {
            <Document file={file} onLoadSuccess={({numPages}) => {
                setNumPages(numPages)
            }}>
                {new Array(numPages).fill(0).map((item, index) => {
                    return <>
                        {renderPage(index + 1)}
                        {index + 1}
                    </>
                })
                }

            </Document>

        }

    </>
}

export default PDFViewer
