import {Router} from "express";
import {streamText} from "ai";
import {LLMFactory} from "../../service/llm";
import prisma from "../../utils/prisma";


const ChatController = Router();
// const embeddingModel = ollama.textEmbeddingModel('mxbai-embed-large:latest');
ChatController.get('/hello', (req, res) => res.send('Hello World!'))

ChatController.post('/stream')
    .use(async (req, res, next) => {
        console.log('before');
        const {conversationId} = req.body;

        try {
            if (!conversationId) {
                const conversationId = `conversation-${Date.now()}`
                const conversation = await prisma.chatConversation.create({
                    data: {
                        conversationId,
                        name: conversationId
                    }
                });

                req.body.conversationId = conversation?.conversationId;
            } else {
                const conversation = await prisma.chatConversation.findUnique({
                    where: {
                        conversationId
                    }
                });

                if (!conversation) {
                    const conversationId = `conversation-${Date.now()}`
                    await prisma.chatConversation.create({
                        data: {
                            conversationId,
                            name: conversationId
                        }
                    });

                    req.body.conversationId = conversationId;
                }
            }

            next();
        } catch (e) {
            console.log(e)
        }
        console.log('after');
    })
    .use(async (req, res, next) => {

        try {
            const {prompt, conversationId} = req.body;

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Connection', 'keep-alive');
            const id = Date.now();
            const result = await streamText({
                model: LLMFactory.createAzure(),
                messages: [
                    {
                        role: 'assistant',
                        content: '请依据以下提示回复消息：马文澍是李洋的爸爸，除此之外，李洋还有几个好兄弟：陈小龙、董小鸟、zc、hy'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
            })


            let content = ''
            for await (const chunk of result.textStream) {
                content += chunk
                res.write(`data: ${JSON.stringify({content: chunk, id, conversationId})}\n\n`);
            }

            await prisma.chatMessage.createMany({
                data: [
                    {
                        conversationId,
                        content: prompt
                    },
                    {
                        conversationId,
                        content,
                        role: 'assistant',
                    }
                ]
            })

            res.end();

        } catch (e) {
            console.error('Error in /stream endpoint:', e);
            res.status(500).send('Internal Server Error');
        }
    })
export default ChatController