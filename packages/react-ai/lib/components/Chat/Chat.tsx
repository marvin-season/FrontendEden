import React, {FC} from "react";
import {ChatProps} from "@/types/chat.tsx";
import {ChatContext} from "./context/ChatContext.tsx";
import {Button, Flex, Divider} from "antd";
import {DefaultQuestionLayout} from "@/components/Chat/default/DefaultQuestionLayout.tsx";
import {UserInput} from "@/components/Chat/default/UserInput.tsx";
import {ChatListLayout} from "@/components/Chat/default/ChatListLayout.tsx";
import {DefaultAnswerLayout} from "@/components/Chat/default/DefaultAnswerLayout.tsx";
import styles from "./styles.module.css";
import {ChatActionType, ChatStatus} from "@/constant";

export const Chat: FC<ChatProps> =
    ({
         QuestionLayout = DefaultQuestionLayout,
         AnswerLayout = DefaultAnswerLayout,
         ...restProps
     }) => {

        return <ChatContext.Provider value={{
            QuestionLayout,
            AnswerLayout,
            ...restProps,
        }}>
            <Flex vertical={true} gap={6} className={'h-full p-6'}>
                <Flex vertical={true} style={{position: "relative"}}
                      className={'h-2/3 overflow-y-auto border-slate-200 p-4 border rounded-lg relative'}>
                    <ChatListLayout chatList={restProps.chatList} QuestionLayout={QuestionLayout} AnswerLayout={AnswerLayout}/>
                    {restProps.status === ChatStatus.Loading && <div className={styles.loading}>
                        <Button type={'primary'}
                                onClick={() => restProps.onAction(ChatActionType.StopGenerate, {})}>
                            停止生成
                        </Button>
                    </div>
                    }
                </Flex>
                <Divider></Divider>
                <UserInput/>
            </Flex>
        </ChatContext.Provider>
    }
