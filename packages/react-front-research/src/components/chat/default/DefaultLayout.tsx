import {AnswerChatItem, QuestionChatItem} from "@/components/chat/types.ts";
import {Flex} from "@/styled";
import React from "react";
import {useChatContext} from "@/components/chat/context/ChatContext.tsx";

export function AnswerPanel({chatItem}: { chatItem: AnswerChatItem }) {
    return <Flex style={{
        background: 'lightblue'
    }}>
        <Flex>
            答
        </Flex>
        <Flex>
            {chatItem.content}
        </Flex>

    </Flex>;
}

export function QuestionPanel({chatItem}: { chatItem: QuestionChatItem }) {
    return <Flex style={{
        background: 'lightcyan'
    }}>
        <Flex>
            {chatItem.content}
        </Flex>
        <Flex>
            问
        </Flex>
    </Flex>;
}

export function ChatList() {
    const {chatList, renderAnswerPanel, renderQuestionPanel, renderChatItemLayout} = useChatContext();
    return <>
        {
            renderChatItemLayout?.(chatList, renderAnswerPanel, renderQuestionPanel)
        }
    </>;
}
