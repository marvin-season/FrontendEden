import {useEffect} from "react";
import * as pdfjsLib from "pdfjs-dist";
import {PDFPageProxy} from "pdfjs-dist";
import DocumentTracker from "@/components/DocumentTracker.ts";
import {TextItem} from "pdfjs-dist/types/src/display/api";
import {HighlightSet, PDFProps} from "@/components/PDFViewer.tsx";

export default function useHighlightInfo({file, onHighLight, searchText = ''}: PDFProps & {
    onHighLight: (highlightSet: HighlightSet, highlightPageIndexSet: Set<number>) => boolean;
}) {
    const getHighlightInfo = async () => {
        if (file) {
            const pdfDocumentProxy = await pdfjsLib.getDocument(await (file as Blob).arrayBuffer()).promise;

            const numPages = pdfDocumentProxy.numPages;
            const tracker = new DocumentTracker();
            for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
                const page: PDFPageProxy = await pdfDocumentProxy.getPage(pageIndex + 1);
                const {items} = await page.getTextContent()
                const result = await tracker.track(items as TextItem[], pageIndex, searchText);
                if (result) {
                    return onHighLight(tracker.highlightSet, tracker.highlightPageIndexSet)
                }
            }
        }
        return false
    }
    useEffect(() => {
        getHighlightInfo().then()
    }, [file]);

    return {
        getHighlightInfo
    }
}
