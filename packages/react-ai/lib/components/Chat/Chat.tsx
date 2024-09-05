import React, {FC} from "react";
import {ChatProps} from "@/types/chat.tsx";
import {ChatContext} from "./context/ChatContext.tsx";
import {Button, Divider} from "antd";
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
        return <ChatContext.Provider value={{
            messages,
            UserMessageLayout,
            AssistantMessageLayout,
            ...restProps,
        }}>
            <div className={'h-full p-6 gap-2 flex flex-col'}>
                { restProps.title && <div className={'p-4'}>{restProps.title}</div>}
                <div className={'flex-grow overflow-y-auto border-slate-200 p-4 border rounded-lg relative'}>
                    <MessageList messages={messages}/>
                    {restProps.status === ChatStatus.Loading && <div className={''}>loading ...</div>}
                    {restProps.status === ChatStatus.Loading || restProps.status === ChatStatus.Typing && <div className={styles.loading}>
                        <Button type={'primary'}
                                onClick={() => restProps.onAction(ChatActionType.StopGenerate, {})}>
                            停止生成
                        </Button>
                    </div>
                    }
                </div>
                <div>
                    <Divider></Divider>
                    <UserInput/>
                </div>
            </div>
        </ChatContext.Provider>
    }
