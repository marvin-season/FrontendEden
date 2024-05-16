import {ReactElement} from "react";


export interface BaseContent {

}

export interface QuestionContent extends BaseContent {

}

export interface AnswerContent extends BaseContent {

}

export interface IMessage {
    id: string,
    content: string | BaseContent,
    createTime: string,
}


export interface Question extends IMessage {
    content: string | QuestionContent;
}

export interface Answer extends IMessage {
    content: string | AnswerContent,
}

export interface ChatItem {
    questions: Question[];
    answers: Answer[]
}


export type renderAnswerPanelType = (answers: Answer[]) => ReactElement;

export type renderQuestionPanelType = (question: Question[]) => ReactElement;

export interface ChatProps {
    title?: string;
    chatList: ChatItem[];
    renderAnswerPanel?: renderAnswerPanelType;
    renderQuestionPanel?: renderQuestionPanelType;
    renderChatItemLayout?: (chatList: ChatItem[], renderAnswerPanel?: renderAnswerPanelType, renderQuestionPanel?: renderQuestionPanelType) => ReactElement;
    onSend?: (value: string) => void;
    onSelectedFile?: (files: FileList) => void;
    onReload?: (answer: Answer) => void,
}

export interface ISendParams<T, P> {
    params: T,
    onData: (r: P) => void,
}

export type ISendApi = <T = {}, P = {}>(params: ISendParams<T, P>) => void;


