// sum.test.js
import {expect, test} from 'vitest'
import {getHighlightInfo, getHighlightInfoV2, getIntersection} from "@/pages/MarkdownPanel/utils";

test('交集', () => {
    expect(getIntersection([1, 3], [2, 4])).toEqual([2, 3])
})


test('字符串匹配', async () => {
    const result = await getHighlightInfo('abcd', 'bc');
    console.log("🚀  ", result)
    expect(result).toEqual([1, 3])
})

test('字符串匹配v2', async () => {
    const result = getHighlightInfoV2('#标题\nhi\n\nworld\nb!\n@', 'i\nworld\n\nb');
    console.log("🚀  ", result)
    expect(result).toEqual({startSlice: {}, endSlice: {}})
})
