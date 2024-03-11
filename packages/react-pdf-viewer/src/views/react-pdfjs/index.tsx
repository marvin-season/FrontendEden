import React, {useCallback, useEffect, useRef} from "react";

import * as pdfjs from "pdfjs-dist";
import {RenderParameters} from "pdfjs-dist/types/src/display/api";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

export const ReactPdfjs: React.FC<{}> = props => {
    const canvasElement = useRef<HTMLCanvasElement>(null);

    const renderPage = async (scale: number) => {
        const {current: canvas} = canvasElement;
        if (!canvas) {
            return
        }
        const document = pdfjs.getDocument('/math.pdf');
        const pdfDocumentProxy = await document.promise;
        const pdfPageProxy = await pdfDocumentProxy.getPage(3);

        const viewport = pdfPageProxy.getViewport({scale: scale * devicePixelRatio});

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        canvas.style.visibility = 'hidden';


        const renderContext: RenderParameters = {
            canvasContext: canvas.getContext('2d', {alpha: false}) as CanvasRenderingContext2D,
            viewport,
        };

        pdfPageProxy.render(renderContext).promise.then(() => {
            canvas.style.visibility = '';
        })
    }

    const cleanup = useCallback(() => {
        const {current: canvas} = canvasElement;

        if (canvas) {
            canvas.width = 0;
            canvas.height = 0;
        }
    }, [canvasElement]);

    useEffect(() => cleanup, [canvasElement]);

    return (
        <>
            <button onClick={() => renderPage(1)}
                    style={{position: 'fixed', right: 0, height: '50px', zIndex: 999}}>
                render
            </button>
            <canvas
                ref={canvasElement}
                style={{
                    display: 'block',
                    userSelect: 'none',
                }}
            >
            </canvas>
        </>
    );
};
