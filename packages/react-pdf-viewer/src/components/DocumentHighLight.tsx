import {useEffect} from "react";
import * as pdfjsLib from "pdfjs-dist";
import {HighlightSet, PDFProps} from "@/components/PDFViewer.tsx";

export default function DocumentHighLight({file}: PDFProps & {
    onHighLight: (highlightMap: HighlightSet) => void
}) {
    useEffect(() => {
        (async () => {
            if (file) {
                const pdf = await pdfjsLib.getDocument(await (file as Blob).arrayBuffer()).promise;
                let page = await pdf.getPage(1);
                let textContent = await page.getTextContent();
                console.log('textContent', textContent)

            }
        })()
    }, [file]);
    return null;
}
