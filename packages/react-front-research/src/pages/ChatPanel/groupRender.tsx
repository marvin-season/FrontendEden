import {ChatItem, ChatProps} from "@/components/chat/types.ts";
import React, {FC, useMemo, useState} from "react";
import {Flex} from "@/styled";
// @ts-ignore
import {groupBy} from "@root/shared";
import {Typography} from "antd";
import {useChatContext} from "@/components/chat/context/ChatContext.tsx";
import {CommonPanel} from "@/components/chat/default/DefaultLayout.tsx";
import {withContainerStyle} from "@/pages/ChatPanel/hoc.tsx";
import {defaultAnswerPanelRender, defaultQuestionPanelRender} from "@/components/chat/default/DefaultRender.tsx";

const QuestionPanel = withContainerStyle(CommonPanel, {
    background: '#eee',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

const AnswerPanel = withContainerStyle(CommonPanel, {
    background: '#ddd',
    justifyContent: 'flex-start',
    alignItems: 'center',
});

export const groupRenderLayout: ChatProps['renderChatItemLayout'] = (chatList, renderAnswerPanel, renderQuestionPanel) => {

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
    const {onReload} = useChatContext();
    const handleChangeIndex = (i: number) => {
        console.log(currentIndex);
        if (currentIndex + i < 0 || currentIndex + i > list.length - 1) {
            return;
        }

        setCurrentIndex(currentIndex + i);
    };
    return <>
        {/*回答*/}
        {
            list[currentIndex].role == "answer" && <>
                <AnswerPanel chatItem={list[currentIndex]} renderChildren={defaultAnswerPanelRender}/>
                <Flex>
                    {
                        list.length > 1 && <Flex>
                            <div style={{cursor: "pointer"}} onClick={() => handleChangeIndex(-1)}>{'<'}</div>
                            {currentIndex + 1}/{list.length}
                            <div style={{cursor: "pointer"}} onClick={() => handleChangeIndex(1)}>{'>'}</div>
                        </Flex>
                    }
                    <Typography.Link type="success" onClick={() => onReload?.(list[currentIndex])}>reload</Typography.Link>
                </Flex>
            </>
        }

        {/*问题*/}
        {
            list[currentIndex].role == "question" &&
            <QuestionPanel chatItem={list[currentIndex]} renderChildren={defaultQuestionPanelRender}></QuestionPanel>
        }
    </>
}


