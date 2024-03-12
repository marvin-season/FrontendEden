import {createContext, FC, useContext, useEffect, useRef} from "react";
import * as pdfjs from "pdfjs-dist";
import {PDFPageProxy} from "pdfjs-dist";
import {PdfjsCanvas} from "@/components/ReactPDF/react-pdfjs/canvas.tsx";
import {PDFDocumentContext} from "@/components/ReactPDF/Document.tsx";

interface PageProps {
    pageNumber: number;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

export const PDFPageContext = createContext<
    {
        page?: PDFPageProxy;
    }
>({})

export const Page: FC<PageProps> = ({
                                        pageNumber,

                                    }) => {
    const pageRef = useRef<PDFPageProxy>()
    const {
        pdf
    } = useContext(PDFDocumentContext);


    useEffect(() => {
        (async () => {
            if (pdf) {
                pageRef.current = await pdf.getPage(pageNumber);

            }
        })()
    }, []);

    return <PDFPageContext.Provider value={{
        page: pageRef.current
    }}>
        <PdfjsCanvas pageNumber={pageNumber}/>
    </PDFPageContext.Provider>
}
