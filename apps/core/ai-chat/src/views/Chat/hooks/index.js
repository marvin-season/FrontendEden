import { useEffect, useState } from "react";
import { request } from "@marvin/shared";
import { chatWX } from "../wx.js";

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
    return result?.data.map(item => ( { ...item, attachments: JSON.parse(item.attachments || '[]') } )) || [];
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

