export enum ChatStatus {
    Idle = 'idle',
    Loading = 'loading',
    Typing = 'typing'
}

/**
 * Chat组件的Action
 */
export enum ChatActionType {
    SendMessage,
    ReloadMessage,
    SelectAttachment,
    StopGenerate
}

export enum MessageType {
    Normal,
    Loading,
    Error
}
