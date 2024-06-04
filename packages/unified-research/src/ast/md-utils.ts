import {convertToArray, useHighlightInfo} from "../utils/index.js";

export const getHighlightInfo = (s1: string, s2: string) =>
    useHighlightInfo().highlight(convertToArray(s1), convertToArray(s2))
