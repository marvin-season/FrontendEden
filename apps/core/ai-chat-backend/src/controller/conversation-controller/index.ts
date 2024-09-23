import prisma from "@/utils/prisma";
import {Router} from "express";

const ConversationController = Router();
ConversationController.get('/', async (req, res) => {
    try {
        const conversations = await prisma.chatConversation.findMany();
        res.json({data: conversations.reverse()});
    } catch (e) {
        console.log(e)
    }
})

ConversationController.get('/messages/:conversationId', async (req, res) => {
    console.log(req.params)
    const {conversationId} = req.params;
    if (!conversationId) {
        return res.json({data: null})
    }
    try {
        const data = await prisma.chatMessage.findMany({
            where: {
                conversationId
            },
        })
        return res.json({data})
    } catch (e) {
    }
})


ConversationController.delete('/:conversationId', async (req, res) => {
    const {conversationId} = req.params;
    if (!conversationId) {
        return res.json({data: null})
    }
    try {
        // 级联删除

        const data = await prisma.chatConversation.delete({
            where: {
                conversationId
            },
        })
        return res.json({data})
    } catch (e) {
    }
})
export default ConversationController