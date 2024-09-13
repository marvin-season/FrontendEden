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
        const result = await request({url: `/api/conversation/${conversationId}`})
        return result?.data?.messages || [];
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