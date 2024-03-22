import React, {useEffect, useRef} from "react";
import "react-pdf/dist/Page/TextLayer.css";
import {Document, Page, pdfjs} from "react-pdf";
import useHighlightInfo from "./useHighlightInfo";
import {handleScroll} from "@root/shared";
import {PDFDocumentProxy} from "pdfjs-dist";
import {useGetState} from "ahooks";

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

    const [hlSet, setHlSet, getHlSet] = useGetState<HighlightSet>(new Set([]));
    const pdfDocumentProxyRef = useRef<PDFDocumentProxy>();
    const documentContainerRef = useRef<HTMLDivElement>(null);
    const documentRef = useRef<HTMLDivElement>(null);
    const [pageRenderRange, setPageRenderRange, getPageRenderRange] = useGetState<number[]>([])
    const {getHighlightInfo} = useHighlightInfo({file, searchText});


    const handleHighlightInfo = (res: boolean | HighlightResultInfoType) => {
        if (res && typeof res != "boolean") {
            setHlSet(res.highlightSet);
            const pages = [...res.pages].sort();
            // setPageRenderRange(pages);
            // handleAddLast(2)
            // handleAddFirst(2)
        }
    };

    useEffect(() => {
        searchText && getHighlightInfo({pdfDocumentProxy: pdfDocumentProxyRef.current}).then(handleHighlightInfo);
    }, [searchText]);

    const renderPage = (pageNumber: number) => {
        return <Page
            inputRef={pageRef}
            width={width}
            pageNumber={pageNumber}
            customTextRenderer={(textItem) => {
                const itemKey = `${textItem.pageIndex}-${textItem.itemIndex}`;
                if (getHlSet().has(itemKey)) {
                    console.log(hlSet, getHlSet())
                    hlSet.delete(itemKey)
                    if (getHlSet().size === 0) {
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

    const pageRef = useRef<HTMLDivElement>(null);


    return <>
        <div style={{
            height: '800px',
            overflow: "auto"
        }} ref={documentContainerRef}>
            <div ref={documentRef}>
                <Document
                    file={file}
                    onLoadSuccess={(pdf) => {
                        pdfDocumentProxyRef.current = pdf;
                        getHighlightInfo({pdfDocumentProxy: pdf}).then(handleHighlightInfo);
                        setPageRenderRange(new Array(pdf.numPages).fill(0).map((item, index) => index))
                    }}>
                    {
                        getPageRenderRange().map(pageIndex => <div key={pageIndex + 1}>
                                {
                                    renderPage(pageIndex + 1)
                                }
                            </div>
                        )
                    }

                </Document>
            </div>

        </div>


    </>;
};

