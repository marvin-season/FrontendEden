import {useRemark} from "react-remark";
import {remarkText} from "@/pages/MarkdownPanel/plugins/remarkText.tsx";
import {HLInfoType} from "@/pages/MarkdownPanel/types.ts";
import {getHighlightInfo} from "@/pages/MarkdownPanel/algorithm";
import {useGetState} from "ahooks";
import {useEffect} from "react";

/**
 * setHighlightInfo 后 不触发重新渲染
 * remarkPlugins 添加了html元素被隐藏
 * @param source
 */
export const useRemarkHighlight = (source: string) => {

    const [highlightInfo, setHighlightInfo] = useGetState<HLInfoType>({
        startIndex: 2,
        endIndex: 6
    });

    const [reactContent, setSource] = useRemark({
        remarkPlugins: highlightInfo ? [[remarkText, highlightInfo]] : [],
        remarkToRehypeOptions: {
            allowDangerousHtml: true
        },
    })

    useEffect(() => {
        setSource(source);
        getHighlightInfo(source, '任务').then(([a, b]) => {
            console.log("🚀  ", a, b)
            setHighlightInfo({
                startIndex: a,
                endIndex: b
            })

        })
    }, [source]);

    return {
        reactContent,
        highlight: (target: string) => {
            setSource(source);
            getHighlightInfo(source, target).then(([a, b]) => {
                setHighlightInfo({
                    startIndex: a,
                    endIndex: b
                })

            })
        }
    }
}
