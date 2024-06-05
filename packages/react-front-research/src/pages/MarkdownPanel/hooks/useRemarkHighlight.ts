import {useRemark} from "react-remark";
import {remarkText} from "@/pages/MarkdownPanel/plugins/remarkText.tsx";
import {useHighlightInfo} from "@/pages/MarkdownPanel/hooks/accurate-highlight-algorithm.ts";
import {useState} from "react";
import {HLInfoType} from "@/pages/MarkdownPanel/types.ts";
import {convertToArray} from "@/pages/MarkdownPanel/utils";

export const useRemarkHighlight = () => {
    const {highlight} = useHighlightInfo();


    const [highlightInfo, setHighlightInfo] = useState<HLInfoType>({
        startIndex: -1,
        endIndex: -1,
    });

    const [reactContent, setSource] = useRemark({
        remarkPlugins: [[remarkText, highlightInfo]],
    })


    return {
        reactContent,
        highlight: (source: string, target: string) => {
            setSource(source);
            highlight(convertToArray(source), convertToArray(target)).then(([a, b]) => {
                console.log("🚀  ", a, b)
                setHighlightInfo({
                    startIndex: a,
                    endIndex: b
                })
            })
        }
    }
}
