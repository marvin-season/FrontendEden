import {TextItem} from "pdfjs-dist/types/src/display/api";
import {HighlightSet} from "@/components/PDFViewer.tsx";

export default class DocumentTracker {
    maxPage;
    resolveItems: TextItem[] = [];
    resolvePageIndex = 0;
    resolveText = '';
    highlightSet: HighlightSet = new Set()
    readonly regex = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;

    constructor(maxPage = 3, regex?: RegExp) {
        this.maxPage = maxPage
    }

    async track(items: TextItem[], pageIndex: number, text: string) {
        // 最多跨页: 3
        if (pageIndex - this.resolvePageIndex >= this.maxPage) {
            this.resolveItems = []
            this.resolvePageIndex = pageIndex;
        }
        const searchText = text.replace(this.regex, '');
        for (let index = 0; index < items.length; index++) {
            this.resolveItems.push(items[index])
            this.resolveText += items[index].str.replace(this.regex, '');
            debugger
            if (this.resolveText.indexOf(searchText) != -1) {
                // resolveItems has searchText
                let str = '';
                for (let reverseIndex = this.resolveItems.length - 1; reverseIndex >= 0; reverseIndex--) {
                    str = this.resolveItems[reverseIndex].str.replace(this.regex, '') + str;
                    this.highlightSet.add(`${pageIndex}-${reverseIndex}`)
                    if (str.indexOf(searchText) != -1) {
                        return true
                    }
                }
            }
        }

        return false
    }
}
