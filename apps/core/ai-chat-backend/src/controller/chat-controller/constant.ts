export enum MessageEvent {
  message = 'message',
  conversationStart = 'conversation-start',
  conversationEnd = 'conversation-end',
  toolCallStart = 'tool-call-start',
  toolCallEnd = 'tool-call-end',
}

export enum ErrorEvent {
  stop = "stop"
}