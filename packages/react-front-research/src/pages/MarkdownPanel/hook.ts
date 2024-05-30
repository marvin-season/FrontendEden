const regex = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;
const textSplitRegex = /\n+/;
const headerRegex = /^(#{0,5})\s*(.+)$/gm;

export const useHighlightInfoMD = (raw: string, search: string) => {

    const getRawIndexRange = (startArrIndex: number, endArrIndex: number) => {
        let startIndex = 0, endIndex = 0;
        rawArr.forEach((item, index) => {

            if (index <= startArrIndex) {
                startIndex += item.length
                endIndex += item.length

            }
            if (index <= endArrIndex) {
                endIndex += item.length
            }
        })
        return [startIndex, endIndex];
    }

    const pText = search.replace(regex, "");
    const searchArr = search.split(textSplitRegex);
    const rawArr = raw.split(textSplitRegex);
    console.log("🚀  arr", {rawArr, searchArr})

    let mdEndIndex = 0;
    let accText = "";
    // left => right
    while (mdEndIndex < rawArr.length) {
        const text = rawArr[mdEndIndex];
        accText += text.replace(regex, "");
        const index = accText.indexOf(pText);
        if (pText.length > 0 && index > -1) {
            console.log("🚀  ", mdEndIndex - searchArr.length + 1, mdEndIndex + 1)
            return getRawIndexRange(mdEndIndex - searchArr.length + 1, mdEndIndex + 1)
            // return [mdEndIndex - searchArr.length + 1, mdEndIndex + 1]
        }
        mdEndIndex += 1;
    }


    return [0, 0]
}
