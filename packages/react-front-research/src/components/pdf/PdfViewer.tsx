import React, {useCallback, useEffect, useRef, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import {highlight} from "./utils/PdfHighlighter";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "./PdfViewer.css";

import type {PDFDocumentProxy} from "pdfjs-dist";
import type {TextItem} from "pdfjs-dist/types/src/display/api.js";
import type {ResolvedTextItem} from "./utils/PdfTracker";
import styled from "styled-components";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

const options = {
    cMapUrl: "/cmaps/",
    standardFontDataUrl: "/standard_fonts/",
};

export type PDFFile = string | File | null;

export type PdfViewerProps = {
    url: any;
    searchText: string;
    highlightColor?: string;
    page_scale?: number;
    width?: number;
    pageLoading?: React.ReactElement
};

const ProcessBox = styled.div<{ width: string }>`
  width: ${({width}) => width};
  height: 4px;
  background: #f3f0f0;
  border: 0.5px solid #8a8aee;
  border-radius: 4px;
  overflow: hidden;
`

const Process = styled.div<{ width: string }>`
  width: ${({width}) => width};
  background: #8a8aee;
  height: 4px;
`

const renderLoadingProcess: (n: number) => React.ReactElement = (n) => {
    return <>

        <ProcessBox width={'200px'}>
            <Process width={`${n}%`}></Process>
        </ProcessBox>
    </>
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
                                                        url,
                                                        width,
                                                        searchText,
                                                        highlightColor = '#27af81',
                                                        page_scale = 1.0,
                                                        pageLoading = <>loading page</>
                                                    }) => {
    const [file, setFile] = useState<PDFFile>(null);
    const [numPages, setNumPages] = useState<number>();
    const result = useRef<Map<string, ResolvedTextItem> | null>(null);
    const pdfContainerRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<boolean>(false);

    const [loadingProcess, setLoadingProcess] = useState(0)

    useEffect(() => {
        console.log(url)
        setLoadingProcess(0)
    }, [url]);

    function onDocumentLoadSuccess({
                                       numPages: nextNumPages,
                                   }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    useEffect(() => {
        (async () => {
            highlightRef.current = false
            if (searchText)
                result.current = await highlight(url, searchText);
            setFile(url);
        })();

        return () => {
            setFile('');
            setNumPages(0);
            result.current = null
        }
    }, [url, searchText]);

    const customTextRenderer = useCallback<
        (
            textItem: {
                pageIndex: number;
                pageNumber: number;
                itemIndex: number;
            } & TextItem
        ) => string
    >(
        (textItem) => {
            const key = `${textItem.pageIndex}-${textItem.itemIndex}`;
            if (result.current?.has(key)) {

                return `<mark id="pdf-highlight" style="background:#fff;color:${highlightColor}">${textItem.str}</mark>`;
            }
            return "";
        },
        []
    );

    const handleRenderTextLayerSuccess = () => {
        const targetElement = document.getElementById('pdf-highlight') as HTMLElement | null; // 替换为你的目标元素的实际ID
        if (targetElement && !highlightRef.current) {
            highlightRef.current = true
            // console.log('跳转到高亮位置', searchText);

            // 使用scrollIntoView方法滚动到目标元素
            targetElement.scrollIntoView({
                behavior: 'smooth', // 可选，平滑滚动效果
                block: 'center' // 可选，指定对齐方式（start表示顶部，end表示底部，center表示中间）
            });
        }

    }

    return (
        <div className="Viewer">
            <div className="Viewer__container" ref={pdfContainerRef}>
                {
                    loadingProcess < 100 && renderLoadingProcess(loadingProcess)
                }
                <div className="Viewer__container__document"
                     style={{visibility: loadingProcess >= 100 ? 'visible' : 'hidden'}}>
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={renderLoadingProcess(loadingProcess)}
                        onLoadProgress={({loaded, total}) => {
                            let process = Math.floor(loaded * 100 / total);
                            setLoadingProcess(process / 2)
                        }}

                        options={options}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                renderAnnotationLayer={false}
                                width={width}
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                scale={page_scale}
                                loading={'loading page'}
                                onRenderSuccess={({_pageIndex}) => {
                                    if (_pageIndex == 0) {
                                        const timer = setInterval(() => {
                                            setLoadingProcess(prevState => {
                                                if (timer && prevState >= 100) {
                                                    clearInterval(timer)
                                                    return 100
                                                }
                                                return prevState + 2
                                            })
                                        }, 4)
                                    }
                                }}
                                onRenderTextLayerSuccess={handleRenderTextLayerSuccess}
                                customTextRenderer={customTextRenderer}
                            />
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
};
