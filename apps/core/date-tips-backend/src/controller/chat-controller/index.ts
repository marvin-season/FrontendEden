import {Router} from "express";
import { streamText, tool } from "ai";
import {LLMFactory} from "../../service/llm";
import prisma from "../../utils/prisma";
import {ConversationService} from "../../service/conversation";
import * as lancedb from "@lancedb/lancedb";
// import { z } from 'zod';



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
                model: LLMFactory.createOllama('llama3.1:latest'),
                abortSignal: abortController.signal,

                messages: [
                    {
                        role: 'assistant',
                        content: '你是一个精通世界历史的专家，请使用中文回复我',  // you are so clever, answer me with english
                    },
                    {
                        role: 'user',
                        content: prompt,
                    }
                ],
            })


            let content = '';
            // const toolResults = await result.toolResults;
            // for (const toolResult of toolResults) {
            //     switch (toolResult.toolName) {
            //         case 'weather': {
            //             console.log('工具调用：', toolResult.args.location, JSON.stringify(toolResult.result)); // string
            //             break;
            //         }
            //     }
            // }
            // const toolCalls = await result.toolCalls;
            // for (const toolCall of toolCalls) {
            //     switch (toolCall.toolName) {
            //         case 'weather': {
            //             console.log('工具调用结果：', toolCall.args.location, JSON.stringify(toolCall)); // string
            //             break;
            //         }
            //     }
            // }

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