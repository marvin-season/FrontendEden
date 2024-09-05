import {AssistantMessageLayout} from "@/components/Chat/components/AssistantMessageLayout.tsx";
import {UserMessageLayout} from "@/components/Chat/components/UserMessageLayout.tsx";
import MessageList from "@/components/Chat/MessageList.tsx";
import {ChatActionType, ChatStatus, MessageType} from "@/constant";

export interface IBaseContent {

}

export interface IQuestionContent extends IBaseContent {

}

export interface IAnswerContent extends IBaseContent {

}

export interface IMessage {
    id: string,
    content: string | IBaseContent,
    createTime: string,
    type?: MessageType
}


export interface IQuestion extends IMessage {
    content: string | IQuestionContent;
}

export interface IAnswer extends IMessage {
    content: string | IAnswerContent,
}


export type MessageListLayoutType<T extends typeof MessageList> = T;

export type AssistantMessageLayoutType<T extends typeof AssistantMessageLayout> = T;

export type UserMessageLayoutType<T extends typeof UserMessageLayout> = T;


export interface ChatProps {
    title?: string;
    status?: ChatStatus;
    AssistantMessageLayout?: AssistantMessageLayoutType<typeof AssistantMessageLayout>;
    UserMessageLayout?: UserMessageLayoutType<typeof UserMessageLayout>;
    MessageListLayout?: MessageListLayoutType<typeof MessageList>;

    // action
    onAction: (actionType: ChatActionType, actionParams: ActionParams) => void;

    messages: Message[];
    conversation?: Conversation;
}

export type ActionParams = {
    prompt?: string;
    tools?: [],
    attachments?: any[],
}

export type Role = 'user' | 'assistant' | 'system';

export type Message = {
    id: string;
    content: string;
    createTime: string;
    role: Role;
}

export type Conversation = {
    id: string,
    conversationId: string,
    name?: string
}