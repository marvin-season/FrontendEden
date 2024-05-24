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
    SelectFile,
    StopGenerate
}
export enum MessageType {
    Normal,
    Loading,
    Error
}
