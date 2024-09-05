import {DefaultAnswerLayout} from "@/components/Chat/default/DefaultAnswerLayout.tsx";
import {DefaultQuestionLayout} from "@/components/Chat/default/DefaultQuestionLayout.tsx";
import {ChatActionType, ChatStatus, MessageType} from "@/constant";
import MessageList from "@/components/Chat/MessageList.tsx";

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


export type MessageListLayout<T extends typeof MessageList> = T;

export type AnswerLayoutType<T extends typeof DefaultAnswerLayout> = T;

export type QuestionLayoutType<T extends typeof DefaultQuestionLayout> = T;


export interface ChatProps {
    title?: string;
    status?: ChatStatus;
    AnswerLayout?: AnswerLayoutType<typeof DefaultAnswerLayout>;
    QuestionLayout?: QuestionLayoutType<typeof DefaultQuestionLayout>;
    MessageListLayout?: MessageListLayout<typeof MessageList>;

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