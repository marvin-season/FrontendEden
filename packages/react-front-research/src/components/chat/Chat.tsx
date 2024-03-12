import React, {createContext, FC, ReactElement, useContext} from "react";
import {Flex} from "@/styled";

export interface ChatItem {
    content: string;
    type?: 'normal' | 'file';
    id: string;
    parentId?: string;
    sonIds?: string[];
    role: 'answer' | 'question';
}

interface QuestionChatItem extends ChatItem {
}

interface AnswerChatItem extends ChatItem {

}

interface ChatProps {
    chatList: ChatItem[]
}


const useChatContext = () => {
    return useContext(ChatContext)
}


function AnswerPanel({chatItem}: { chatItem: AnswerChatItem }) {
    return <Flex>
        <Flex>
            答
        </Flex>
        <Flex>
            {chatItem.content}
        </Flex>

    </Flex>;
}

function QuestionPanel({chatItem}: { chatItem: QuestionChatItem }) {
    return <Flex>
        <Flex>
            {chatItem.content}
        </Flex>
        <Flex>
            问
        </Flex>
    </Flex>;
}

function ChatList() {
    const {chatList, renderAnswerPanel, renderQuestionPanel} = useChatContext();


    return <>
        {
            chatList.map(chatItem => {
                return <>
                    {
                        chatItem.role === 'question' && renderQuestionPanel(chatItem)
                    }
                    {
                        chatItem.role === 'answer' && renderAnswerPanel(chatItem)
                    }
                </>
            })
        }
    </>;
}

export const ChatContext = createContext<{
    renderAnswerPanel: (chatItem: AnswerChatItem) => ReactElement;
    renderQuestionPanel: (chatItem: QuestionChatItem) => ReactElement
    chatList: ChatItem[]
}>({
    chatList: [],
    renderQuestionPanel: () => <></>,
    renderAnswerPanel: () => <></>
})

export const Chat: FC<ChatProps> = ({chatList}) => {


    return <ChatContext.Provider value={{
        chatList: chatList,
        renderAnswerPanel: (chatItem) => <AnswerPanel chatItem={chatItem}/>,
        renderQuestionPanel: (chatItem) => <QuestionPanel chatItem={chatItem}/>,
    }}>
        <ChatList/>
    </ChatContext.Provider>
}
