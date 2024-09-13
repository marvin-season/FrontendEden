import {useEffect, useState} from "react";
import {request} from "@marvin/shared";

export const useChatPage = () => {
    const [conversations, setConversations] = useState([]);

    const fetchConversations = async () => {
        const result = await request({url: '/api/conversation'});
        if (result.success) {
            setConversations(result.data)
        }
    }

    const fetchConversationMessages = async (conversationId) => {
        const result = await request({url: `/api/conversation/messages/${conversationId}`})
        return result?.data || [];
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
        fetchConversationMessages,
        fetchConversations,
        deleteConversation
    }
}