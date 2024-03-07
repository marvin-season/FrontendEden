import {PDFDocumentProxy, PDFPageProxy} from "pdfjs-dist";
import DocumentTracker from "./DocumentTracker";
import {TextItem} from "pdfjs-dist/types/src/display/api";
import {PDFProps} from "./PDFViewer";

export default function useHighlightInfo({searchText = '', file}: PDFProps) {

    const getHighlightInfo = async ({pdfDocumentProxy}: { pdfDocumentProxy?: PDFDocumentProxy }) => {
        if (searchText?.length <= 0) {
            return false
        }


        if (pdfDocumentProxy) {
            const numPages = pdfDocumentProxy.numPages;
            const tracker = new DocumentTracker();
            for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
                const page: PDFPageProxy = await pdfDocumentProxy.getPage(pageIndex + 1);
                const {items} = await page.getTextContent()
                const tracked = await tracker.track(items as TextItem[], pageIndex, searchText);
                if (tracked) {
                    const result = {
                        highlightSet: tracker.highlightSet,
                        highlightPageIndexSet: tracker.highlightPageIndexSet
                    };

                    return result
                }
            }

        }

        return false
    }

    return {
        getHighlightInfo
    }
}
