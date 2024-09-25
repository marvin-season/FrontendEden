import { AssistantMessageLayout } from "@/components/Chat/components/AssistantMessageLayout.tsx";
import { UserMessageLayout } from "@/components/Chat/components/UserMessageLayout.tsx";
import MessageList from "@/components/Chat/components/MessageList.tsx";
import { ChatActionType, ChatStatus } from "@/constant";
import {ReactNode} from "react";

export type Attachment = {
  id: string;
  type: 'doc' | 'tool' | 'file',
  name: string;
  value?: any
}

export type MessageListLayoutType<T extends typeof MessageList> = T;

export type AssistantMessageLayoutType<T extends typeof AssistantMessageLayout> = T;

export type UserMessageLayoutType<T extends typeof UserMessageLayout> = T;

export type CommandCharType = "@" | "#"

export interface ChatProps {
  title?: string;
  status?: ChatStatus;
  AssistantMessageLayout?: AssistantMessageLayoutType<typeof AssistantMessageLayout>;
  UserMessageLayout?: UserMessageLayoutType<typeof UserMessageLayout>;
  MessageListLayout?: MessageListLayoutType<typeof MessageList>;

  // action
  onAction: (actionType: ChatActionType, actionParams?: ActionParams) => void;

  messages: Message[];
  conversation?: Conversation;

  commandElementRender?: (
    commandChar: CommandCharType,
    commandOperator: {
      onClose: (char: CommandCharType) => void;
    }) => ReactNode;
  attachmentRender?: () => ReactNode;
}

export type ActionParams = {
  prompt?: string;
  content?: string | MultiModalContent[];
  messages?: string | MultiModalContent[];
  tools?: [],
  attachments?: Attachment[],
  conversationId?: string
}

export type Role = "user" | "assistant" | "system" | "tool";


export enum MessageEvent {
  message = "message",
  conversationStart = "conversation-start",
  conversationEnd = "conversation-end",
}

export type MultiModalContent = {
  type: "text" | "image" | "tool-call",
  position?: number,
  text?: string,
  image?: string,
  tool?: {
    name: string,
    description: string,
    detail: string,
    input: string
  }
}
export type MessageType = undefined | "multi-modal" | string;

export type Message = {
  id: string;
  type?: MessageType;
  content: string | MultiModalContent[];
  conversationId?: string,
  createTime: string;
  role: Role;
  event?: MessageEvent
  attachments?: Attachment[]
}

export type Conversation = {
  id: string,
  conversationId: string,
  name?: string
}