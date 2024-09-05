import React, {FC} from "react";
import {ChatProps} from "@/types/chat.tsx";
import {ChatContext} from "./context/ChatContext.tsx";
import {Button, Flex, Divider} from "antd";
import {
    UserInput,
    UserMessageLayout as DefaultUserMessageLayout,
    AssistantMessageLayout as DefaultAssistantMessageLayout
} from "@/components/Chat/components";
import styles from "./styles.module.css";
import {ChatActionType, ChatStatus} from "@/constant";
import MessageList from "@/components/Chat/components/MessageList.tsx";

export const Chat: FC<ChatProps> =
    ({
         UserMessageLayout = DefaultUserMessageLayout,
         AssistantMessageLayout = DefaultAssistantMessageLayout,
         messages,
         ...restProps
     }) => {
        console.log('restProps.status , ', restProps.status )
        return <ChatContext.Provider value={{
            messages,
            UserMessageLayout,
            AssistantMessageLayout,
            ...restProps,
        }}>
            <Flex vertical={true} gap={6} className={'h-full p-6'}>
                <Flex vertical={true} style={{position: "relative"}}
                      className={'h-2/3 overflow-y-auto border-slate-200 p-4 border rounded-lg relative'}>
                    <MessageList messages={messages}/>
                    {restProps.status === ChatStatus.Loading && <div className={''}>loading ...</div>}
                    {restProps.status === ChatStatus.Loading || restProps.status === ChatStatus.Typing && <div className={styles.loading}>
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
