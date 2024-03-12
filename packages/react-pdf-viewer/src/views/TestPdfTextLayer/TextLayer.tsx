import React, {useLayoutEffect, useRef} from "react";
import {PDFDocumentProxy, PDFPageProxy, renderTextLayer} from "pdfjs-dist";
import './TextLayer.css';
import {TextItem, TextMarkedContent} from "pdfjs-dist/types/src/display/api";

function isTextItem(item: TextItem | TextMarkedContent): item is TextItem {
    return 'str' in item;
}

export const TextLayer: React.FC<{
    pageNumber: number;
    pdf?: PDFDocumentProxy;
    pageProxy: PDFPageProxy;
    customTextRenderer?: Function
}> = ({
          pageNumber, pdf, customTextRenderer,pageProxy
      }) => {

    const pageLayerRef = useRef<HTMLDivElement>(null);
    const handleRenderTextLayer = () => {
        const layer = pageLayerRef.current;

        if (!layer) {
            return
        }
        layer.innerHTML = '';

        const textContentSource = pageProxy.streamTextContent({includeMarkedContent: true});
        const viewport = pageProxy.getViewport();

        const parameters = {
            container: layer,
            textContentSource,
            viewport,
        };
        const runningTask = renderTextLayer(parameters);

        runningTask.promise.then(async (a) => {
            const end = document.createElement('div');
            end.className = 'endOfContent';
            layer.append(end);
            const layerChildren = layer.querySelectorAll('[role="presentation"]') as NodeListOf<HTMLElement>;

            if (customTextRenderer) {
                const textContent = await pageProxy.getTextContent();
                let index = 0;
                console.log(layerChildren.length);
                textContent.items.forEach((item, itemIndex) => {
                    if (!isTextItem(item)) {
                        return;
                    }
                    const child: HTMLElement = layerChildren[index];

                    if (!child || !customTextRenderer) {
                        return;
                    }
                    if (child.innerText != item.str) {
                    }
                    const content = customTextRenderer({
                        pageIndex: pageNumber - 1,
                        pageNumber,
                        itemIndex,
                        ...item,
                    });

                    if (item.str && item.hasEOL) {
                        console.log(item.str)
                    }

                    child.innerHTML = content;

                    index += item.str && item.hasEOL ? 2 : 1;

                });

            }
        });

        return () => runningTask?.cancel()
    }

    useLayoutEffect(handleRenderTextLayer, [pageNumber, pageProxyRef]);


    return (<>
            <div className={'react-pdf__Page__textContent textLayer'} ref={pageLayerRef}></div>
        </>
    )
};
