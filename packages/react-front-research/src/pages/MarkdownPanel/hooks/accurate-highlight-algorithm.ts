import {regex} from "@/pages/MarkdownPanel/utils";

export const useHighlightInfo = () => {
    const highlight = async (rawArr: HLArrayType[], searchArr: HLArrayType[]) => {
        // console.log("🚀  ", {rawArr, searchArr})
        return new Promise<[number, number]>((resolve) => {
            const searchText = searchArr.map(item => item.str).join('');
            let accText = "";
            // left => right
            for (let i = 0; i < rawArr.length; i++) {
                const current = rawArr[i];

                if (regex.test(current.str)) {
                    regex.lastIndex = 0
                    continue
                }

                accText += current.str;
                const index = accText.indexOf(searchText.replace(regex, ''));
                if (searchText.length > 0 && index > -1) {
                    // console.log("🚀  accText", accText)
                    // rawArr[i].index + 1 - searchArr.length 当searchArray和原文不完全一致时（过滤掉了md语法） 这种简单的计算方法会导致精度问题
                    resolve([rawArr[i].index + 1 - searchArr.length, rawArr[i].index + 1])
                    return
                }
            }
            resolve([0, 0])
        })
    }

    return {
        highlight,
    }
}
