import React, {useEffect, useRef, useState} from "react";
import "react-pdf/dist/Page/TextLayer.css";
import {Document, Page, pdfjs} from "react-pdf";
import useHighlightInfo from "./useHighlightInfo";
import {handleScroll} from "@root/shared";
import {PDFDocumentProxy} from "pdfjs-dist";


export type PDFProps = {
    file?: string | Blob | ArrayBuffer | undefined;
    searchText?: string;
    width?: number
};

export type HighlightSet = Set<string>


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

const Loading = () => {
    return <>
        Loading 啊啊啊啊啊啊
    </>
}

export const PDFViewer: React.FC<PDFProps> = ({
                                                  file,
                                                  searchText,
                                                  width
                                              }) => {

    const [numPages, setNumPages] = useState(0);
    const [hlSet, setHlSet] = useState<HighlightSet>(new Set([]));
    const [isLoading, setIsLoading] = useState(false)
    const pdfDocumentProxyRef = useRef<PDFDocumentProxy>();


    const {getHighlightInfo} = useHighlightInfo({file, searchText});

    const renderPage = (pageNumber: number) => {
        return <Page
            width={width}
            pageNumber={pageNumber}
            customTextRenderer={searchText ? (textItem) => {
                const itemKey = `${textItem.pageIndex}-${textItem.itemIndex}`;
                if (hlSet.has(itemKey)) {
                    console.log('hlSet', hlSet)
                    hlSet.delete(itemKey)
                    if (hlSet.size === 0) {
                        handleScroll("#text_highlight")
                    }
                    return `<mark id="text_highlight">${textItem.str}</mark>`;
                } else {
                    return textItem.str;
                }
            } : undefined}
            renderAnnotationLayer={false}>
        </Page>;
    };

    const handleHighlightInfo = (res: boolean | any) => {
        if (res) {
            setHlSet(res.highlightSet);
        }
    };

    useEffect(() => {
        searchText && getHighlightInfo({pdfDocumentProxy: pdfDocumentProxyRef.current}).then(handleHighlightInfo);
    }, [searchText]);


    return <>

        <Document
            file={file}
            onLoadSuccess={(pdf) => {
                pdfDocumentProxyRef.current = pdf;
                getHighlightInfo({pdfDocumentProxy: pdf}).then(handleHighlightInfo);
                setNumPages(pdf.numPages);
            }}>
            {new Array(numPages).fill(0).map((item, index) => {
                return <div
                    key={index}>
                    {renderPage(index + 1)}
                    {index + 1}
                </div>;
            })
            }

        </Document>


    </>;
};

