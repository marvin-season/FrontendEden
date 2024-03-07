import React, {useEffect, useRef, useState} from "react";
import './index.css'
import 'react-pdf/dist/Page/TextLayer.css';
import {Document, Page, pdfjs} from "react-pdf";
import useHighlightInfo from "@/components/useHighlightInfo.ts";
import {handleScroll} from "@root/shared"
import {PDFDocumentProxy} from "pdfjs-dist";


export type PDFProps = {
    file?: string | Blob | ArrayBuffer | undefined;
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
    const [renderTextLayer, setRenderTextLayer] = useState(false);
    const pdfDocumentProxyRef = useRef<PDFDocumentProxy>();

    const {getHighlightInfo} = useHighlightInfo({searchText});

    const renderPage = (pageNumber: number) => {
        return <Page
            width={800} pageNumber={pageNumber}
            renderTextLayer={renderTextLayer}
            onRenderTextLayerSuccess={() => handleScroll('#text_highlight')}
            customTextRenderer={searchText ? (textItem) => {
                const itemKey = `${textItem.pageIndex}-${textItem.itemIndex}`
                if (hlSet.has(itemKey)) {
                    return `<mark id="text_highlight">${textItem.str}</mark>`
                } else {
                    return textItem.str
                }
            } : undefined}
            renderAnnotationLayer={false}>
        </Page>
    }

    const handleHighlightInfo = (res: boolean | any) => {
        if (res) {
            setHlSet(res.highlightSet);
            setRenderTextLayer(true)
        } else {
            setRenderTextLayer(false)
        }
    }

    useEffect(() => {
        searchText && getHighlightInfo({pdfDocumentProxy: pdfDocumentProxyRef.current}).then(handleHighlightInfo)
    }, [searchText]);


    return <>
        {
            <Document file={file} onLoadSuccess={(pdf) => {
                console.log('onLoadSuccess')
                pdfDocumentProxyRef.current = pdf
                getHighlightInfo({pdfDocumentProxy: pdf}).then(handleHighlightInfo)
                setNumPages(pdf.numPages)
            }}>
                {new Array(numPages).fill(0).map((item, index) => {
                    return <div
                        key={index}>
                        {renderPage(index + 1)}
                        {index + 1}
                    </div>
                })
                }

            </Document>

        }

    </>
}

export default PDFViewer
