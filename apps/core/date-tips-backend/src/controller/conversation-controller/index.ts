import prisma from "../../utils/prisma";
import {Router} from "express";

const ConversationController = Router();
ConversationController.get('/', async (req, res) => {
    try {
        const conversations = await prisma.chatConversation.findMany();
        res.json({data: conversations});
    } catch (e) {
        console.log(e)
    }
})

ConversationController.get('/:id', async (req, res) => {
    console.log(req.params)
    const {id} = req.params;
    if (!id) {
        return res.json({data: null})
    }
    try {
        const data = await prisma.chatConversation.findUnique({
            where: {
                conversationId: id
            },
            include: {
                messages: true
            }
        })
        return res.json({data})
    } catch (e) {
    }
})

export default ConversationController