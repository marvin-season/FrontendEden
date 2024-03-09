import React, {useCallback, useEffect, useRef, useState} from "react";
import "react-pdf/dist/Page/TextLayer.css";
import {Document, Page, pdfjs} from "react-pdf";
import useHighlightInfo from "./useHighlightInfo";
import {handleScroll} from "@root/shared";
import {PDFDocumentProxy} from "pdfjs-dist";
import {useGetState} from "ahooks";
import {PDFPage} from "./PDFPage.tsx";
import lodash from 'lodash'

const MemoPage = React.memo(PDFPage, (prevProps, nextProps) => {
    return prevProps.pageNumber == nextProps.pageNumber
        && prevProps.width == nextProps.width
        && prevProps.customRenderer == nextProps.customRenderer
        && prevProps.pageIndex == nextProps.pageIndex
        && prevProps.searchText == nextProps.searchText
})

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

    const [_, setNumPages, getNumPages] = useGetState(0);
    const [hlSet, setHlSet] = useState<HighlightSet>(new Set([]));
    const [isLoading, setIsLoading] = useState(false)
    const pdfDocumentProxyRef = useRef<PDFDocumentProxy>();
    const documentContainerRef = useRef<HTMLDivElement>(null);
    const documentRef = useRef<HTMLDivElement>(null);
    const [pageRenderRange, setPageRenderRange] = useState<number[]>([4, 5, 6])
    const {getHighlightInfo} = useHighlightInfo({file, searchText});


    const handleHighlightInfo = (res: boolean | HighlightResultInfoType) => {
        if (res && typeof res != "boolean") {
            setHlSet(res.highlightSet);
            const pages = [...res.pages].sort();
            const firstPageIndex = pages[0] - 1;
            const lastPageIndex = pages.at(-1) + 1;
            if (firstPageIndex >= 0) {
                pages.unshift(firstPageIndex)
            }
            if (lastPageIndex <= getNumPages()) {
                pages.push(lastPageIndex)
            }
            setPageRenderRange(pages)
        }
    };

    useEffect(() => {
        searchText && getHighlightInfo({pdfDocumentProxy: pdfDocumentProxyRef.current}).then(handleHighlightInfo);
    }, [searchText]);

    const renderPage = (pageNumber: number) => {
        return <Page
            width={width}
            pageNumber={pageNumber}
            renderTextLayer={true}
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

    const handleAddFirst = useCallback(lodash.debounce(() => {
        console.log('顶部');
        if (pageRenderRange.at(0) >= 1) {
            setPageRenderRange([pageRenderRange.at(0) - 1, ...pageRenderRange])
        }
    }, 1000), [])

    const handleAddLast = useCallback(lodash.debounce(() => {
        console.log('底部');
        if (pageRenderRange.at(-1) <= getNumPages()) {
            setPageRenderRange([...pageRenderRange, pageRenderRange.at(-1) + 1])
        }
    }, 1000), [])

    const handelScroll = () => {
        const documentContainerDom = documentContainerRef.current;
        const documentDom = documentRef.current

        if (!documentContainerDom || !documentDom) {
            return
        }
        documentContainerDom.addEventListener('scroll', (e) => {
            const {height: documentHeight} = documentDom.getBoundingClientRect()
            if (documentContainerDom.scrollTop <= 800 / 2) {
                handleAddFirst()
            } else if (documentContainerDom.scrollTop + 800 / 2 == documentHeight) {
                handleAddLast()
            }
        })
    }

    useEffect(() => {
        return () => {
            if (documentContainerRef.current) {
                documentContainerRef.current.removeEventListener('scroll', () => {
                    console.log('remove')
                })
            }
        };

    }, []);

    return <>
        <button onClick={handleAddLast}>aaa</button>
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
                        setNumPages(pdf.numPages);

                        handelScroll()
                    }}>
                    {
                        pageRenderRange.map(pageIndex => <div key={pageIndex + 1}>
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

