// sum.test.js
import {expect, test} from 'vitest'
import {getHighlightInfo, getHighlightInfoV2, getIntersection, splitBy, splitter} from "@/pages/MarkdownPanel/utils";

test('交集', () => {
    expect(getIntersection([1, 3], [2, 4])).toEqual([2, 3])
})


test('字符串匹配', async () => {
    const result = await getHighlightInfo('abcd', 'bc');
    console.log("🚀  ", result)
    expect(result).toEqual([1, 3])
})

test('字符串匹配v2', async () => {
    const result = getHighlightInfoV2('**调用示例**\n' +
        '\n' +
        '### text-to-image\n' +
        '\n' +
        '**介绍**', '调用示例\n\ntext-to-image');
    console.log("🚀  ", result)
    // expect(result).toEqual({startSlice: {}, endSlice: {}})
})

test('字符串切片测试', () => {
    const result = splitBy('**调用示例**\n' +
        '\n' +
        '### text-to-image\n' +
        '\n' +
        '**介绍**', splitter)
    console.log("🚀  ", result)
    // expect(result).toEqual({startSlice: {}, endSlice: {}})
})


