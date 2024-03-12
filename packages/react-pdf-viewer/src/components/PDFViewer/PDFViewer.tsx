import React, {useCallback, useEffect, useRef, useState} from "react";
import "react-pdf/dist/Page/TextLayer.css";
import {Document, Page, pdfjs} from "react-pdf";
import useHighlightInfo from "./useHighlightInfo";
import {handleScroll} from "@root/shared";
import {PDFDocumentProxy} from "pdfjs-dist";
import {useGetState} from "ahooks";
import lodash from 'lodash'

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

    const [_, setNumPages, getNumPages] = useGetState(0); // 页数
    const [hlSet, setHlSet, getHlSet] = useGetState<HighlightSet>(new Set([]));
    const [renderTextLayer, setRenderTextLayer] = useState(false)
    const pdfDocumentProxyRef = useRef<PDFDocumentProxy>();
    const documentContainerRef = useRef<HTMLDivElement>(null);
    const documentRef = useRef<HTMLDivElement>(null);
    const [pageRenderRange, setPageRenderRange, getPageRenderRange] = useGetState<number[]>([5, 6])
    const {getHighlightInfo} = useHighlightInfo({file, searchText});


    const handleHighlightInfo = (res: boolean | HighlightResultInfoType) => {
        if (res && typeof res != "boolean") {
            setHlSet(res.highlightSet);
            const pages = [...res.pages].sort();
            setPageRenderRange(pages);
            setRenderTextLayer(true);
            // handleAddLast(2)
            // handleAddFirst(2)
        }
    };

    useEffect(() => {
        searchText && getHighlightInfo({pdfDocumentProxy: pdfDocumentProxyRef.current}).then(handleHighlightInfo);
    }, [searchText]);

    const handleAddFirst = lodash.debounce((number = 3) => {
        console.log(`<- 加载${number}页`, getPageRenderRange());
        const firstPageIndex = getPageRenderRange().at(0);
        if (firstPageIndex && firstPageIndex >= 1) {
            const newPageIndex = []
            // = [firstPageIndex - 1, firstPageIndex - 2, firstPageIndex - 3].filter(index => index >= 0);
            // [lastPageIndex + 1, lastPageIndex + 2, lastPageIndex + 3].filter(index => index <= getNumPages())
            for (let i = 1; i <= number; i++) {
                if (firstPageIndex - i < 0) {
                    break
                }

                newPageIndex.unshift(firstPageIndex - i)
            }
            setPageRenderRange([...newPageIndex, ...getPageRenderRange()])
        }

    }, 500)

    const handleAddLast = useCallback(lodash.debounce((number = 3) => {
        console.log(`-> 加载${number}页`, getPageRenderRange(), getNumPages());

        const lastPageIndex = getPageRenderRange().at(-1);
        if (lastPageIndex && lastPageIndex <= getNumPages() - 2) {
            const newPageIndex = []
            // [lastPageIndex + 1, lastPageIndex + 2, lastPageIndex + 3].filter(index => index <= getNumPages())
            for (let i = 1; i <= number; i++) {
                if (lastPageIndex + i > getNumPages() - 1) {
                    break
                }

                newPageIndex.push(lastPageIndex + i)
            }
            setPageRenderRange([...getPageRenderRange(), ...newPageIndex])
        }
    }, 500), [pageRenderRange])

    const handelScroll = () => {
        const documentContainerDom = documentContainerRef.current;
        const documentDom = documentRef.current

        if (!documentContainerDom || !documentDom) {
            return
        }
        documentContainerDom.addEventListener('scroll', (e) => {
            const {height: documentHeight} = documentDom.getBoundingClientRect();
            // 提前两页加载
            if (documentContainerDom.scrollTop <= 800 * 2) {
                handleAddFirst()
            } else if (documentContainerDom.scrollTop + 800 + 800 * 2 >= documentHeight) {
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

    const renderPage = (pageNumber: number) => {
        return <Page
            inputRef={pageRef}
            width={width}
            pageNumber={pageNumber}
            renderTextLayer={renderTextLayer}
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
        <button onClick={() => {
            console.log(pageRef.current);
            setRenderTextLayer(!renderTextLayer)
        }}>TEST
        </button>
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

                        // handelScroll();
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

