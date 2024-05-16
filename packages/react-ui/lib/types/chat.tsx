import {ReactElement} from "react";


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


export type renderAnswerPanelType = (answers: IAnswer[]) => ReactElement;

export type renderQuestionPanelType = (question: IQuestion[]) => ReactElement;

export interface ChatProps {
    title?: string;
    chatList: ChatItem[];
    renderAnswerPanel?: renderAnswerPanelType;
    renderQuestionPanel?: renderQuestionPanelType;
    renderChatItemLayout?: (chatList: ChatItem[], renderAnswerPanel?: renderAnswerPanelType, renderQuestionPanel?: renderQuestionPanelType) => ReactElement;
    onSend?: (value: string) => void;
    onSelectedFile?: (files: FileList) => void;
    onReload?: (answer: IAnswer) => void,
}


export type ISendApi = <T = {}>(
    params: T,
    onData: (message: IMessage) => void
) => void;


