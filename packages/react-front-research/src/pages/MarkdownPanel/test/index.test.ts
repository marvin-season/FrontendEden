// sum.test.js
import {expect, test} from 'vitest'
import {getHighlightInfo, getIntersection} from "@/pages/MarkdownPanel/utils";

test('交集', () => {
    expect(getIntersection([1, 3], [2, 4])).toEqual([2, 3])
})


test('字符串匹配', async () => {
    const result = await getHighlightInfo('abcd', 'bc');
    console.log("🚀  ", result)
    expect(result).toEqual([1, 3])
})
