import {AnswerChatItem, ChatItem, ChatProps, QuestionChatItem} from "@/components/chat/types.ts";
import React, {FC, useMemo, useState} from "react";
import {Flex} from "@/styled";
import {groupBy} from "@root/shared";

export const groupRender: ChatProps['renderChatItemLayout'] = (chatList, renderAnswerPanel, renderQuestionPanel) => {

    const groupedChatList = useMemo(() => {
        return groupBy<ChatItem>(chatList, 'groupId') as ChatItem[][]
    }, [chatList.length]);

    console.log('groupedChatList', groupedChatList)
    return <div>
        {
            groupedChatList.map((groupItem, index) => {
                return <SwiperChatItemPanel list={groupItem} key={index}/>
            })
        }
    </div>
}

export const SwiperChatItemPanel: FC<{ list: ChatItem[] }> = ({list}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleChangeIndex = (i: number) => {
        console.log(currentIndex);
        if (currentIndex + i < 0 || currentIndex + i > list.length - 1) {
            return;
        }

        setCurrentIndex(currentIndex + i);
    };
    return <>

        {
            list[currentIndex].role == "answer" && AnswerPanel({chatItem: list[currentIndex]})
        }
        {
            list[currentIndex].role == "question" && QuestionPanel({chatItem: list[currentIndex]})
        }

        {
            list.length > 1 && <Flex>
                <div style={{cursor: "pointer"}} onClick={() => handleChangeIndex(-1)}>{'<'}</div>
                {currentIndex + 1}/{list.length}
                <div style={{cursor: "pointer"}} onClick={() => handleChangeIndex(1)}>{'>'}</div>
            </Flex>
        }
    </>
}

export function QuestionPanel({chatItem}: { chatItem: QuestionChatItem }) {
    return <Flex style={{
        background: 'lightcyan',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '8px',
        boxSizing: 'border-box'
    }}>
        <Flex>
            {chatItem.content}
        </Flex>
    </Flex>;
}

export function AnswerPanel({chatItem}: { chatItem: AnswerChatItem }) {
    return <Flex style={{
        background: 'lightblue',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '8px',
        boxSizing: 'border-box'
    }}>
        <Flex>
            {chatItem.content}
        </Flex>

    </Flex>;
}


