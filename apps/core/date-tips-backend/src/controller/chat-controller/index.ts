import {Router} from "express";
import {streamText} from "ai";
import {LLMFactory} from "../../service/llm";
import prisma from "../../utils/prisma";
import {ConversationService} from "../../service/conversation";
import * as lancedb from "@lancedb/lancedb";




const ChatController = Router();
// const embeddingModel = ollama.textEmbeddingModel('mxbai-embed-large:latest');
ChatController.get('/hello', async (req, res) => {
    try {
        const uri = "./storage/lancedb/";

        const db = await lancedb.connect(uri);
        const tbl = await db.createTable(
            "myTable",
            [
                { vector: [3.1, 4.1], item: "foo", price: 10.0 },
                { vector: [5.9, 26.5], item: "bar", price: 20.0 },
            ],
            { mode: "overwrite" },
        );
    } catch (e) {
        console.log(e)
    }
    res.send('Hello World!')
})

ChatController.post('/stream')
    .use(async (req, res, next) => {
        console.log('before');
        const {conversationId} = req.body;

        try {
            req.body.conversationId = await ConversationService.create(conversationId)
            next();
        } catch (e) {
            console.log(e)
        }
        console.log('after');
    })
    .use(async (req, res, next) => {

        try {
            const {prompt, conversationId} = req.body;
            const abortController = new AbortController();

            req.on('close', () => {
                // todo: 客户端终止数据输出 不生效
                abortController.abort('stop')
            });

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Connection', 'keep-alive');
            const id = Date.now();
            const result = await streamText({
                model: LLMFactory.createAzure('gpt-4'),
                abortSignal: abortController.signal,
                messages: [
                    // {
                    //     role: 'user',
                    //     content: [
                    //         { type: 'text', text: 'Describe the image in detail.' },
                    //         {
                    //             type: 'image',
                    //             image:
                    //                 'https://github.com/vercel/ai/blob/main/examples/ai-core/data/comic-cat.png?raw=true',
                    //         },
                    //     ],
                    // },
                    {
                        role: 'assistant',
                        content: 'you are so clever, answer me with english',
                    },
                    {
                        role: 'user',
                        content: prompt,
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