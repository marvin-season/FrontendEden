import { nanoid } from "nanoid";
import { useImmer } from "use-immer";
import moment from "moment";
import { ActionParams, ChatProps, Message, MultiModalContent } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import { ChatActionType, ChatStatus } from "@/constant";
import { SSEMessageGenerator } from "@/utils";

const format = "YYYY-MM-DD HH:mm:ss";

type HandleProps = {
  onSend: (params: ActionParams, signal: any) => { mergedParams: ActionParams, responsePromise: Promise<Response> }
  onStop?: () => void,
  onConversationEnd?: (message?: Message) => Promise<void>,
  onConversationStart?: (message?: Message) => Promise<void>,
}

type ConfigProps = {}

const ChatUtils: {
  controller: AbortController | null
} = {
  controller: null,
};

export const useChat = (invokeHandle: HandleProps, config: ConfigProps = {}): ChatProps & {
  checkoutConversation: (id?: string) => void,
  setHistoryMessages: React.Dispatch<React.SetStateAction<Message[]>>
  conversationId?: string;
} => {
  // 存储当前会话问答 => 前端临时存储
  const [messages, setMessages] = useImmer<Message[]>([]);
  const [chatStatus, setChatStatus] = useState<ChatProps["status"]>(ChatStatus.Idle);

  const [historyMessages, setHistoryMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string>();

  /**
   * 执行消息发送以及消息接受任务，任务完成后返回一次会话完成，此时拉取库中的数据
   */
  const sendMessage = async (params: ActionParams) => {
    ChatUtils.controller = new AbortController();

    const prompt = typeof params.content === "string" ? params.content :
      (params.content as MultiModalContent[])?.filter(item => item.type === "text").map(item => item.text).join("");

    // attachments may be contained in the mergedParams
    const { responsePromise, mergedParams } = invokeHandle.onSend({
      ...params,
      prompt,
      conversationId,
    }, ChatUtils.controller.signal);

    debugger
    await executeSendTask(mergedParams);
    await executeReceiveTask(await responsePromise);
    return "一次会话完成";
  };

  // 发送消息任务(可能包含异步操作)
  const executeSendTask = async (params: ActionParams) => {
    setChatStatus(ChatStatus.Loading);
    setMessages(draft => {
      draft.push(
        {
          id: nanoid(),
          content: params.prompt!,
          attachments: params.attachments,
          createTime: moment().format(format),
          role: "user",
        },
      );
    });
  };

  // 接收消息任务(可能包含异步操作)
  const executeReceiveTask = async (response: Response) => {

    try {
      for await (const message of SSEMessageGenerator<Message & {
        content: string | MultiModalContent;
      }>(response)) {
        if (message.event === "conversation-start") {
          setChatStatus(ChatStatus.Typing);
          invokeHandle.onConversationStart?.(message);
          setConversationId(message.conversationId);
        }
        if (message.event === "conversation-end") {
          setChatStatus(ChatStatus.Idle);
          invokeHandle.onConversationEnd?.(message);
        }

        if (message.event === "message") {
          setMessages(draft => {
            const oldMessage = draft.find(item => item.id === message.id);
            if (oldMessage) {
              if (message.type === "multi-modal") {
                // 多模态消息
                const content = message.content as MultiModalContent;
                const oldContent = oldMessage.content as MultiModalContent[];

                if (content.position === undefined) {
                  // 新增多模态消息
                  const lastTextMultiModalContent = oldContent.findLast(oc => oc.type === "text");
                  if (lastTextMultiModalContent) {
                    lastTextMultiModalContent.text! += content.text || "";
                  } else {
                    oldContent.push(content);
                  }
                } else {
                  // 更新多模态消息
                  const lastToolMultiModalContent = oldContent.findLast(oc => oc.position === content.position);
                  if (lastToolMultiModalContent) {
                    oldMessage.content = oldContent.map(oc => {
                      if (oc.position === content.position) {
                        return content;
                      }
                      return oc;
                    });
                  } else {
                    oldContent.push(content);
                  }

                }
              } else {
                oldMessage.content += message.content as string;
              }
            } else {
              draft.push({
                ...{
                  ...message,
                  content: message.type === "multi-modal" ? [message.content as MultiModalContent] : message.content,
                },
                role: "assistant",
              });
            }
          });
        }
      }
    } catch (e) {
      invokeHandle.onConversationEnd?.();
      setChatStatus(ChatStatus.Idle);
    }
  };

  const onSelectedFile = (files: FileList) => {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (file) {
        const url = URL.createObjectURL(file);
        console.log("🚀  ", url);
      }

    }
  };

  const stop = () => {
    if (ChatStatus.Idle === chatStatus) {
      return;
    }


    setChatStatus(ChatStatus.Idle);
    ChatUtils.controller?.abort("stop");
    invokeHandle.onStop?.();
  };

  const checkoutConversation = (id?: string) => {
    setConversationId(id);
    setHistoryMessages([]);
    setMessages([]);
    setChatStatus(ChatStatus.Idle);
  };

  const reset = () => {
    stop();
    setMessages([]);
    setChatStatus(ChatStatus.Idle);
  };

  useEffect(() => {
    return () => {
      checkoutConversation();
    };
  }, []);

  return {
    checkoutConversation,
    setHistoryMessages,
    conversationId,
    messages: [...historyMessages, ...messages],
    status: chatStatus,
    onAction: (actionType, actionParams) => {
      console.log("🚀  ", { actionType, actionParams });
      if (actionType === ChatActionType.SendMessage || actionType === ChatActionType.ReloadMessage) {
        sendMessage(actionParams as ActionParams).then();
      } else if (actionType === ChatActionType.SelectAttachment) {
        // onSelectedFile(actionParams.attachments);
      } else if (actionType === ChatActionType.StopGenerate) {
        stop();
      }
    },
  };

};
