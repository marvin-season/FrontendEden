import {useRemark} from "react-remark";
import {remarkText} from "@/pages/MarkdownPanel/plugins/remarkText.tsx";
import {useHighlightInfo} from "@/pages/MarkdownPanel/hooks/accurate-highlight-algorithm.ts";
import {useEffect, useState} from "react";
import {HLInfoType} from "@/pages/MarkdownPanel/types.ts";
import {convertToArray} from "@/pages/MarkdownPanel/utils";

export const useRemarkHighlight = (source: string, target: string) => {
    const {highlight} = useHighlightInfo();


    const [highlightInfo, setHighlightInfo] = useState<HLInfoType>({
        startIndex: -1,
        endIndex: -1,
    });

    const [reactContent, setSource] = useRemark({
        remarkPlugins: [[remarkText, highlightInfo]],
    })


    useEffect(() => {
        setSource(source);
    }, []);

    return {
        reactContent,
        highlight: () => {
            highlight(convertToArray(source), convertToArray(target)).then(([a, b]) => {
                setHighlightInfo({
                    startIndex: a,
                    endIndex: b
                })
            })
        }
    }
}
