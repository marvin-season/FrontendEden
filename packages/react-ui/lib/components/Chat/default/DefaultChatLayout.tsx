import React, {FC} from "react";
import {ChatItem, renderAnswerPanelType, renderQuestionPanelType} from "@/types";
import {useChatContext} from "@/components/Chat/context/ChatContext.tsx";

export const DefaultChatLayout: FC<{
    chatList: ChatItem[],
    renderAnswerPanel?: renderAnswerPanelType,
    renderQuestionPanel?: renderQuestionPanelType
}> = ({chatList, renderAnswerPanel, renderQuestionPanel}) => {
    const {onReload} = useChatContext();

    return <>
        {
            chatList.map((chatItem, index) => {
                return <div key={index}>
                    {
                        renderQuestionPanel?.(chatItem.questions)
                    }
                    {
                        renderAnswerPanel?.(chatItem.answers, onReload)
                    }
                </div>
            })
        }
    </>;
}
