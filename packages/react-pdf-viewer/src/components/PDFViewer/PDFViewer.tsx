import React, {useEffect, useRef, useState} from "react";
import "react-pdf/dist/Page/TextLayer.css";
import {Document, Page, pdfjs} from "react-pdf";
import useHighlightInfo from "./useHighlightInfo";
import {handleScroll} from "@root/shared";
import {PDFDocumentProxy} from "pdfjs-dist";
import {useMeasure, useScroll} from "react-use";


export type PDFProps = {
    file?: string | Blob | ArrayBuffer | undefined;
    searchText?: string;
    width?: number
};

export type HighlightSet = Set<string>

export type HighlightResultInfoType = {
    highlightSet: HighlightSet;
    pages: Set<number>
}

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
    const documentContainerRef = useRef<HTMLDivElement>(null);
    const documentContainerInfo = useScroll(documentContainerRef);
    const [documentRef, documentInfo] = useMeasure<HTMLDivElement>();

    const {getHighlightInfo} = useHighlightInfo({file, searchText});


    const handleHighlightInfo = (res: any) => {
        if (res) {
            setHlSet(res.highlightSet);
        }
    };

    useEffect(() => {
        searchText && getHighlightInfo({pdfDocumentProxy: pdfDocumentProxyRef.current}).then(handleHighlightInfo);
    }, [searchText]);

    const renderPage = (pageNumber: number) => {
        return <Page
            width={width}
            pageNumber={pageNumber}
            renderTextLayer={!!searchText}
            customTextRenderer={(textItem) => {
                const itemKey = `${textItem.pageIndex}-${textItem.itemIndex}`;
                if (hlSet.has(itemKey)) {
                    hlSet.delete(itemKey)
                    if (hlSet.size === 0) {
                        setTimeout(() => handleScroll("#text_highlight"))
                    }
                    return `<mark id="text_highlight">${textItem.str}</mark>`;
                } else {
                    return textItem.str;
                }
            }}
            renderAnnotationLayer={false}>
        </Page>;
    };

    const handleRenderRangePage = (pageIndexes: number[]) => {
        return <>
            {
                pageIndexes.map(index =>
                    <div key={index}>
                        {
                            renderPage(index)
                        }
                        {index + 1}
                    </div>
                )
            }
        </>

    }

    useEffect(() => {
        const {height} = documentInfo
        const {y: top}
            = documentContainerInfo;
        console.log(top, height)
        // top
        if (top == 0) {
            console.log('顶部');
        } else if (top + 800 == height) {
            console.log('底部');
        }
    }, [documentContainerInfo]);

    return <>
        <div style={{
            height: '800px',
            overflow: "auto"
        }} ref={documentContainerRef}>
            <div ref={documentRef}
            >
                <Document
                    file={file}
                    onLoadSuccess={(pdf) => {
                        pdfDocumentProxyRef.current = pdf;
                        getHighlightInfo({pdfDocumentProxy: pdf}).then(handleHighlightInfo);
                        setNumPages(pdf.numPages);
                    }}>
                    {handleRenderRangePage([5, 6, 7])}

                </Document>
            </div>

        </div>


    </>;
};

