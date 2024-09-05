import {AssistantMessageLayout} from "@/components/Chat/components/AssistantMessageLayout.tsx";
import {UserMessageLayout} from "@/components/Chat/components/UserMessageLayout.tsx";
import MessageList from "@/components/Chat/components/MessageList.tsx";
import {ChatActionType, ChatStatus} from "@/constant";


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
    conversationId?: string,
    createTime: string;
    role: Role;
}

export type Conversation = {
    id: string,
    conversationId: string,
    name?: string
}