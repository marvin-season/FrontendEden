export const regex = /[\n*#|｜\-+\s`]/g;
type HLArrayType = {
    str: string;
    index: number
}

export const convertToArray = (str: string) => {
    return str.replace(regex, '').split('').map((str, index) => {
        return {
            index,
            str
        }
    })
}

export const useHighlightInfo = () => {

    const highlight = async (rawArr: HLArrayType[], searchArr: HLArrayType[]) => {
        console.log("🚀  ", {rawArr, searchArr})
        return new Promise<[number, number]>((resolve, reject) => {
            const searchText = searchArr.map(item => item.str).join('');
            let mdEndIndex = 0;
            let accText = "";
            // left => right
            while (mdEndIndex < rawArr.length) {
                const current = rawArr[mdEndIndex];
                accText += current.str;
                const index = accText.indexOf(searchText);
                if (searchText.length > 0 && index > -1) {
                    resolve([mdEndIndex + 1 - searchArr.length, mdEndIndex + 1])
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
