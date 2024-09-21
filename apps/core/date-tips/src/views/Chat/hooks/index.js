import { useEffect, useState } from "react";
import { request } from "@marvin/shared";
import { chatWX } from "../wx.js";
import {useChat} from "@marvin/react-ai";

export const useChatPage = () => {
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    const result = await request({ url: "/marvin/api/conversation" });
    if (result.success) {
      setConversations(result.data);
    }
  };

  const fetchConversationMessages = async (conversationId) => {
    const result = await request({ url: `/marvin/api/conversation/messages/${conversationId}` });
    return result?.data || [];
  };


  const deleteConversation = async (conversationId) => {
    return await request({
      url: `/marvin/api/conversation/${conversationId}`, config: {
        method: "DELETE",
      },
    });
  };

  useEffect(() => {
    fetchConversations();
  }, []);
  return {
    conversations,
    fetchConversationMessages,
    fetchConversations,
    deleteConversation,
  };
};

export const useChatApproach = () => {
  const [enableEval, setEnableEval] = useState(false);
  const [approach, setApproach] = useState("default");
  const [response, setResponse] = useState();
  const mapping = {
    "default": (params, signal) => fetch("/marvin/api/chat/stream", {
      method: "POST",
      signal,
      body: JSON.stringify({ ...params, toolIds: [1] }),
      headers: {
        "Content-Type": "application/json",
      },
    }),
    "wx": (params, signal) => chatWX(),
    "custom": (params, signal) => response,
  };
  return {
    getApproach: mapping[approach],
    mapping,
    state: {
      approach, setApproach,
      response, setResponse,
      enableEval, setEnableEval
    },

  };
};

export const useChatExtend = ({approachHandle, fetchConversations, conversations = []}) => {
    const chatProps = useChat({
        async onSend(params, signal) {
            return approachHandle.getApproach.call(null, params, signal);
        },
        onConversationStart: async (lastMessage) => {
            // 如果是新对话
            if (!conversations.find(item => item.conversationId === lastMessage.conversationId)) {
                await fetchConversations();
            }
        },
    }, {});
    return {
        ...chatProps
    }
}