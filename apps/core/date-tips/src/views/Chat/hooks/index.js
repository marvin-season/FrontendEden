import {useEffect, useState} from "react";
import {request} from "@marvin/shared";

export const useChatPage = () => {
    const [conversations, setConversations] = useState([]);
    const [conversation, setConversation] = useState(null)

    const fetchConversations = async () => {
        const result = await request({url: '/api/conversation'});
        if (result.success) {
            setConversations(result.data)
        }
    }

    const fetchConversationWithMessages = async (conversationId) => {
        const result = await request({url: `/api/conversation/${conversationId}`});
        if (result.success) {
            setConversation(result.data)
        }
    }

    const selectConversation = async (conversation, withMessages = true) => {
        setConversation(conversation);
        withMessages && await fetchConversationWithMessages(conversation.conversationId);
    }

    const unSelectConversation =( ) => {
        setConversation(null)
    }

    const deleteConversation = async (conversationId) => {
        return await request({url: `/api/conversation/${conversationId}`, config: {
                method: 'DELETE'
            }});
    }

    useEffect(() => {
        fetchConversations()
    }, []);
    return {
        conversations,
        conversation,
        fetchConversations,
        selectConversation,
        unSelectConversation,
        deleteConversation
    }
}