import React, {useCallback, useContext, useEffect, useRef} from "react";

import * as pdfjs from "pdfjs-dist";
import {RenderParameters} from "pdfjs-dist/types/src/display/api";
import {PDFPageContext} from "@/components/ReactPDF";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

export const PdfjsCanvas: React.FC<{
    pageNumber: number;
}> = ({pageNumber}) => {
    const {
        page
    } = useContext(PDFPageContext)
    const canvasElement = useRef<HTMLCanvasElement>(null);

    const renderPage = async (pageNumber: number, scale: number) => {
        const {current: canvas} = canvasElement;
        if (!canvas || !page) {
            return
        }

        const viewport = page.getViewport({scale: scale * devicePixelRatio});

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        canvas.style.visibility = 'hidden';


        const renderContext: RenderParameters = {
            canvasContext: canvas.getContext('2d', {alpha: false}) as CanvasRenderingContext2D,
            viewport,
        };

        page.render(renderContext).promise.then(() => {
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

    useEffect(() => {
        renderPage(pageNumber, 1).then();
    }, []);

    return (
        <canvas
            ref={canvasElement}
            style={{
                display: 'block',
                userSelect: 'none',
            }}
        >
        </canvas>
    );
};
