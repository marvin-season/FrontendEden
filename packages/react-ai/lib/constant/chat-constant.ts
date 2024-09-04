export enum ChatStatus {
    Loading,
    Idle,
    Typing
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
