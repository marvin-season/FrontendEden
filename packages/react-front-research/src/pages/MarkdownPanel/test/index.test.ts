// sum.test.js
import {expect, test} from 'vitest'
import {getIntersection} from "@/pages/MarkdownPanel/HLMarked.tsx";

test('交集', () => {
    expect(getIntersection([1, 3], [2, 4])).toEqual([2, 3])
})
