import {DefaultChatLayout} from "@/components/Chat/default/DefaultChatLayout.tsx";
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

export type ChatLayoutType<T extends typeof DefaultChatLayout> = T;

export type AnswerLayoutType<T extends typeof DefaultAnswerLayout> = T;

export type QuestionLayoutType<T extends typeof DefaultQuestionLayout> = T;


export interface ChatProps {
    title?: string;
    status?: ChatStatus;
    chatList: ChatItem[];
    AnswerLayout?: AnswerLayoutType<typeof DefaultAnswerLayout>;
    QuestionLayout?: QuestionLayoutType<typeof DefaultQuestionLayout>;
    ChatLayout?: ChatLayoutType<typeof DefaultChatLayout>;

    // action
    onAction: (actionType: ChatActionType, actionParams: Record<string, any>) => void;
}


export type IInvoke = (
    params: { value: string, [_: string]: any },
    onMessage: (message: IMessage) => void,
    onFinish?: (message?: IMessage) => void,
) => Promise<void>;


