import {PDFDocumentProxy, PDFPageProxy} from "pdfjs-dist";
import DocumentTracker from "./DocumentTracker";
import {TextItem} from "pdfjs-dist/types/src/display/api";
import {HighlightResultInfoType, PDFProps} from "./PDFViewer";
import md5 from 'js-md5'
import lodash from 'lodash';
import {useMemo} from "react";

const resMap: Record<string, HighlightResultInfoType> = {}

export default function useHighlightInfo({searchText = '', file}: PDFProps) {

    const key = useMemo(() => {
        return md5.md5(searchText)
    }, [searchText])

    const getHighlightInfo = async ({pdfDocumentProxy}: { pdfDocumentProxy?: PDFDocumentProxy }) => {
        if (searchText?.length <= 0) {
            return false
        }

        if(resMap[key]){
            console.log('cached', resMap[key])
            return lodash.cloneDeep(resMap[key])
        }

        if (pdfDocumentProxy) {
            const numPages = pdfDocumentProxy.numPages;
            const tracker = new DocumentTracker();
            for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
                const page: PDFPageProxy = await pdfDocumentProxy.getPage(pageIndex + 1);
                const {items} = await page.getTextContent()
                const tracked = await tracker.track(items as TextItem[], pageIndex, searchText);
                if (tracked) {
                    const result: HighlightResultInfoType = {
                        highlightSet: tracker.highlightSet,
                        pages: tracker.highlightPageIndexSet
                    };
                    resMap[key] = lodash.cloneDeep(result);

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
