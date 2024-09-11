import { Router } from "express";
import prisma from "../../utils/prisma";
import { ConversationService } from "../../service/conversation";
import { chatService } from "../../service/chat";


const ChatController = Router();
// const embeddingModel = ollama.textEmbeddingModel('mxbai-embed-large:latest');
ChatController.post("/stream")
    .use(async (req, res, next) => {
        console.log("before");
        const { conversationId } = req.body;

        try {
            req.body.conversationId = await ConversationService.create(conversationId);
            next();
        } catch (e) {
            console.log(e);
        }
        console.log("after");
    })
    .use(async (req, res, next) => {

        try {
            const { prompt, conversationId, toolIds } = req.body;
            const abortController = new AbortController();

            req.on("close", () => {
                // todo: 客户端终止数据输出 不生效
                abortController.abort("stop");
            });

            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Connection", "keep-alive");


            /**
             * 工具调用
             */

            if (toolIds.length) {
                console.log("选择了工具：", toolIds);
            }
            const result = await chatService.streamChat({
                prompt,
            });
            const content = await chatService.writeStream(res, result, { conversationId });

            if (content) {
                await prisma.chatMessage.createMany({
                    data: [
                        {
                            conversationId,
                            content: prompt,
                        },
                        {
                            conversationId,
                            content,
                            role: "assistant",
                        },
                    ],
                });
            }


            res.end();

        } catch (e) {
            console.error("Error in /stream endpoint:", e);
            res.status(500).send("Internal Server Error");
        }
    });
export default ChatController;