export const regex = /[\[\]\\()\n*#|｜\-+\s`]/g;
type HLArrayType = {
    str: string;
    index: number
}

export const getIntersection = (array1: [number, number], array2: [number, number]) => {
    // 获取每个数组的最小值和最大值
    const min1 = Math.min(...array1);
    const max1 = Math.max(...array1);
    const min2 = Math.min(...array2);
    const max2 = Math.max(...array2);

    // 计算交集范围
    const minIntersection = Math.max(min1, min2);
    const maxIntersection = Math.min(max1, max2);

    // 检查是否存在交集范围
    if (minIntersection <= maxIntersection) {
        console.log(`交集范围: [${minIntersection}, ${maxIntersection})`);
        return [minIntersection, maxIntersection]
    } else {
        return [-1, -1]
    }
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
