import {ReactElement} from "react";

export interface ChatItem {
    content: string;
    type?: 'normal' | 'file';
    id: string;
    parentId?: string;
    role: 'answer' | 'question';
}

export interface QuestionChatItem extends ChatItem {
}

export interface TreeChatItem extends ChatItem {
    children?: TreeChatItem[];
    childrenIds?: string[];
}

export interface AnswerChatItem extends ChatItem {

}

export type renderAnswerPanelType = (chatItem: AnswerChatItem) => ReactElement
export type renderQuestionPanelType = (chatItem: QuestionChatItem) => ReactElement

export interface ChatProps {
    chatList: ChatItem[];
    renderAnswerPanel?: renderAnswerPanelType;
    renderQuestionPanel?: renderQuestionPanelType;
    renderChatItemLayout?: (chatList: ChatItem[], renderAnswerPanel?: renderAnswerPanelType, renderQuestionPanel?: renderQuestionPanelType) => ReactElement;

    onSend?: (value: string) => void
}
