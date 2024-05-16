import {ReactElement} from "react";


export interface BaseContent {

}

export interface QuestionContent extends BaseContent {

}

export interface AnswerContent extends BaseContent {

}

export interface Question {
    id: string;
    createTime: string;
    content: string | QuestionContent;
}

export interface Answer {
    id: string;
    createTime: string;
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
