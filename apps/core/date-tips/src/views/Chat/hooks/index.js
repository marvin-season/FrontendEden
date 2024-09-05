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

    const handleSelectConversation = async (conversation) => {
        const result = await request({url: `/api/conversation/${conversation.conversationId}`});
        if (result.success) {
            setConversation(result.data)
        }
    }

    useEffect(() => {
        fetchConversations()
    }, []);
    return {
        conversations,
        conversation,
        handleSelectConversation
    }
}