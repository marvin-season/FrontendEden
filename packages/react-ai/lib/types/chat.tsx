import {ChatListLayout} from "@/components/Chat/default/ChatListLayout.tsx";
import {DefaultAnswerLayout} from "@/components/Chat/default/DefaultAnswerLayout.tsx";
import {DefaultQuestionLayout} from "@/components/Chat/default/DefaultQuestionLayout.tsx";
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

export interface ChatItem {
    questions: IQuestion[];
    answers: IAnswer[]
}

export type ChatLayoutType<T extends typeof ChatListLayout> = T;

export type AnswerLayoutType<T extends typeof DefaultAnswerLayout> = T;

export type QuestionLayoutType<T extends typeof DefaultQuestionLayout> = T;


export interface ChatProps {
    title?: string;
    status?: ChatStatus;
    // @deprecated
    chatList: ChatItem[];
    AnswerLayout?: AnswerLayoutType<typeof DefaultAnswerLayout>;
    QuestionLayout?: QuestionLayoutType<typeof DefaultQuestionLayout>;
    ChatLayout?: ChatLayoutType<typeof ChatListLayout>;

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