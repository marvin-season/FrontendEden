import React, {createContext, FC, useEffect, useRef} from "react";
import * as pdfjs from "pdfjs-dist";
import {PDFDocumentProxy} from "pdfjs-dist";

interface DocumentProps {
    file: Blob | string | ArrayBuffer;
    children: React.ReactElement[]
}

export const PDFDocumentContext = createContext<{
    pdf?: PDFDocumentProxy;
}>({})
const Document: FC<DocumentProps> = ({
                                         children,
                                         file
                                     }) => {
    const pdfDocumentProxyRef = useRef<PDFDocumentProxy>();

    useEffect(() => {
        (async () => {
            const document = pdfjs.getDocument('/math.pdf');
            pdfDocumentProxyRef.current = await document.promise
        })()

    }, [file]);

    return <PDFDocumentContext.Provider value={{
        pdf: pdfDocumentProxyRef.current
    }}>
        {children}
    </PDFDocumentContext.Provider>
}
