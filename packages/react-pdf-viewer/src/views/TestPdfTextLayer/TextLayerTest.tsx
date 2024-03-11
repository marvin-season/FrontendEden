import {Document, Page, pdfjs} from "react-pdf";
import {useRef} from "react";
import {PDFDocumentProxy, renderTextLayer} from "pdfjs-dist";
// import "react-pdf/dist/Page/TextLayer.css";
import './TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

function TextLayerTest() {
    const pdfProxy = useRef<PDFDocumentProxy>();
    const pageLayerRef = useRef<HTMLDivElement>(null);
    const handleRenderTextLayer = async () => {
        if (!pdfProxy.current || !pageLayerRef.current) {
            {
                return
            }
        }

        const pageProxy = await pdfProxy.current.getPage(3)
        const textContentSource = pageProxy.streamTextContent({includeMarkedContent: true});
        const viewport = pageProxy.getViewport();

        console.log('textContentSource', textContentSource)
        const parameters = {
            container: pageLayerRef.current,
            textContentSource,
            viewport,
        };
        renderTextLayer(parameters);
    }
    return (<>
            <button onClick={handleRenderTextLayer}
                    style={{position: 'fixed', right: 0, height: '50px', zIndex: 999}}>handleRenderTextLayer
            </button>
            <Document file={'/math.pdf'} onLoadSuccess={pdf => {
                pdfProxy.current = pdf
            }}>
                <Page pageIndex={2} renderTextLayer={false}></Page>
                <div className={'react-pdf__Page__textContent textLayer'} ref={pageLayerRef} style={{
                    color: 'blue'
                }}></div>
            </Document>
        </>
    )
}

export default TextLayerTest
