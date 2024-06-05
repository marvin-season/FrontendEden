import {useHighlightInfo} from "@/pages/MarkdownPanel/hooks/accurate-highlight-algorithm.ts";

export const regex = /[\[\]\\()\n*#|｜\-+\s`]/g;

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
        return [minIntersection, maxIntersection]
    } else {
        return [-1, -1]
    }
}


export const convertToArray = (str: string) => {
    return str.split('').map((str, index) => {
        return {
            index,
            str
        }
    })
}


export const getHighlightInfo = (s1: string, s2: string) =>
    useHighlightInfo().highlight(convertToArray(s1), convertToArray(s2))
