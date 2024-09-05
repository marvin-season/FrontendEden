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

    const handleSelectConversation = async (conversationId) => {
        const result = await request({url: `/api/conversation/${conversationId}`});
        if (result.success) {
            setConversation(result.data)
        }
    }

    const handleUnSelectConversation =( ) => {
        setConversation(null)
    }

    useEffect(() => {
        fetchConversations()
    }, []);
    return {
        conversations,
        conversation,
        handleSelectConversation,
        handleUnSelectConversation
    }
}