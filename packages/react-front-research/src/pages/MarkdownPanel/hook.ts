const regex = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;
type HLArrayType = {
    str: string;
    index: number
}

export const useHighlightInfo = () => {

    const highlight = async (rawArr: HLArrayType[], searchArr: HLArrayType[]) => {
        return new Promise<[number, number]>((resolve, reject) => {
            const searchText = searchArr.map(item => item.str).join('').replace(regex, "");
            let mdEndIndex = 0;
            let accText = "";
            // left => right
            while (mdEndIndex < rawArr.length) {
                const current = rawArr[mdEndIndex];
                accText += current.str.replace(regex, "");
                const index = accText.indexOf(searchText);
                if (searchText.length > 0 && index > -1) {
                    console.log("🚀  ", mdEndIndex - searchArr.length + 1, mdEndIndex + 1)
                    resolve([mdEndIndex - searchArr.length + 1, mdEndIndex + 1])
                    return
                }
                mdEndIndex += 1;
            }
            resolve([0, 0])
        })
    }

    return {
        highlight,
    }
}
