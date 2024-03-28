import {ReactElement} from "react";

export interface BaseAttachImage {
    src: string,
    width?: string,
    height?: string
}

export interface BaseAttach {
    images?: BaseAttachImage[]
}

export interface ChatAttach extends BaseAttach {
}

export interface ChatItemAttach extends BaseAttach {
}


export interface ChatItem {
    groupId: string;
    content: string;
    type?: 'normal' | 'file';
    id: string;
    role: 'answer' | 'question';
    // 一些消息相关的附件信息
    chatItemAttach?: ChatItemAttach
}

export interface QuestionChatItem extends ChatItem {
}

export interface AnswerChatItem extends ChatItem {

}

export interface TreeChatItem extends ChatItem {
    children?: TreeChatItem[];
    childrenIds?: string[];
    childrenShow?: boolean;
    parentId?: string;
    parent?: TreeChatItem;
}

export type renderAnswerPanelType = (chatItem: AnswerChatItem) => ReactElement;

export type renderQuestionPanelType = (chatItem: QuestionChatItem) => ReactElement;

export interface ChatProps {
    title?: string;
    chatList: ChatItem[];
    renderAnswerPanel?: renderAnswerPanelType;
    renderQuestionPanel?: renderQuestionPanelType;
    renderChatItemLayout?: (chatList: ChatItem[], renderAnswerPanel?: renderAnswerPanelType, renderQuestionPanel?: renderQuestionPanelType) => ReactElement;
    onSend?: (value: string) => void;
    onSelectedFile?: (files: FileList) => void;
    onReload?: (chatItem: ChatItem) => void,
    chatAttach?: ChatAttach;
}
