import {TextItem} from "pdfjs-dist/types/src/display/api";
import {HighlightSet} from "@/components/PDFViewer.tsx";

type resolveItemNode = {
    value: TextItem[];
    next: null | resolveItemNode;
    prev: null | resolveItemNode;
}

export default class DocumentTracker {
    maxPage;
    trackedPage: number = 0; // 已经解析的页码个数
    resolveItemsChain: resolveItemNode; // 头节点
    pointer: resolveItemNode | null = null;
    resolveText = '';
    highlightSet: HighlightSet = new Set()
    readonly regex = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;

    constructor(maxPage = 3, regex?: RegExp) {
        this.maxPage = maxPage;

        this.resolveItemsChain = {
            value: [],
            next: null,
            prev: null
        }
    }

    async track(items: TextItem[], pageIndex: number, text: string) {
        // 最多跨页: 2
        if (this.trackedPage > this.maxPage && this.resolveItemsChain?.next) {
            this.resolveItemsChain.next.prev = null
            this.resolveItemsChain = this.resolveItemsChain.next
        }
        debugger

        const resolveItems: TextItem[] = [];

        this.pointer = this.resolveItemsChain;
        while (this.pointer.next != null) {
            this.pointer = this.pointer.next
        }

        this.pointer.next = {value: resolveItems, next: null, prev: this.pointer} // 双向
        this.pointer = this.pointer.next
        this.trackedPage += 1;

        const searchText = text.replace(this.regex, '');
        for (let index = 0; index < items.length; index++) {
            resolveItems.push(items[index])
            this.resolveText += items[index].str.replace(this.regex, '');
            if (this.resolveText.indexOf(searchText) != -1) {
                // resolveItems has been searched Text
                let str = '';

                while (this.pointer.prev) {
                    const resolveItems = this.pointer.value;
                    for (let reverseIndex = resolveItems.length - 1; reverseIndex >= 0; reverseIndex--) {
                        str = resolveItems[reverseIndex].str.replace(this.regex, '') + str;
                        this.highlightSet.add(`${pageIndex}-${reverseIndex}`)
                        if (str.indexOf(searchText) != -1) {
                            return true
                        }
                    }

                    this.pointer = this.pointer.prev
                }
            }
        }

        return false
    }
}
