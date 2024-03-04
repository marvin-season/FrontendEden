import {useEffect} from "react";
import * as pdfjsLib from "pdfjs-dist";
import {PDFPageProxy} from "pdfjs-dist";
import {HighlightSet, PDFProps} from "@/components/PDFViewer.tsx";
import DocumentTracker from "@/components/DocumentTracker.ts";
import {TextItem} from "pdfjs-dist/types/src/display/api";


export default function DocumentHighLight({file, searchText, onHighLight}: PDFProps & {
    onHighLight: (highlightSet: HighlightSet, highlightPageIndexSet: Set<number>) => void;
    searchText: string;
}) {
    useEffect(() => {
        (async () => {
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
        })()
    }, [file]);
    return null;
}
