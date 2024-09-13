import { nanoid } from "nanoid";
import { useImmer } from "use-immer";
import moment from "moment";
import { ActionParams, ChatProps, Message } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import { ChatActionType, ChatStatus } from "@/constant";
import { SSEMessageGenerator } from "@/utils";

const format = "YYYY-MM-DD HH:mm:ss";

type HandleProps = {
  onSend: (params: ActionParams, signal: any) => Promise<Response>
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
  reset: Function,
  setHistoryMessages: React.Dispatch<React.SetStateAction<Message[]>>
} => {
  // 存储当前会话问答 => 前端临时存储
  const [messages, setMessages] = useImmer<Message[]>([]);
  const [chatStatus, setChatStatus] = useState<ChatProps["status"]>(ChatStatus.Idle);

  const [historyMessages, setHistoryMessages] = useState<Message[]>([]);


  // 发送消息任务(可能包含异步操作)
  const executeSendTask = async (params: ActionParams) => {
    ChatUtils.controller = new AbortController();
    setChatStatus(ChatStatus.Loading);
    setMessages(draft => {
      draft.push(
        {
          id: nanoid(),
          content: params.prompt as string,
          createTime: moment().format(format),
          role: "user",
        },
      );
    });
    return invokeHandle.onSend(params, ChatUtils.controller.signal);
  };

  // 接收消息任务(可能包含异步操作)
  const executeReceiveTask = async (response: Response) => {

    try {
      for await (const message of SSEMessageGenerator<Message>(response)) {
        if (message.event === "conversation-start") {
          setChatStatus(ChatStatus.Typing);
          invokeHandle.onConversationStart?.(message);
        }
        if (message.event === "conversation-end") {
          setChatStatus(ChatStatus.Idle);
          invokeHandle.onConversationEnd?.(message);
        }

        setMessages(draft => {
          const find = draft.find(item => item.id === message.id);
          if (find) {
            find.content += message.content;
          } else {
            draft.push({ ...message, role: "assistant" });
          }
        });
      }
    } catch (e) {
      invokeHandle.onConversationEnd?.();
      setChatStatus(ChatStatus.Idle);
    }
  };

  /**
   * 执行消息发送以及消息接受任务，任务完成后返回一次会话完成，此时拉取库中的数据
   */
  const sendMessage = async (params: ActionParams) => {
    await executeReceiveTask(await executeSendTask(params));
    return "一次会话完成";
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

  const reset = () => {
    stop();
    setMessages([]);
    setChatStatus(ChatStatus.Idle);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return {
    reset,
    setHistoryMessages,
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
